import type { UploadClaimsRequestDto } from '@mano/common/api';
import type { ClaimItem } from '@mano/common/models/claims.js';
import { validateClaimItems } from '@mano/common/validation/claims.js';
import { DataParseError } from '@mano/common/validation/utils/error.js';
import { HTTPException } from 'hono/http-exception';
import { generateMRFFromClaims } from '../services/mrf/index.js';
import { saveFile } from '../services/storage/index.js';
import { randomUUID } from 'node:crypto';

export async function uploadClaim(data: UploadClaimsRequestDto): Promise<string | null> {
  let items: ClaimItem[];

  try {
    items = validateClaimItems(data.items);
  } catch (e) {
    const message = e instanceof DataParseError ? e.message : 'Unknown error';

    throw new HTTPException(400, { message: 'Data validation failed: ' + message, cause: e });
  }

  const mrf = generateMRFFromClaims(items);
  const uniqueId = randomUUID();
  const file = await saveFile(
    JSON.stringify(mrf),
    uniqueId,
    undefined,
    undefined,
    { type: 'MRF', count: mrf.length, initialCount: items.length },
  );

  return file?.id || null;
}
