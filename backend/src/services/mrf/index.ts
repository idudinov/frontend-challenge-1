import { ClaimType, ClaimTypeToLower, type ClaimItem } from "@mano/common/models/claims.js";
import type { AllowedAmountFile, AllowedAmountItem, OutOfNetworkItem } from '@mano/common/models/mrf.js';
import { groupBy } from "@zajno/common/math/arrays";

export function generateMRFFromClaims(items: ClaimItem[]): AllowedAmountFile[] {

  const groups = groupBy(items, item => item['Group ID']);

  const currentDate = new Date().toISOString().split('T')[0];

  const results = Object.entries(groups).map(([groupId, groupItems]) => {
    const groupName = groupItems![0]["Group Name"];

    const byPlan = groupBy(groupItems!, item => item['Plan ID']);

    return Object.entries(byPlan).map(([planId, planItems]) => {
      return {
        reporting_entity_name: groupName,
        reporting_entity_type: 'group',

        plan_name: planItems![0]["Plan"],
        plan_id: planId,
        plan_market_type: 'group',
        last_updated_on: currentDate,
        version: '1.0.0',

        out_of_network: planItems!.map(planItem => ({
          name: planItem['Procedure Code'],
          billing_code: planItem['Procedure Code'],
          billing_code_type_version: '2024',
          billing_code_type: 'CPT',
          description: 'Procedure Description',
          allowed_amounts: [
            {
              tin: {
                type: 'npi',
                value: planItem['Provider ID'].toString(),
              },
              billing_class: ClaimTypeToLower(planItem['Claim Type']),
              payments: [
                {
                  allowed_amount: planItem['Allowed'],
                  billing_code_modifier: [],
                  providers: [
                    {
                      npi: [planItem['Provider ID']],
                      billed_charge: planItem['Billed'],
                    }
                  ]
                }
              ],
            } satisfies AllowedAmountItem
          ],
        } satisfies OutOfNetworkItem))
      } satisfies AllowedAmountFile;
    });
  }).flat();

  return results;
}
