import Navbar from "../components/Navbar/navbar";
import { MainContext } from "../context";
import "../globals.css";

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
    <html lang="en">
      <MainContext>
        <body>
          <Navbar />
          {children}
        </body>
      </MainContext>
    </html>
  );
}
