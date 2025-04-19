"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navigation } from "@/components/navigation/navigation";
import { Header } from "@/components/header";
import "@/styles/globals.css";

function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldHideNavigation = pathname?.startsWith("/auth") || pathname?.startsWith("/terms");

  if (shouldHideNavigation) {
    return children;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Navigation />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <MainLayout>{children}</MainLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
