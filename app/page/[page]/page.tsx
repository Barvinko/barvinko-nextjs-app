'use client';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useState } from 'react';
import { Details } from '@components/Main/Details/Details';
import Modal from 'react-modal';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const page = searchParams?.get('page') || '1';
  const id = params.page || searchParams?.get('id') || '1';
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
          shouldFocusAfterRender={false}
          preventScroll={true}
        >
          <Details />
        </Modal>
      )}
    </>
  );
}

export default Page;
