import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anthony | Software Engineer",
  description:
    "Portfolio and profile of Anthony, Software Engineer specializing in scalable backend systems and modern web interfaces.",
  openGraph: {
    title: "Anthony | Software Engineer",
    description:
      "Software Engineer specializing in Go, Node.js, Next.js, and scalable cloud architectures.",
    url: "https://github.com/anthonyyjoee",
    siteName: "Anthony - Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
