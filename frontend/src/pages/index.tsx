import { FileProcessor } from "@/components/processing/FileProcessor";

export default function MainPage() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-400 text-center">
      <div className="w-full px-10">
        <h1 className="text-3xl font-bold">Welcome to MRF parser</h1>

        <FileProcessor className="mt-5"/>
      </div>
    </div>
  );
}
