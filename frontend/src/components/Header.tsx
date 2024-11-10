import { Routes } from "@/constants/routes";
import { twm } from "@/lib/tw";
import { ClassProps } from "@/types/props";
import { AuthViewModel } from "@/viewModels/AuthViewModel";
import { Anchor } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./common/Button";

export const Header = () => {
  return (
    <header className="fixed left-0 top-0 right-0 px-10 py-4 bg-slate-100 flex flex-row gap-4 items-center">
      <Link to={Routes.Home}>
        <img
          src="https://cdn.prod.website-files.com/66af96a83d81320cf5f6a4e6/66af98e433ce62c932e04c80_Logo%20Dark.svg"
          alt="logo"
          className="h-7 w-auto"
        />
      </Link>

      <Navigation />

      <UserState className="ml-auto" />
    </header>
  );
};

const Navigation = observer(function Navigation() {
  const { isLoggedIn } = AuthViewModel.Instance;

  return (
    <nav className="flex gap-4 ml-4">
      <NavLink to={Routes.Home}>Home</NavLink>
      {!isLoggedIn ? null : <NavLink to={Routes.Process}>Process</NavLink>}
      <NavLink to={Routes.List}>View Files</NavLink>
    </nav>
  );
});

const NavLink = ({ to, children }: PropsWithChildren<{ to: string }>) => {
  const { pathname } = useLocation();

  return (
    <Anchor
      component={Link}
      underline={pathname === to ? "always" : "hover"}
      to={to}
    >
      {children}
    </Anchor>
  );
};

const UserState = observer(function UserState({ className }: ClassProps) {
  const { isLoggedIn, userInitials, login, logout } = AuthViewModel.Instance;

  return (
    <div className={twm("flex flex-row gap-2 items-center", className)}>
      {isLoggedIn ? (
        <Button
          variant="outline"
          color="red"
          onClick={logout}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="outline"
          color="green"
          onClick={login}
        >
          Login
        </Button>
      )}

      {!isLoggedIn ? null : (
        <div className="size-9 flex items-center justify-center rounded-full bg-slate-500 text-white">{userInitials}</div>
      )}
    </div>
  );
});
