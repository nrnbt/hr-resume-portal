'use client'

import AppBar from '@/components/User/AppBar';
import { FunctionComponent, PropsWithChildren } from 'react';

import { usePathname } from 'next/navigation';

const UserLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname()
  
  return (
    <>
      <AppBar />
      <div className='h-full'>
        {pathname !== '/login' && (
          <div
            style={{
              backgroundImage:'linear-gradient(rgb(206, 229, 253), rgb(255, 255, 255))',
              height: '100px'
            }}
          ></div>
        )}
        {children}
      </div>
    </>
  );
};

export default UserLayout;
