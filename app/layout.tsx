'use client';

import { Provider } from 'react-redux';
import { store } from '@store/store';
import { ErrorBoundary } from '@components/providers/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '@components/providers/ThemeProvider/ThemeProvider';
import { Layout } from '@components/layout/Layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@style/index.scss';
import '@style/class.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="body">
        <Provider store={store}>
          <ErrorBoundary>
            <ThemeProvider>
              <Layout>{children}</Layout>
            </ThemeProvider>
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
}
