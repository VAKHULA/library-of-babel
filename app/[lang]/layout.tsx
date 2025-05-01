import type { Metadata } from "next"
import "@picocss/pico/css/pico.blue.min.css"

import "./globals.scss";

export const metadata: Metadata = {
  title: "Book of Babel",
  description: "Book of Babel (simplified Library of Babel site)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
