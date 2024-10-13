'use client';

import React, { useState, useEffect } from 'react';

const quotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "I have not failed. I've just found 10,000 ways that won't work. - Thomas A. Edison",
  "Failure is simply the opportunity to begin again, this time more intelligently. - Henry Ford",
  "The only real mistake is the one from which we learn nothing. - Henry Ford",
  "It's fine to celebrate success but it is more important to heed the lessons of failure. - Bill Gates",
  "Failure is so important. We speak about success all the time. It is the ability to resist failure or use failure that often leads to greater success. - J.K. Rowling"
];

const NotFoundPage = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      padding: '20px', 
      textAlign: 'center' 
    }}>
      <h1>404 - Page Not Found</h1>
      <p>But don't worry, failure is just another step towards success:</p>
      <blockquote style={{ 
        fontSize: '1.2em', 
        fontStyle: 'italic', 
        maxWidth: '600px', 
        margin: '20px 0' 
      }}>
        {quote}
      </blockquote>
    </div>
  );
};

export default NotFoundPage;
