import { ZodError } from "zod";

export class DataParseError extends Error {
  constructor(
    readonly row: number,
    message: string,
    readonly inner?: ZodError,
  ) {
    super(message);
  }

  public static fromZodError(index: number, e: ZodError<unknown>) {
    const firstError = e.issues[0]; // TODO show few first errors?
    const message = `Error while validating field "${firstError.path.join("/")}" at row ${index + 1}: ${firstError.message}`;
    return new DataParseError(index + 1, message, e);
  }
}
