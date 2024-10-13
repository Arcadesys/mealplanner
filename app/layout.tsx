import React from 'react';
import '@/styles/globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Your App Title</title>
    </head>
    <body>
      {children}
    </body>
  </html>
);

export default RootLayout;
