
export type ClaimsSchema = ClaimItem[];

export enum ClaimStatus {
  Payable = "Payable",
  Denied = "Denied",
  PartialDeny = "Partial Deny",
}

export enum ClaimPaymentStatus {
  Paid = "Paid",
}

export enum ClaimType {
  Professional = "Professional",
  Institutional = "Institutional",
}

export enum ClaimMemberGender {
  Male = "Male",
  Female = "Female",
}

export type ClaimItem = {
  "Claim ID": string;
  "Subscriber ID": string;
  "Member Sequence": number;
  "Claim Status": ClaimStatus;
  Billed: number;
  Allowed: number;
  Paid: number;
  "Payment Status Date": Date;
  "Service Date": Date;
  "Received Date": Date;
  "Entry Date": Date;
  "Processed Date": Date;
  "Paid Date": Date;
  "Payment Status": ClaimPaymentStatus;
  "Group Name": string;
  "Group ID": string;
  "Division Name": string;
  "Division ID": string;
  Plan: string;
  "Plan ID": string;
  "Place of Service": string;
  "Claim Type": ClaimType;
  "Procedure Code": string;
  "Member Gender": ClaimMemberGender;
  "Provider ID": string;
  "Provider Name": string;
};
