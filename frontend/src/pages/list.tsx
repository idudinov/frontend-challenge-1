import { MRFFilesList } from "@/components/list/MRFFilesList";

export default function ListPage() {
  return (
    <div className="flex flex-col h-full w-full text-gray-400 px-10 pt-20">
      <div className="">
        Current uploaded files
      </div>
      <MRFFilesList className="mt-5" />
    </div>
  );
}
