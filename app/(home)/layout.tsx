import { Suspense } from "react";
import ToastProvider from "../ToastProvider";
import Navbar from "../components/Navbar/navbar";
import { MainContext } from "../context";
import { inter } from "../fonts";
import "../globalstyles/globals.css";
import Loading from "./Loading";
import { BASE_URL } from "../Routes/RoutesUrl";

export const metadata = {
  title: "Penbuddy|Home",
  description: "An anonymous blogging community for everyone",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!BASE_URL) {
    return null;
  }

  return (
    <html lang="en" className={inter.className}>
      <body>
          <MainContext>
            <div className="globalpadding">
              <Navbar />
              <ToastProvider>{children}</ToastProvider>
            </div>
          </MainContext>
      </body>
    </html>
  );
}
