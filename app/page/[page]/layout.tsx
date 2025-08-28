interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function PageLayout({ children, modal }: LayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
