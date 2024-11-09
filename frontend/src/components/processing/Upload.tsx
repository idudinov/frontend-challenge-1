import { ModelProps } from "@/types/props";
import { ProcessFileViewModel } from "@/viewModels/ProcessFileViewModel";
import { observer } from "mobx-react-lite";
import { FileInput } from "../common/FileInput";
import { FileSpreadsheetIcon } from "lucide-react";
import { Button } from "../common/Button";
import { useEffect } from "react";

export const UploadFile = observer(function UploadFile({ model }: ModelProps<ProcessFileViewModel>) {
  const currentFile = model.file.value;

  // auto parse file on load
  useEffect(() => {
    model.parseCurrentFile();
  }, [model, currentFile]);

  return (
    <div className="flex flex-col gap-2">
      <FileInput
        className="min-w-80"
        leftSection={<FileSpreadsheetIcon />}
        placeholder="Upload your CSV file here"
        accept="text/csv"
        onChange={model.file.setValue.bind(model.file)}
        value={currentFile}
        error={model.uploadError.value}
      >
        Upload File
      </FileInput>

      <Hint model={model} />

      <div className="flex flex-row gap-2 w-full">
        {!model.data.value ? null : (
          <Button
            className="grow"
            onClick={model.startReview}
          >
            Review Data
          </Button>
        )}

        {!currentFile ? null : (
          <Button
            className="grow"
            onClick={model.reset}
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
});

const Hint = observer(function Hint({ model }: ModelProps<ProcessFileViewModel>) {
  if (model.uploadError.value) {
    return <div>Please check file for errors and try again</div>;
  }

  if (!model.data.value) {
    return <div>Select your CSV file to start</div>;
  }

  return <div>Files looks good, you can proceed to review</div>;
});
