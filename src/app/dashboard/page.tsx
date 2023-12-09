import { Session, getServerSession } from "next-auth";
import Home from "./Dashboard";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

const page = async () => {
  const session = (await getServerSession(authOptions)) as Session;
  return <Home />;
};

export default page;
