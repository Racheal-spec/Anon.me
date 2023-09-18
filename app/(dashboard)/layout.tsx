import "../globalstyles/globals.css";
import { poppins } from "../fonts";
import DashboardNav from "./dashboard/DashboardNav/DashboardNav";
import Sidebar from "./dashboard/Sidebar/Sidebar";
import SideNav from "./dashboard/SideNavComp/SideNav";

export const metadata = {
  title: "Anon.me",
  description: "An anonymous blog for everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined") {
    console.log("You are on the browser");
    // 👉️ can use localStorage here
  } else {
    console.log("You are on the server");
    // 👉️ can't use localStorage
  }

  return (
    <html lang="en" className={poppins.className}>
      <body>
        <div className="dashboardWrapper">
          <SideNav />
          <main> {children}</main>
        </div>
      </body>
    </html>
  );
}
