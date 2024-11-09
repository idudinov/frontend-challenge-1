import { ClaimItem, ClaimMemberGender, ClaimPaymentStatus, ClaimStatus, ClaimType } from "../models/claims.js";
import { z } from "zod";
import { matchesLax } from "./utils/zod-matches.js";
import { DataParseError } from "./utils/error.js";

const baseClaimItemSchema = z
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
  "Provider ID": z.string(),
  "Provider Name": z.string(),
})
.required()
.strict();

export const ClaimItemSchema = matchesLax<ClaimItem>()(baseClaimItemSchema);

export const ClaimItemKeys = Object.keys(ClaimItemSchema.shape);

export function validateClaimItems(items: unknown[]) {
  const parsed: ClaimItem[] = Array.from({ length: items.length });

  for (let i = 0; i < items.length; ++i) {
    const raw = items[i];
    const result = ClaimItemSchema.safeParse(raw);

    if (!result.success) {
      throw DataParseError.fromZodError(i, result.error);
    }

    parsed[i] = result.data;
  }

  return parsed;
}
