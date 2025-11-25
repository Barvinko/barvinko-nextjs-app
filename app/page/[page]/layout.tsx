import { Main } from '@components/layout/Main/Main';

interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function PageLayout({ children, modal }: LayoutProps) {
  return (
    <>
      <Main />
      {children}
      {modal}
    </>
  );
}
