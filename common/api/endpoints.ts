import {
  ApiEndpoint,
} from '@zajno/common/api';
import { UploadClaimsRequestDto } from './dtos.js';

export const ApiPrefix = '/api/claims/';

export const UploadClaims = ApiEndpoint.post<UploadClaimsRequestDto, null>()
  .withPath(ApiPrefix, 'upload')
