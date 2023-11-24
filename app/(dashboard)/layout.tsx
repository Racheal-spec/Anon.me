import "../globalstyles/globals.css";
import { inter } from "../fonts";
import SideNav from "./dashboard/SideNavComp/SideNav";
import { MainContext } from "../context";
import ToastProvider from "../ToastProvider";
import { BASE_URL } from "../Routes/RoutesUrl";

export const metadata = {
  title: "Penbuddy|Dashboard",
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
