import { observer } from "mobx-react-lite";
import { useModel } from "../common/hooks/useModel";
import { MRFFilesViewModel } from "@/viewModels/MRFFilesViewModel";
import { ClassProps } from "@/types/props";
import { Link } from "react-router-dom";
import { twm } from "@/lib/tw";

export const MRFFilesList = observer(function MRFFilesList({ className }: ClassProps) {
  const model = useModel(MRFFilesViewModel);

  return (
    <div className={twm("flex flex-col gap-2", className)}>
      {model.items?.map((file) => (
        <Link
          key={file.id}
          to="#"
          className="group"
        >
          <div className="px-2 py-1 rounded-md border border-slate-400 group-hover:bg-slate-100 transition-colors flex flex-row justify-between w-full">
            <div>{file.name || file.id}</div>

            {!file.createdAt ? null : <div>{new Date(file.createdAt).toLocaleString()}</div>}
          </div>
        </Link>
      ))}
    </div>
  );
});
