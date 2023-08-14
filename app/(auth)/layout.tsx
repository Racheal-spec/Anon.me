import { Providers } from "../Providers";
import Navbar from "../components/Navbar/navbar";
import { MainContext } from "../context";
import "../globals.css";
import { poppins } from "../fonts";

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
        <body>{children}</body>
      </MainContext>
    </html>
  );
}
