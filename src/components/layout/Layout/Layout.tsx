import { ReactNode } from 'react';
import { Header } from '@components/layout/Header/Header';
import { Main } from '@components/layout/Main/Main';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="container">
        <Header />
        <Main />
        {children}
      </div>
    </>
  );
};
