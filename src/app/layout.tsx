import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Subsitua 'mapbox-gl/dist/mapbox-gl.css' por:
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoPortal do Litoral - Paranaguá & Pontal do Sul",
  description:
    "Explore pontos turísticos e a história do litoral paranaense em 3D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
