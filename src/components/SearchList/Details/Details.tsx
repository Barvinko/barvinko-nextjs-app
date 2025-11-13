'use client';

import { memo, useContext, useCallback, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Modal from 'react-modal';
import { Spinner } from '@components/UI/Spinner/Spinner';
import { CircularRating } from '@components/UI/CircularRating/CircularRating';
import { CiImageOff } from 'react-icons/ci';
import { FaPlay } from 'react-icons/fa';
import { ThemeContext } from '@store/ThemeContext';
import { useGetDetailsQuery, useGetVideosQuery } from '@store/query/api';
import { formatRuntime } from '@utilities/formatRuntime';
import styles from './Details.module.scss';

export const Details = memo(() => {
  const router = useRouter();
  const params = useParams<{ page: string; id: string }>();
  const id = Number(params?.id) || 1;

  const { theme } = useContext(ThemeContext);

  const { data, error, isFetching } = useGetDetailsQuery({ id });
  const [shouldFetchVideo, setShouldFetchVideo] = useState(false);

  const { data: videosData } = useGetVideosQuery(
    { id },
    { skip: !shouldFetchVideo }
  );

  const handlePlayTrailer = useCallback(() => {
    setShouldFetchVideo(true);
  }, []);

  useEffect(() => {
    if (videosData && shouldFetchVideo) {
      const trailer = videosData.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
      );

      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
        setShouldFetchVideo(false);
      }
    }
  }, [videosData, shouldFetchVideo]);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const releaseYear = data?.release_date.split('-')[0];
  const genres = data?.genres.map((genre) => genre.name).join(', ');

  return (
    <Modal
      overlayClassName={`${styles.details__overlay} ${theme}`}
      className={styles.details__modal}
      isOpen={true}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      <button
        className={styles.details__close}
        onClick={handleClose}
        aria-label="Close modal"
      >
        ✕
      </button>
      {isFetching ? (
        <Spinner />
      ) : error || !data ? (
        <p className={styles.details__error}>No details available.</p>
      ) : (
        <>
          <div
            className={styles.details__backdrop}
            style={{
              backgroundImage: data.backdrop_path
                ? `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
                : 'none',
            }}
          >
            <div className={styles['details__backdrop-overlay']} />
          </div>

          <div className={styles.details__content}>
            <div className={styles.details__poster}>
              {data.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.title}
                  loading="lazy"
                />
              ) : (
                <div className={styles['details__poster-placeholder']}>
                  <CiImageOff size={64} />
                </div>
              )}
            </div>

            <div className={styles.details__info}>
              <div className={styles.details__header}>
                <h1 className={styles.details__title}>
                  {data.title}
                  <span className={styles.details__year}>({releaseYear})</span>
                </h1>

                <div className={styles.details__meta}>
                  <span className={styles.details__certification}>
                    {data.adult ? '18+' : data.origin_country?.[0] || 'PG'}
                  </span>
                  <span>{data.release_date}</span>
                  <span>•</span>
                  <span>{genres}</span>
                  <span>•</span>
                  <span>{formatRuntime(data.runtime)}</span>
                </div>
              </div>

              <div className={styles.details__actions}>
                <div className={styles.details__rating}>
                  <CircularRating
                    className={styles['details__rating-circle']}
                    percent={data.vote_average}
                    size={55}
                    strokeWidth={3}
                  />
                  <div className={styles['details__rating-text']}>
                    <span className={styles['details__rating-label']}>
                      User
                    </span>
                    <span className={styles['details__rating-label']}>
                      Score
                    </span>
                  </div>
                </div>

                <button
                  className={styles['details__play-btn']}
                  onClick={handlePlayTrailer}
                >
                  <FaPlay />
                  <span>Play Trailer</span>
                </button>
              </div>

              {data.tagline && (
                <p className={styles.details__tagline}>{data.tagline}</p>
              )}

              <div className={styles.details__overview}>
                <h3>Overview</h3>
                <p>{data.overview}</p>
              </div>

              {data.production_companies?.length > 0 && (
                <div className={styles.details__crew}>
                  <h3>Production Companies</h3>
                  <div className={styles['details__crew-list']}>
                    {data.production_companies.map((company) => (
                      <div
                        key={company.id}
                        className={styles['details__crew-item']}
                      >
                        {company.logo_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            className={styles['details__company-logo']}
                          />
                        ) : (
                          <div
                            className={styles['details__company-placeholder']}
                          >
                            <CiImageOff size={24} />
                          </div>
                        )}
                        <span className={styles['details__crew-name']}>
                          {company.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </Modal>
  );
});

Details.displayName = 'Details';
