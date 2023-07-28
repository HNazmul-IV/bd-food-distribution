import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { UserContextData } from "../lib/context/UserContext";
import Navbar from "../lib/components/Navbar";

export default function LandingPageLayout() {
  const { user } = useContext(UserContextData);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
