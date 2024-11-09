import { observer } from "mobx-react-lite";
import { useModel } from "../common/hooks/useModel";
import { ProcessFileViewModel } from "@/viewModels/ProcessFileViewModel";
import { UploadFile } from "./Upload";
import { ClaimsTable } from "./ClaimsTable";
import { ClassProps } from "@/types/props";
import { twm } from "@/lib/tw";

export const FileProcessor = observer(function FileProcessor({ className }: ClassProps) {
  const model = useModel(ProcessFileViewModel);

  const renderContent = () => {
    switch (model.display.value) {
      case "initial": {
        return <UploadFile model={model} />;
      }

      case "review": {
        return <ClaimsTable model={model} />;
      }

      default: {
        return null;
      }
    }
  };

  return <div className={twm("w-full flex flex-col items-center justify-center", className)}>{renderContent()}</div>;
});
