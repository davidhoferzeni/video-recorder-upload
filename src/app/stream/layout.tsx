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
        <div className="absolute w-72 h-72 -bottom-4 -left-24 z-10 rotate-180">
          <Image fill={true} src="/flowers.png" alt="Flowers" />
        </div>
        {children}
      </body>
    </html>
  );
}
