import { ModelProps } from "@/types/props";
import { ProcessFileViewModel } from "@/viewModels/ProcessFileViewModel";
import { observer } from "mobx-react-lite";
import { Button } from "../common/Button";

import { AgGridReact } from "@ag-grid-community/react";
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClaimItem } from "@common/models/claims";
import { ClaimItemKeys } from "@common/validation/claims";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const ClaimsTable = observer(function ClaimsTable({ model }: ModelProps<ProcessFileViewModel>) {
  if (!model.data.value?.length) {
    return <div>No Data</div>;
  }

  return (
    <div className="flex flex-col gap-2 h-[600px] w-full">
      <div className="flex flex-row mx-auto gap-3">
        <Button
          className="max-w-40 min-w-24"
          onClick={model.approve}
        >
          Approve
        </Button>
        <Button
          className="max-w-40 min-w-24"
          onClick={model.reset}
          color="red"
        >
          Restart
        </Button>
      </div>
      <div>Total Items count: {model.data.value.length}</div>
      <AgGridReact
        className="ag-theme-quartz"
        rowData={model.data.value}
        columnDefs={GridColumns}
        defaultColDef={DefaultColDef}
        rowClass="text-left"
        pagination
        paginationPageSizeSelector
      />
    </div>
  );
});

const DefaultColDef: ColDef<ClaimItem> = {
  headerClass: /* @tw */ "font-bold text-primary border-b border-gray-300",
};

const GridColumns: ColDef<ClaimItem>[] = ClaimItemKeys.map((key) => ({ field: key as keyof ClaimItem }));
