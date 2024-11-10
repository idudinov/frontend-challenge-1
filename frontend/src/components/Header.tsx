import { Routes } from "@/constants/routes";
import { Anchor } from "@mantine/core";
import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";

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

      <nav className="flex gap-4 ml-4">
        <NavLink to={Routes.Home}>Home</NavLink>
        <NavLink to={Routes.Process}>Process</NavLink>
        <NavLink to={Routes.List}>View Files</NavLink>
      </nav>
    </header>
  );
};

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
