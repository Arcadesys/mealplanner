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
      <DarkModeProvider>
        <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
          <main>{children}</main>
        </body>
      </DarkModeProvider>
    </html>
  );
};

export default RootLayout;
