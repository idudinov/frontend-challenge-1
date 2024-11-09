import { ClaimItem } from "@common/models/claims";
import { validateClaimItems } from "@common/validation/claims";
import * as Papa from "papaparse";

export function parseClaimsCSV(file: File) {
  return new Promise<ClaimItem[]>((resolve, reject) => {
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
