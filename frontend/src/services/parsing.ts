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
    const message = `Error parsing row ${index + 1} at "${firstError.path.join("/")}": ${firstError.message}`;
    return new CSVParseError(index + 1, message, e);
  }
}

export async function parseClaimsCSV(file: File) {
  return new Promise<ClaimsSchema>((resolve, reject) => {
    Papa.parse<ClaimItem>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (output) => {
        const parsed: ClaimItem[] = Array.from({ length: output.data.length });

        for (let i = 0; i < output.data.length; ++i) {
          const raw = output.data[i];
          const result = ClaimItemSchema.safeParse(raw);

          if (!result.success) {
            reject(CSVParseError.fromZodError(i, result.error));
            break;
          }

          parsed[i] = result.data;
        }

        resolve(parsed);
      },
      error: reject,
    });
  });
}
