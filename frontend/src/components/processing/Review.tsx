import { useCallback, useRef } from "react";
import { observer } from "mobx-react-lite";
import { ColDef, RowSelectionOptions } from "@ag-grid-community/core";
import { FlagModel } from "@zajno/common-mobx/viewModels/FlagModel";
import { ModelProps } from "@/types/props";
import { FileProcessViewModel } from "@/viewModels/ProcessFileViewModel";
import { AgGridReact } from "@/lib/grid";
import { Button } from "../common/Button";

import { ClaimItem } from "@common/models/claims";
import { ClaimItemKeys } from "@common/validation/claims";
import { useModel } from "../common/hooks/useModel";

export const ClaimsReviewTable = observer(function ClaimsTable({ model }: ModelProps<FileProcessViewModel>) {
  const gridRef = useRef<AgGridReact<ClaimItem> | null>(null);
  const hasSelectedRows = useModel(FlagModel);

  const onRowSelectionChanged = useCallback(() => {
    hasSelectedRows.setValue(!!gridRef.current?.api.getSelectedRows().length);
  }, [hasSelectedRows]);

  const doRemoveSelected = useCallback(() => {
    const selectedData = gridRef.current!.api.getSelectedNodes();
    gridRef.current!.api.applyTransaction({
      remove: selectedData.map((node) => node.data),
    });

    const indexesToRemove = selectedData.map((node) => node.rowIndex).sort((a, b) => b - a);
    indexesToRemove.forEach((index) => model.data.value.splice(index, 1));
  }, [model]);

  const doAddRow = useCallback(() => {
    const newRow = {} as ClaimItem;

    gridRef.current!.api.applyTransaction({
      add: [newRow],
      addIndex: 0,
    })!;

    model.data.value.unshift(newRow);
  }, [model]);

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
      <div className="flex flex-row items-center justify-between">
        {!model.approveError.value ? (
          <div>Total Items count: {model.data.value.length}</div>
        ) : (
          <div className="text-red-500">{model.approveError.value}</div>
        )}
        <div className="flex flex-row gap-3">
          <Button onClick={doAddRow}>Add</Button>
          <Button
            disabled={!hasSelectedRows.value}
            color="red"
            onClick={doRemoveSelected}
          >
            Remove Selected
          </Button>
        </div>
      </div>
      <AgGridReact<ClaimItem>
        ref={gridRef}
        className="ag-theme-quartz"
        rowData={model.data.value}
        columnDefs={GridColumns}
        defaultColDef={DefaultColDef}
        rowClass="text-left"
        pagination
        paginationPageSizeSelector
        stopEditingWhenCellsLoseFocus
        rowSelection={RowSelection}
        onSelectionChanged={onRowSelectionChanged}
      />
    </div>
  );
});

const RowSelection: RowSelectionOptions = { mode: "multiRow" };

const DefaultColDef: ColDef<ClaimItem> = {
  headerClass: /* @tw */ "font-bold text-primary border-b border-gray-300",
  editable: true,
};

// cheat code while we don't need to customize columns behaviour per field
const GridColumns: ColDef<ClaimItem>[] = ClaimItemKeys.map((key) => ({ field: key as keyof ClaimItem }));
