import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NavbarFetcher from "@/components/NavbarFetcher";
import { Session } from "next-auth";
import { Notification } from "@prisma/client";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "EaseFarm",
  description: "The best smart farming solution you can find!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/logoeasefarm.png" />
      <body className={poppins.className}>
        <NavbarFetcher>
          {({ user, notifications }) => (
            <Navbar
              user={user as Session["user"]}
              notifications={notifications as Notification[]}
            />
          )}
        </NavbarFetcher>
        <ToasterContext />
        <div>{children}</div>
      </body>
    </html>
  );
}
