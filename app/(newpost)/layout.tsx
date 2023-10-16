import { Suspense } from "react";
import ToastProvider from "../ToastProvider";
import { poppins } from "../fonts";
import "../globalstyles/globals.css";
import { MainContext } from "../context";
import Loading from "./Loading";
import { BASE_URL } from "../Routes/RoutesUrl";

export const metadata = {
  title: "Penbuddy|Write a new story",
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
            <div className="globalpadding">
              <ToastProvider>{children}</ToastProvider>
            </div>
          </MainContext>
        </Suspense>
      </body>
    </html>
  );
}
