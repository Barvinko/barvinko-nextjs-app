'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Details } from '@components/Main/Details/Details';
import Modal from 'react-modal';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';
  const id = searchParams?.get('id') || '1';
  const [modalFlag, setModalFlag] = useState(false);

  const handleClose = () => {
    router.push(`/page/${page}`);
    setModalFlag(false);
  };

  return (
    <>
      {id && (
        <Modal
          isOpen={modalFlag}
          onRequestClose={handleClose}
          ariaHideApp={false}
        >
          <Details />
        </Modal>
      )}
    </>
  );
}

export default Page;
