import { ZodError } from "zod";

export class DataParseError extends Error {
  constructor(
    message: string,
    readonly inner?: ZodError,
  ) {
    super(message);
  }

  public static fromZodError(e: ZodError<unknown>) {
    const firstError = e.issues[0]; // TODO show few first errors?

    const path = firstError.path.slice();

    const row = path.shift();
    let rowIndex: number | null = typeof row === 'number' ? row : parseInt(row ?? '', 10);
    if (isNaN(rowIndex)) {
      rowIndex = null;
    }

    const rowPart = rowIndex !== null ? ` at row ${rowIndex + 1}` : '';

    const message = `Error while validating field "${path.join("/")}"${rowPart}: ${firstError.message}`;
    return new DataParseError(message, e);
  }
}
