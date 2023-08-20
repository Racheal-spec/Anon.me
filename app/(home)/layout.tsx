import { getUsers } from "../ClientApi/Api";
import Navbar from "../components/Navbar/navbar";
import { MainContext } from "../context";
import { poppins } from "../fonts";
import "../globalstyles/globals.css";

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
          <Navbar />
          <div className="globalpadding">{children}</div>
        </body>
      </MainContext>
    </html>
  );
}
