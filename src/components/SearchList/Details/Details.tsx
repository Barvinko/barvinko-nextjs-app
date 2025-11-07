'use client';

import { memo, useContext, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Modal from 'react-modal';
import { Spinner } from '@components/UI/Spinner/Spinner';
import { CircularRating } from '@components/UI/CircularRating/CircularRating';
import { CiImageOff } from 'react-icons/ci';
import { ThemeContext } from '@store/ThemeContext';
import { useGetDetailsQuery } from '@store/query/api';
import { formatRuntime } from '@utilities/formatRuntime';
import styles from './Details.module.scss';

export const Details = memo(() => {
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

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
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
        <p>No details available.</p>
      ) : (
        <div className={styles.details__body}>
          <div className={styles.details__img}>
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`}
              loading="lazy"
              alt=""
            />
          </div>
          <div className={styles.details__info}>
            <div className={styles.details__header}>
              <div className={styles.details__title}>
                <h2>{data.title}</h2>
                <span className={styles.details__release}>
                  ({data.release_date.split('-')[0]})
                </span>
              </div>
              <div className={styles.details__facts}>
                <span>
                  {data.release_date} ({data.origin_country})
                </span>
                <span>
                  {data.genres
                    .map((genre) => {
                      return genre.name;
                    })
                    .join(', ')}
                </span>
                <span>{formatRuntime(data.runtime)}</span>
              </div>
            </div>
            <CircularRating
              className={styles.details__rating}
              percent={data.vote_average}
            />
            <div>
              <h3>{data.tagline}</h3>
              <h3>Overview</h3>
              <div>{data.overview}</div>
              <ol className={styles.details__companies}>
                {data.production_companies.map((company) => (
                  <li key={company.id} className={styles.details__company}>
                    {company.logo_path ? (
                      <img
                        className={styles['details__company-logo']}
                        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${company.logo_path}`}
                        alt=""
                      />
                    ) : (
                      <CiImageOff />
                    )}
                    {company.name}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
});

Details.displayName = 'Details';
