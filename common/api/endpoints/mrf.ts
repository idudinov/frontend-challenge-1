import { Path } from "@zajno/common/structures/path"
import type { FileInfo } from "../../models/file.js"
import type { AllowedAmountFile } from "../../models/mrf.js"
import { ApiPrefix } from "./_base.js"
import { ApiEndpoint } from "./_extend.js"


export const ListMRFs = ApiEndpoint.get<FileInfo[]>()
  .withPath(ApiPrefix, 'mrf/list')

export const GetMRF = ApiEndpoint.get<AllowedAmountFile[]>()
  .withPath(ApiPrefix, Path.build`mrf/get/${'id'}`)
