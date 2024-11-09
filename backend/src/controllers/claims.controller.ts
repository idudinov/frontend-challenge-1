import type { UploadClaimsRequestDto } from '@mano/common/api';
import type { ClaimItem } from '@mano/common/models/claims.js';
import { ClaimItemSchema, validateClaimItems } from '@mano/common/validation/claims.js';
import { DataParseError } from '@mano/common/validation/utils/error.js';
import { HTTPException } from 'hono/http-exception';

export async function uploadClaim(data: UploadClaimsRequestDto) {
  // validate data first
  let items: ClaimItem[];

  try {
    items = validateClaimItems(data.items);
  } catch (e) {
    const message = e instanceof DataParseError ? e.message : 'Unknown error';

    throw new HTTPException(400, { message: 'Data validation failed: ' + message, cause: e });
  }

  // save data as file
  console.log('Uploading validated claims', items.length);

  return null;
}
