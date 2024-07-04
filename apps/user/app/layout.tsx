import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import { AppbarClient } from "../components/AppbarClient";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={poppins.className}>
          <AppbarClient />
          {children}
        </body>
      </Providers>
    </html>
  );
}