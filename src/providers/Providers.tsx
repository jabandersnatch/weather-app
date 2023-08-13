'use client';

import React from 'react';
import ReduxProvider from './ReduxProvider';
import SystemThemeProvider from './ThemeProvider';

const Providers = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <SystemThemeProvider>
    <ReduxProvider>
      {children}
    </ReduxProvider>
  </SystemThemeProvider>
);

export default Providers;
