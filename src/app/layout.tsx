import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TokeTuk Canarias - Descubre Tenerife en Tuk Tuk - TokeTuk Canarias",
  description:
    "Tours en tuk tuk 100% eléctricos por Tenerife y Gran Canaria. Descubre los rincones con más encanto, secretos escondidos y monumentos.",
  icons: { icon: "/sites/toketukcanarias/icons/favicon.png", apple: "/sites/toketukcanarias/icons/apple-touch-icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
