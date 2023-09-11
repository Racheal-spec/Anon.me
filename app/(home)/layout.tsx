import { Suspense } from "react";
import ToastProvider from "../ToastProvider";
import Navbar from "../components/Navbar/navbar";
import { MainContext } from "../context";
import { poppins } from "../fonts";
import "../globalstyles/globals.css";
import { handleuser } from "../services/userdata";
import Loading from "./Loading";

export const metadata = {
  title: "Anon.me",
  description: "An anonymous blog for everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = handleuser;
  // console.log(handleuser);
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Suspense fallback={<Loading />}>
          <MainContext>
            <div className="globalpadding">
              <Navbar />
              <ToastProvider>{children}</ToastProvider>
            </div>
          </MainContext>
        </Suspense>
      </body>
    </html>
  );
}
