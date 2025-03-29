import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import '@/styles/globals.css';

import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/providers/AppProvider';
import { fontSans } from 'lib/fonts';

import { siteConfig } from '@/config/site';
import { Header } from '@/components/header/header';
import { Sidebar } from '@/components/sidebar/sidebar';
import { ThemeProvider } from '@/providers/theme-provider';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: siteConfig.icons,
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {

  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();
  
  return (
    <html lang={locale} suppressHydrationWarning data-density="comfortable">
      <body className={`min-h-screen antialiased ${fontSans.variable}`}>
      <NextIntlClientProvider messages={messages}>

      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppProvider>
            <div className="flex h-screen bg-background text-foreground">
              <Sidebar />
              <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </div>
            <Toaster />
          </AppProvider>
          <Toaster />

        </ThemeProvider>
        </NextIntlClientProvider>

      </body>

    </html>
  );
}
