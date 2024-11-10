import { Button } from "@/components/common/Button";
import { Routes } from "@/constants/routes";
import { AuthViewModel } from "@/viewModels/AuthViewModel";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export const MainPage = observer(function MainPage() {
  const { isLoggedIn, login } = AuthViewModel.Instance;

  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-400 text-center">
      <div className="flex flex-col gap-10 items-center">
        <h1 className="text-3xl font-bold">Welcome to MRF parser</h1>

        <div className="flex flex-row gap-4">
          {isLoggedIn ? (
            <Button
              component={Link}
              to={Routes.Process}
              disabled={!isLoggedIn}
            >
              Process Claims
            </Button>
          ) : (
            <Button
              color="green"
              onClick={login}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});
