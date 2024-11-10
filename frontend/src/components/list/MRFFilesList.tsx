import { observer } from "mobx-react-lite";
import { useModel } from "../common/hooks/useModel";
import { MRFFilesViewModel } from "@/viewModels/MRFFilesViewModel";
import { ClassProps } from "@/types/props";

export const MRFFilesList = observer(function MRFFilesList({ className }: ClassProps) {
  const model = useModel(MRFFilesViewModel);

  return (
    <div className={className}>
      {model.items?.map((id, i) => (
        <div key={i}>{id}</div>
      ))}
    </div>
  )
});
