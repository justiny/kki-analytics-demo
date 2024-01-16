import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='h-full w-full items-center justify-center'>
      <div>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href='/'>Return Home</Link>
      </div>
    </div>
  );
}
