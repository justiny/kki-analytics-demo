'use client';
import { Fragment, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
interface INavigationMobile {
  setSidebarOpen: (open: boolean) => void;
}

export default function NavigationMobile({
  setSidebarOpen,
}: INavigationMobile) {
  const { user, error, isLoading } = useUser();
  return (
    <div className='sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
      <button
        type='button'
        className='-m-2.5 p-2.5 text-gray-400 lg:hidden'
        onClick={() => setSidebarOpen(true)}
      >
        <span className='sr-only'>Open sidebar</span>
        <Bars3Icon className='h-6 w-6' aria-hidden='true' />
      </button>
      <div className='flex-1 text-sm font-semibold leading-6 text-white'>
        <Link href='/dashboard'>Dashboard</Link>
      </div>
      {user && (
        <Link href='/dashboard'>
          <span className='sr-only'>Your profile</span>
          <img
            className='h-8 w-8 rounded-full bg-gray-800'
            src={(user && user.picture) || 'https://via.placeholder.com/150'}
            alt=''
          />
        </Link>
      )}
    </div>
  );
}
