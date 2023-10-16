import { MainContext } from "../context";
import "../globalstyles/globals.css";
import { poppins } from "../fonts";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../ToastProvider";
import Loading from "./Loading";
import { Suspense } from "react";
import { BASE_URL } from "../Routes/RoutesUrl";

export const metadata = {
  title: "Penbuddy|Authentication",
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
