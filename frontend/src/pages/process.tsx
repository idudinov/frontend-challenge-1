import { FileProcessFlow } from "@/components/processing/FileProcessFlow";

export default function ProcessPage() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-400 text-center">
      <div className="w-full px-10">
        <FileProcessFlow className="mt-5"/>
      </div>
    </div>
  );
}
