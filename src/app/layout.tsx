import "./globals.css";

export const metadata = {
  title: "Khodor Wahab Devs",
  description: "Your trusted software development partner",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}