import "./globals.css";
import { Mulish } from "next/font/google";
import Image from "next/image";

const mulish = Mulish({ subsets: ["latin"], weight: "300" });

export const metadata = {
  title: "Video Messages",
  description: "Send a video message!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <div className="absolute w-24 h-24 bottom-0 right-0 z-10">
          <Image fill={true} src="/logo.png" alt="Logo" />
        </div>
        <div className="absolute w-72 h-72 -bottom-4 -left-24 z-10 rotate-180">
          <Image fill={true} src="/flowers.png" alt="Flowers" />
        </div>
        <div className="absolute w-72 h-72 -top-4 -right-24 z-10">
          <Image fill={true} src="/flowers.png" alt="Flowers" />
        </div>
        {children}
      </body>
    </html>
  );
}
