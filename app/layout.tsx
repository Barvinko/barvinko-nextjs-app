import type { Metadata } from 'next';
import { Layout } from '@components/layout/Layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@style/index.scss';

export const metadata: Metadata = {
  title: 'TMDB',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body id="root">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
