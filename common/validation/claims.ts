import { ClaimItem, ClaimPaymentStatus, ClaimStatus, ClaimType } from "../models/claims";
import { z } from "zod";
import { matches, Equals, matchesLax } from "./utils/zod-matches";

const ClaimStatusEnum = z.nativeEnum(ClaimStatus);
const ClaimPaymentStatusEnum = z.nativeEnum(ClaimPaymentStatus);
const ClaimTypeEnum = z.nativeEnum(ClaimType);

const baseClaimItemSchema = z
.object({
  "Claim ID": z.string(),
  "Subscriber ID": z.string(),
  "Member Sequence": z.coerce.number(),
  "Claim Status": ClaimStatusEnum,
  Billed: z.coerce.number(),
  Allowed: z.coerce.number(),
  Paid: z.coerce.number(),
  "Payment Status Date": z.coerce.date(),
  "Service Date": z.coerce.date(),
  "Received Date": z.coerce.date(),
  "Entry Date": z.coerce.date(),
  "Processed Date": z.coerce.date(),
  "Paid Date": z.coerce.date(),
  "Payment Status": ClaimPaymentStatusEnum,
  "Group Name": z.string(),
  "Group ID": z.string(),
  "Division Name": z.string(),
  "Division ID": z.string(),
  Plan: z.string(),
  "Plan ID": z.string(),
  "Place of Service": z.string(),
  "Claim Type": ClaimTypeEnum,
  "Procedure Code": z.string(),
  "Member Gender": z.string(),
  "Provider ID": z.string(),
  "Provider Name": z.string(),
})
.required()
.strict();

export const ClaimItemSchema = matchesLax<ClaimItem>()(baseClaimItemSchema);

export const ClaimItemKeys = Object.keys(ClaimItemSchema.shape);
