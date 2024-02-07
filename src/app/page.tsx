'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    <>
      {/* Weird issue with loading state  */}
      {/* {isLoading && <ArrowPathIcon className='animate-spin h-5 w-5' />} */}
      {error && <div>Error: {error.message}</div>}

      {!user && (
        <div>
          Welcome to KKI Analytics. Please{' '}
          <Link href='/api/auth/login'>
            <span className='underline hover:opacity-75'>login</span>
          </Link>{' '}
          to access your data.
        </div>
      )}
      {user && (
        <div>
          <p className='text-lg'>Welcome {user.email}</p>
        </div>
      )}
    </>
  );
}
