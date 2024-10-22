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
      <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <DarkModeProvider>
          <main>{children}</main>
        </DarkModeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
