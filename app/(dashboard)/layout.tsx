import "../globalstyles/globals.css";
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
      <body>{children}</body>
    </html>
  );
}
