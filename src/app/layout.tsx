import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import SessionProvider from "./components/Auth/SessionProvider/SessionProvider";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portolio",
  description: "あなたの挫折、失敗経験をポートフォリオにしよう",
  openGraph: {
    title: "Portolio",
    description: "あなたの挫折、失敗経験をポートフォリオにしよう",
    url: `${process.env.NEXT_PUBLIC_URL}`,
    siteName: "Portolio",
    images: [
      {
        width: "1200",
        height: "630",
        url: `${process.env.NEXT_PUBLIC_URL}/ogps/ogp.png`
      }
    ],
    locale: "jp",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={notoSansJP.className}>
          <main>{children}</main>
        </body>
      </SessionProvider>
    </html>
  );
}
