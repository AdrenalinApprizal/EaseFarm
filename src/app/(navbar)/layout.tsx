import Navbar from "@/components/Navbar";
// import Provider from "@/components/Provider";
// import NavbarFetcher from "@/components/NavbarFetcher";
import { Session } from "next-auth";
import { Notification } from "@prisma/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Navbar user={{
              username: "",
              role: ""
          }} notifications={[]}/>
    </>
  );
}
