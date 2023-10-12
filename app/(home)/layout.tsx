"use client";
import { Suspense } from "react";
import ToastProvider from "../ToastProvider";
import Navbar from "../components/Navbar/navbar";
import { MainContext } from "../context";
import { poppins } from "../fonts";
import "../globalstyles/globals.css";
import Loading from "./Loading";
import { configureAbly } from "@ably-labs/react-hooks";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";

// export const metadata = {
//   title: "Anon.me",
//   description: "An anonymous blog for everyone",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const client = new Ably.Realtime.Promise({
  //   authUrl: "http://localhost:3000/api/auth/createTokenReq",
  // });

  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Suspense fallback={<Loading />}>
          <MainContext>
            <div className="globalpadding">
              <Navbar />
              <ToastProvider>
                {/* <AblyProvider client={client}>{children}</AblyProvider> */}
                {children}
              </ToastProvider>
            </div>
          </MainContext>
        </Suspense>
      </body>
    </html>
  );
}
