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
        <Image src="./logo.png" className="absolute w-24 h-24 bottom-0 right-0 z-10" alt="Logo" />
        <Image src="./flowers.png" className="absolute w-72 w-72 -bottom-4 -left-24 z-10 rotate-180" alt="Flowers" />
        <Image src="./flowers.png" className="absolute w-72 w-72 -top-4 -right-24 z-10" alt="Flowers" />
        {children}
      </body>
    </html>
  );
}
