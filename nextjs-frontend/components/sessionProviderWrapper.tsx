'use client';

import React from 'react'

import { SessionProvider } from 'next-auth/react';

interface RootLayoutProps {
    children: React.ReactNode;
  }
  

const SessionProviderWrapper = ({children}: RootLayoutProps) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionProviderWrapper