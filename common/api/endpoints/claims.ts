import type { UploadClaimsRequestDto } from "../dtos.js";
import { ApiPrefix } from "./_base.js";
import { ApiEndpoint } from "./_extend.js";


export const UploadClaims = ApiEndpoint.post<UploadClaimsRequestDto, string | null>()
  .withPath(ApiPrefix, 'claims/upload')
  .asAuthenticated();
