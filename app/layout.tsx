'use client';

import { Provider } from 'react-redux';
import { store } from '@store/store';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '@components/ThemeProvider/ThemeProvider';
import { Layout } from '@components/Layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@style/index.scss';
import '@style/class.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
