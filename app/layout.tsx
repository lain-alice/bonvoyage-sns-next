import type { Metadata } from "next";
// import { Inter, Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// const notoSansKr = Noto_Sans_KR({
//   subsets: ["latin"],
//   weight: ["100", "400", "700", "900"],
// });

const pretendard = localFont({
  src: [
    {
      path: "./fonts/Pretendard-Thin.woff",
      weight: "100",
    },
    {
      path: "./fonts/Pretendard-ExtraLight.woff",
      weight: "200",
    },
    {
      path: "./fonts/Pretendard-Light.woff",
      weight: "300",
    },
    {
      path: "./fonts/Pretendard-Regular.woff",
      weight: "400",
    },
    {
      path: "./fonts/Pretendard-Medium.woff",
      weight: "500",
    },
    {
      path: "./fonts/Pretendard-SemiBold.woff",
      weight: "600",
    },
    {
      path: "./fonts/Pretendard-Bold.woff",
      weight: "700",
    },
    {
      path: "./fonts/Pretendard-ExtraBold.woff",
      weight: "800",
    },
    {
      path: "./fonts/Pretendard-Black.woff",
      weight: "900",
    },
  ],
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Bon Voyage!",
  description: "여행 후기 SNS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
