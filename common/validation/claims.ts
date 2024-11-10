import { ClaimItem, ClaimMemberGender, ClaimPaymentStatus, ClaimStatus, ClaimType } from "../models/claims.js";
import { z } from "zod";
import { matchesLax } from "./utils/zod-matches.js";
import { DataParseError } from "./utils/error.js";

const ClaimItemSchema = z
  .object({
    "Claim ID": z.string(),
    "Subscriber ID": z.string(),
    "Member Sequence": z.coerce.number(),
    "Claim Status": z.nativeEnum(ClaimStatus),
    Billed: z.coerce.number(),
    Allowed: z.coerce.number(),
    Paid: z.coerce.number(),
    "Payment Status Date": z.coerce.date(),
    "Service Date": z.coerce.date(),
    "Received Date": z.coerce.date(),
    "Entry Date": z.coerce.date(),
    "Processed Date": z.coerce.date(),
    "Paid Date": z.coerce.date(),
    "Payment Status": z.nativeEnum(ClaimPaymentStatus),
    "Group Name": z.string(),
    "Group ID": z.string(),
    "Division Name": z.string(),
    "Division ID": z.string(),
    Plan: z.string(),
    "Plan ID": z.string(),
    "Place of Service": z.string(),
    "Claim Type": z.nativeEnum(ClaimType),
    "Procedure Code": z.string(),
    "Member Gender": z.nativeEnum(ClaimMemberGender),
    "Provider ID": z.coerce.number(),
    "Provider Name": z.string(),
  })
  .required()
  .strict();

const ClaimItemsSchema = matchesLax<ClaimItem[]>()(z.array(ClaimItemSchema));

export const ClaimItemKeys = Object.keys(ClaimItemSchema.shape);

export function validateClaimItems(items: unknown): ClaimItem[] {
  const result = ClaimItemsSchema.safeParse(items);
  if (!result.success) {
    throw DataParseError.fromZodError(result.error);
  }

  return result.data;
}
