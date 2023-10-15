import "../globalstyles/globals.css";
import { poppins } from "../fonts";
import SideNav from "./dashboard/SideNavComp/SideNav";
import { MainContext } from "../context";
import ToastProvider from "../ToastProvider";

export const metadata = {
  title: "Penbuddy|Dashboard",
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
        <MainContext>
          <div className="dashboardWrapper">
            <SideNav />
            <main className="mainStyle">
              <ToastProvider>{children}</ToastProvider>
            </main>
          </div>
        </MainContext>
      </body>
    </html>
  );
}
