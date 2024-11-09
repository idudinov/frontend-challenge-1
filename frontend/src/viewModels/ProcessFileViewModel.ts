import logger from "@/logger";
import { ValueModel } from "@zajno/common-mobx/viewModels/ValueModel";
import type { ClaimsSchema } from "@mano/common/models/claims";
import { CSVParseError, parseClaimsCSV, validateClaimItems } from "@/services/parsing";

export class FileProcessViewModel {
  public readonly file = new ValueModel<File | null>(null);
  public readonly data = new ValueModel<ClaimsSchema | null>(null);
  public readonly uploadError = new ValueModel<string | null>(null);
  public readonly approveError = new ValueModel<string | null>(null);
  public readonly state = new ValueModel<ProcessResult | null>(null);

  public readonly display = new ValueModel<"initial" | "review" | "upload">("initial");

  public reset = () => {
    this.file.reset();
    this.data.reset();
    this.display.reset();
    this.state.reset();
    this.uploadError.reset();
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
      this.uploadError.setValue(result.error || "Error parsing file");
      return;
    }

    this.uploadError.reset();

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

  public startUpload = () => {
    if (!this.data.value) {
      return;
    }

    this.display.setValue("upload");
  };

  public approve = () => {
    // re-validate data
    try {
      validateClaimItems(this.data.value);
      this.approveError.reset();
      this.startUpload();
      return true;
    } catch (e) {
      this.approveError.setValue(e.message);
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
      if (e instanceof CSVParseError) {
        message = e.message;
      } else {
        message = "Error parsing file";
      }
      logger.error("Error parsing file", e);
      return { success: false as const, error: message };
    }
  };
}

type ProcessResult = { success: true; data: ClaimsSchema } | { success: false; error?: string };
