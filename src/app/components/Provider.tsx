'use client';
import ReactQueryWrapper from '../hooks/utils/ReactQueryWrapper';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function Providers({ children }: any) {
  return (
    <ReactQueryWrapper>
      <UserProvider>{children}</UserProvider>
    </ReactQueryWrapper>
  );
}
