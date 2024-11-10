import type { FromSchema } from "json-schema-to-ts";
import type { AllowedAmountsSchema } from "../schemas/allowed-amounts.schema.js";

export type AllowedAmountFile = FromSchema<typeof AllowedAmountsSchema>;
export type OutOfNetworkItem = AllowedAmountFile["out_of_network"][number];
export type AllowedAmountItem = OutOfNetworkItem["allowed_amounts"][number];
export type PaymentItem = AllowedAmountItem["payments"][number];
export type ProviderItem = PaymentItem["providers"][number];
