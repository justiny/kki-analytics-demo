'use client';
import './globals.css';
import './styles.scss';
import { Inter } from 'next/font/google';
import React, { useState } from 'react';
import Sidebar from '@components/Sidebar';
import SidebarDesktop from '@components/SidebarDesktop';
import NavigationMobile from '@components/NavigationMobile';
import Hydrate from '@helpers/Hydrate';
import Provider from '@components/Provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Move this logic
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Hydrate font={inter}>
      <Provider>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <SidebarDesktop />
        <NavigationMobile setSidebarOpen={setSidebarOpen} />
        <main className='py-10 lg:pl-72'>
          <div className='px-4 sm:px-6 lg:px-8'>{children}</div>
        </main>
      </Provider>
    </Hydrate>
  );
}
