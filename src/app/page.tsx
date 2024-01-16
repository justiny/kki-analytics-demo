'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  <title>Page title</title>;
  const { user, error, isLoading } = useUser();

  const renderContent = () => {
    if (isLoading) {
      return <ArrowPathIcon className='animate-spin h-5 w-5' />;
    }

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

    return `Hello, ${user.name}!`;
  };

  return (
    <div>
      <p className='text-lg'>{renderContent()}</p>
    </div>
  );
}
