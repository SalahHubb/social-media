import React from "react";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children ?? <Outlet />}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default PrivateRoute;
