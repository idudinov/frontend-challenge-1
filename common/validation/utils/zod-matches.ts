import { z } from "zod";

// https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

export type EqualsLax<T, S> = [T] extends [S] ? ([S] extends [T] ? true : false) : false;

// https://github.com/colinhacks/zod/issues/372#issuecomment-2445439772
export const matches =
  <T>() =>
  <S extends z.ZodType<T, z.ZodTypeDef, unknown>>(
    schema: Equals<S["_output"], T> extends true
      ? S
      : S & {
          "types do not match": {
            expected: T;
            received: S["_output"];
          };
        },
  ): S => {
    return schema;
  };

export const matchesLax =
  <T>() =>
  <S extends z.ZodType<T, z.ZodTypeDef, unknown>>(
    schema: EqualsLax<S["_output"], T> extends true
      ? S
      : S & {
          "types do not match": {
            expected: T;
            received: S["_output"];
          };
        },
  ): S => {
    return schema;
  };
