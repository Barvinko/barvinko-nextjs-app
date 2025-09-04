'use client';

import { useContext, useEffect } from 'react';
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
  const id = Number(params?.id) || 1;

  const { theme } = useContext(ThemeContext);

  const { data, error, isFetching } = useGetDetailsQuery({
    id: id,
  });

  useEffect(() => {
    if (id) {
      console.log(page, id, data);
    }
  }, [id]);

  const handleClose = () => {
    router.back();
  };

  return (
    <div className={`${styles.content__right} ${styles.content__right_active}`}>
      <Modal
        overlayClassName={`${styles.details} ${theme}`}
        className={styles.details__content}
        isOpen={true}
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
            <h2>{data.title}</h2>
            <p>Birth Year:</p>
            <p>Gender:</p>
            <p>Height:</p>
            <p>Mass:</p>
          </div>
        )}
      </Modal>
    </div>
  );
};
