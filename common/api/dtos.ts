import type { ClaimItem } from "../models/claims.js"

export type UploadClaimsRequestDto = {
  items: ClaimItem[];
}
