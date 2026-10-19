import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nandakumar & Adithya | Wedding Invitation",
  description: "A traditional wedding invitation celebrating Nandakumar and Adithya.",
  openGraph: {
    title: "Nandakumar & Adithya | Wedding Invitation",
    description: "With love and blessings, join us for our wedding celebration.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
