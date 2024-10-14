import React from 'react';
import { DarkModeProvider } from './components/DarkModeProvider';
import { Navigation } from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ErrorBoundary>
          <DarkModeProvider>
            <Navigation />
            <main>{children}</main>
          </DarkModeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
