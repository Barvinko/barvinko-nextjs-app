'use client';

import { useState, useContext, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Modal from 'react-modal';
import { Spinner } from '@components/UI/Spinner/Spinner';
import { ThemeContext } from '@store/ThemeContext';
import { useGetDetailsQuery } from '@store/query/api';
import styles from './Details.module.scss';

export const Details = () => {
  const router = useRouter();
  const params = useParams<{ page: string; id: string }>();
  const page = params?.page || '1';
  const id = params?.id || '1';

  const [modalFlag, setModalFlag] = useState(false);
  const { theme } = useContext(ThemeContext);

  const { data, error, isFetching } = useGetDetailsQuery({
    id: Number(id),
  });

  useEffect(() => {
    if (id) {
      setModalFlag(true);
      console.log(page, id, data);
    }
  }, [id]);

  const handleClose = () => {
    router.push(`/page/${page}`);
    setModalFlag(false);
  };

  return (
    <div
      className={`${styles.content__right} ${modalFlag ? styles.content__right_active : ''}`}
    >
      <Modal
        overlayClassName={`${styles.details} ${theme}`}
        className={styles.details__content}
        isOpen={modalFlag}
        onRequestClose={handleClose}
        ariaHideApp={false}
      >
        <button className="button" onClick={handleClose}>
          Close
        </button>
        {isFetching ? (
          <Spinner />
        ) : error || !data ? (
          <p>No character details available.</p>
        ) : (
          <div>
            {/* <h2>{data.name}</h2>
            <p>Birth Year: {data.birth_year}</p>
            <p>Gender: {data.gender}</p>
            <p>Height: {data.height}</p>
            <p>Mass: {data.mass}</p> */}
          </div>
        )}
      </Modal>
    </div>
  );
};
