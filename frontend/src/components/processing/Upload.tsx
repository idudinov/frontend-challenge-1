import { ModelProps } from "@/types/props";
import { FileProcessViewModel } from "@/viewModels/ProcessFileViewModel";
import { observer } from "mobx-react-lite";
import { Button } from "../common/Button";
import { UploadCloud } from "lucide-react";

export const UploadProcessedData = observer(function UploadProcessedData({ model }: ModelProps<FileProcessViewModel>) {
  return (
    <div className="flex flex-col gap-3 items-stretch">
      <div className="text-xl">Your data is ready for upload.</div>

      {/* TODO add some form fields here */}
      <Button
        leftSection={<UploadCloud />}
        onClick={model.upload}
      >
        Upload
      </Button>

      {model.apiError.value && <div className="text-red-500 max-w-48 text-center self-center">{model.apiError.value}</div>}
    </div>
  );
});
