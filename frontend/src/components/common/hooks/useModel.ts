import { useMemo } from "react";

export function useModel<T>(Factory: new () => T): T {
  return useMemo(() => new Factory(), [Factory]);
}
