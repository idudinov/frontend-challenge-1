import { Button } from "@/components/common/Button";
import { Routes } from "@/constants/routes";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-400 text-center">
      <div className="flex flex-col gap-10 items-center">
        <h1 className="text-3xl font-bold">Welcome to MRF parser</h1>

        <div className="flex flex-row gap-4">
          <Button
            component={Link}
            to={Routes.Process}
          >
            Process Claims
          </Button>
        </div>
      </div>
    </div>
  );
}
