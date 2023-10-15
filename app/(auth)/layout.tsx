import { Providers } from "../Providers";
import Navbar from "../components/Navbar/navbar";
import { MainContext } from "../context";
import "../globalstyles/globals.css";
import { poppins } from "../fonts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../ToastProvider";
import Loading from "./Loading";
import { Suspense } from "react";

export const metadata = {
  title: "Penbuddy|Authentication",
  description: "An anonymous blogging community for everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Suspense fallback={<Loading />}>
          <MainContext>
            <ToastProvider>{children}</ToastProvider>
          </MainContext>
        </Suspense>
      </body>
    </html>
  );
}
