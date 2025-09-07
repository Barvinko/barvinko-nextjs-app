import { ReactNode } from 'react';
import { Header } from '@components/layout/Header/Header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="container">
        <Header />
        {children}
      </div>
    </>
  );
};
