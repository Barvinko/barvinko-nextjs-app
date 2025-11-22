'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { ErrorBoundary } from '@components/providers/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '@components/providers/ThemeProvider/ThemeProvider';
import { Header } from '@components/layout/Header/Header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider>
          <div className="container">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
};
