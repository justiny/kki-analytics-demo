'use client';
import React, { ReactNode, useEffect, useState } from 'react';

export default function Hydrate({
  children,
  font,
}: {
  children: ReactNode;
  font: any;
}) {
  const [isHydrated, setIsHydrated] = useState(false);

  //Wait till Nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <>
      {isHydrated ? (
        <html lang='en' className='h-full'>
          <body className={`${font} h-full`}>{children}</body>
        </html>
      ) : (
        <html lang='en' className='h-full'>
          <body className={`${font} h-full`}></body>
        </html>
      )}
    </>
  );
}
