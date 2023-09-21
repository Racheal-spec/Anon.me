import "../globalstyles/globals.css";
import { poppins } from "../fonts";
import SideNav from "./dashboard/SideNavComp/SideNav";
import { MainContext } from "../context";
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
