import {
  ApiEndpoint,
} from '@zajno/common/api';
import type { IEndpointInfo } from '@zajno/common/api/endpoint.types';
import type { AnyObject } from '@zajno/common/types/misc';

declare module '@zajno/common/api/endpoint' {
  export interface ApiEndpoint<
      TIn extends object | null,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      TOut,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      TPath extends readonly string[],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      TQuery extends object,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      TErrors,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      THeaders
  > {
      isAuthenticated?: boolean;

      asAuthenticated(): this;
  }

  /* namespace IEndpointInfo {
      interface IIn<
          TIn extends object | null,
      > {
          validationBody?: SchemaValidation<TIn>;
          readonly permission?: UserPermissions;
      }
  } */

  interface IEndpointInfo {
      readonly isAuthenticated?: boolean;
  }
}

ApiEndpoint.prototype.asAuthenticated = function <TIn extends AnyObject | null>(
  this: ApiEndpoint<TIn, unknown, readonly string[], object, unknown, unknown>,
  value = true,
) {
  this.isAuthenticated = value;
  return this;
};

export { ApiEndpoint, IEndpointInfo };
