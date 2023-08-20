import { Providers } from "../Providers";
import Navbar from "../components/Navbar/navbar";
import { MainContext } from "../context";
import "../globalstyles/globals.css";
import { poppins } from "../fonts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../ToastProvider";

export const metadata = {
  title: "Anon.me",
  description: "An anonymous blog for everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <MainContext>
        <body>
          <ToastProvider>{children}</ToastProvider>
        </body>
      </MainContext>
    </html>
  );
}
