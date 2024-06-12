'use client'

import { AuthProvider } from '@/providers/auth';
import { FunctionComponent, PropsWithChildren } from 'react';

import { SnackbarProvider } from '@/providers/toaster';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './globals.css';

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HR Resume Portal</title>
      </head>
      <body>
        <AuthProvider>
          <SnackbarProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <main className='flex flex-col h-screen'>
                {children}
              </main>
            </LocalizationProvider>
          </SnackbarProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
