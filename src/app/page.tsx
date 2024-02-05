'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  <title>KKI Analytics</title>;
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <ArrowPathIcon className='animate-spin h-5 w-5' />;
  }

  console.log('user', user);
  console.log('error', error);
  console.log('isLoading', isLoading);

  if (!user) {
    return (
      <>
        Welcome to KKI Analytics. Please{' '}
        <Link href='/api/auth/login' className='underline hover:opacity-75'>
          login
        </Link>{' '}
        to access your data.
      </>
    );
  }

  if (user) {
    return (
      <div>
        <p className='text-lg'>Welcome {user?.email}</p>
      </div>
    );
  }
}
