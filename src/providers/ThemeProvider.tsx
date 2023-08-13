/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ThemeProvider } from 'next-themes';

interface SystemThemeProviderProps {
  children: React.ReactNode;
}

const SystemThemeProvider = ({
  children,
}: SystemThemeProviderProps) => (

  <ThemeProvider enableSystem attribute='class'>
    {children}
  </ThemeProvider>
);

export default SystemThemeProvider;
