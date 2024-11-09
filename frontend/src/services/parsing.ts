import { ClaimItem, ClaimsSchema } from "@common/models/claims";
import { ClaimItemSchema } from "@common/validation/claims";
import * as Papa from "papaparse";
import { ZodError } from "zod";

export class CSVParseError extends Error {
  constructor(
    readonly row: number,
    message: string,
    readonly inner?: ZodError,
  ) {
    super(message);
  }

  public static fromZodError(index: number, e: ZodError<unknown>) {
    const firstError = e.issues[0]; // TODO show few first errors?
    const message = `Error while validating field "${firstError.path.join("/")}" at row ${index + 1}: ${firstError.message}`;
    return new CSVParseError(index + 1, message, e);
  }
}

export function validateClaimItems(items: unknown[]) {
    const parsed: ClaimItem[] = Array.from({ length: items.length });

    for (let i = 0; i < items.length; ++i) {
      const raw = items[i];
      const result = ClaimItemSchema.safeParse(raw);

      if (!result.success) {
        throw CSVParseError.fromZodError(i, result.error);
      }

      parsed[i] = result.data;
    }

    return parsed;
}

export function parseClaimsCSV(file: File) {
  return new Promise<ClaimsSchema>((resolve, reject) => {
    Papa.parse<ClaimItem>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (output) => {
        try {
          resolve(validateClaimItems(output.data));
        } catch (e) {
          reject(e);
        }
      },
      error: reject,
    });
  });
}
