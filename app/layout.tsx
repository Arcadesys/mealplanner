import React from 'react';
import { DarkModeProvider } from './components/DarkModeProvider';
import { Navigation } from './components/Navigation';
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <DarkModeProvider>
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
            <main>{children}</main>
          </div>
        </DarkModeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
