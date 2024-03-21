import { Header } from "@/components/Header";
import { ApiProvider } from "@/context/apiContext";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Fast food",
  description: "Order your next meal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <ApiProvider>
          <div className="h-full w-full flex flex-col items-center justify-center gap-10">
            <Header />
            <main className="flex min-h-screen flex-col items-center justify-between gap-8 w-4/5">
              {children}
            </main>
          </div>
        </ApiProvider>
      </body>
    </html>
  );
}
