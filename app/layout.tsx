// app/layout.tsx
import "./globals.css";
import HeaderWrapper from "@/components/Header/HeaderWrapper";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className="mdl-js">
      <body>
        <SessionProviderWrapper>
          <HeaderWrapper />
          <main>{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
