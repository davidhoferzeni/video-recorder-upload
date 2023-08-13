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
      <body className={`${mulish.className} overflow-hidden min-h-[100dvh] max-h-screen`}>
<div className="overflow-hidden min-h-[100dvh] max-h-[100dvh]
        <div className="m-4 absolute w-24 h-24 top-0 left-0 z-10">
          <Image fill={true} src="/logo.png" alt="Logo" />
        </div>
        <div className="absolute w-72 h-72 -top-4 -right-24 z-10">
          <Image fill={true} src="/flowers.png" alt="Flowers" />
        </div>
        {children}
</div>
      </body>
    </html>
  );
}
