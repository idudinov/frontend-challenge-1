import { ModelProps } from "@/types/props";
import { FileProcessViewModel } from "@/viewModels/ProcessFileViewModel";
import { observer } from "mobx-react-lite";
import { Button } from "../common/Button";
import { UploadCloud } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/constants/routes";

export const UploadProcessedData = observer(function UploadProcessedData({ model }: ModelProps<FileProcessViewModel>) {
  const navigate = useNavigate();

  const onUpload = useCallback(() => {
    model.upload().then((res) => {
      if (res) {
        model.reset();
        navigate(Routes.List);
      }
    });
  }, [model, navigate]);

  return (
    <div className="flex flex-col gap-3 items-stretch">
      <div className="text-xl">Your data is ready for upload.</div>

      {/* TODO add some form fields here */}
      <Button
        leftSection={<UploadCloud />}
        onClick={onUpload}
      >
        Upload
      </Button>

      {model.apiError.value && <div className="text-red-500 max-w-48 text-center self-center">{model.apiError.value}</div>}
    </div>
  );
});
