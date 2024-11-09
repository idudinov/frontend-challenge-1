import { observer } from "mobx-react-lite";
import { useModel } from "../common/hooks/useModel";
import { FileProcessViewModel } from "@/viewModels/ProcessFileViewModel";
import { ProcessLocalFile } from "./Process";
import { ClaimsReviewTable } from "./Review";
import { ClassProps } from "@/types/props";
import { twm } from "@/lib/tw";
import { UploadProcessedData } from "./Upload";

export const FileProcessFlow = observer(function FileProcessor({ className }: ClassProps) {
  const model = useModel(FileProcessViewModel);

  const renderContent = () => {
    switch (model.display.value) {
      case "initial": {
        return <ProcessLocalFile model={model} />;
      }

      case "review": {
        return <ClaimsReviewTable model={model} />;
      }

      case "upload": {
        return <UploadProcessedData model={model} />;
      }

      default: {
        return null;
      }
    }
  };

  return <div className={twm("w-full flex flex-col items-center justify-center", className)}>{renderContent()}</div>;
});
