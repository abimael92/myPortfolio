// src/styles/theme.tsx
import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from "../themes/default";
import GlobalStyles from './globals';

interface ThemeProps {
  children: ReactNode;
}

const Theme: React.FC<ThemeProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export default Theme;