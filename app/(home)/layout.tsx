import Navbar from "../components/Navbar/navbar";
import { MainContext } from "../context";
import { poppins } from "../fonts";
import "../globalstyles/globals.css";
import { handleuser } from "../services/userdata";

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
        <MainContext>
          <div className="globalpadding">
            <Navbar />
            {children}
          </div>
        </MainContext>
      </body>
    </html>
  );
}
