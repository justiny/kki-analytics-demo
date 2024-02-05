'use client';
import React, { ReactNode } from 'react';

export default function Hydrate({
  children,
  font,
}: {
  children: ReactNode;
  font: any;
}) {
  return (
    <html lang='en' className='h-full'>
      <body className={`${font} h-full`}>{children}</body>
    </html>
  );
}
