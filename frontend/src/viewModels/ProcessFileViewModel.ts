import logger from "@/logger";
import { ValueModel } from "@zajno/common-mobx/viewModels/ValueModel";
import { parseClaimsCSV } from "@/services/parsing";
import { ClaimItem } from "@common/models/claims";
import { callApi } from "@/services/api";
import { Api } from "@common/api";
import { DataParseError } from "@common/validation/utils/error";
import { validateClaimItems } from "@common/validation/claims";

export class FileProcessViewModel {
  public readonly data = new ValueModel<ClaimItem[] | null>(null);

  public readonly file = new ValueModel<File | null>(null);
  public readonly localFileError = new ValueModel<string | null>(null);

  public readonly approveError = new ValueModel<string | null>(null);
  public readonly apiError = new ValueModel<string | null>(null);

  public readonly state = new ValueModel<ProcessResult | null>(null);

  public readonly display = new ValueModel<"initial" | "review" | "upload">("initial");

  public reset = () => {
    this.file.reset();
    this.data.reset();
    this.display.reset();
    this.state.reset();
    this.localFileError.reset();
  };

  public parseCurrentFile = async () => {
    const file = this.file.value;
    if (!file) {
      this.reset();
      return;
    }

    const result = await this.tryParseFile(file);

    if (result.success !== true) {
      this.data.reset();
      this.localFileError.setValue(result.error || "Error parsing file");
      return;
    }

    this.localFileError.reset();

    const data = result.data;

    logger.log("Parsed data, rows count =", data.length);
    this.data.setValue(data);
  };

  public startReview = () => {
    if (!this.data.value) {
      return;
    }

    this.display.setValue("review");
  };

  public approve = () => {
    // re-validate data
    try {
      validateClaimItems(this.data.value);
      this.approveError.reset();
      this.display.setValue("upload");

      return true;
    } catch (e) {
      this.approveError.setValue(e.message);
      return false;
    }
  };

  public upload = async () => {
    this.apiError.reset();

    const data = this.data.value;
    if (!data) {
      this.apiError.setValue("No data to upload");
      return false;
    }

    try {
      await callApi(Api.UploadClaims, { items: data });
      return true;
    } catch (e) {
      logger.error("Error while uploading data", e);
      this.apiError.setValue("Error while uploading data: " + e.message);
      return false;
    }
  };

  private tryParseFile = async (file: File): Promise<ProcessResult> => {
    if (!file) {
      return { success: false as const };
    }

    try {
      const data = await parseClaimsCSV(file);
      return { success: true as const, data };
    } catch (e) {
      let message: string;
      if (e instanceof DataParseError) {
        message = e.message;
      } else {
        message = "Error parsing file";
      }
      logger.error("Error parsing file", e);
      return { success: false as const, error: message };
    }
  };
}

type ProcessResult = { success: true; data: ClaimItem[] } | { success: false; error?: string };
