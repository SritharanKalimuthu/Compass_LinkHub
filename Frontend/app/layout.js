import "./globals.css";
import { ubuntu } from "./components/fonts";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} antialiased`}>{children}</body>
    </html>
  );
}
