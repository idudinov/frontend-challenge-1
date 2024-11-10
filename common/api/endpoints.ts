import {
  ApiEndpoint,
} from '@zajno/common/api';
import { UploadClaimsRequestDto } from './dtos.js';
import { AllowedAmountFile } from '../models/mrf.js';
import { Path } from '@zajno/common/structures/path';

export const ApiPrefix = '/api/';

export const UploadClaims = ApiEndpoint.post<UploadClaimsRequestDto, string | null>()
  .withPath(ApiPrefix, 'claims/upload')

export const ListMRFs = ApiEndpoint.get<string[]>()
  .withPath(ApiPrefix, 'mrf/list')

export const GetMRF = ApiEndpoint.get<AllowedAmountFile[]>()
  .withPath(ApiPrefix, Path.build`mrf/get/${'id'}`)
