'use client';

import React, { memo, useContext, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Modal from 'react-modal';
import { Spinner } from '@components/UI/Spinner/Spinner';
import { CircularRating } from '@components/UI/CircularRating/CircularRating';
import { CiImageOff } from 'react-icons/ci';
import { FaPlay, FaPause } from 'react-icons/fa';
import { ThemeContext } from '@store/ThemeContext';
import { IMAGE_URLS } from '@/constants/URLs';
import { useGetDetailsQuery, useLazyGetVideosQuery } from '@store/query/api';
import { formatRuntime } from '@utilities/formatRuntime';
import { getPage } from '@utilities/getPage';
import styles from './Details.module.scss';

export const Details = memo(() => {
  const router = useRouter();
  const params = useParams<{ page: string; id: string }>();
  const id = Number(params?.id) || 1;

  const { theme } = useContext(ThemeContext);

  const { data, error, isFetching } = useGetDetailsQuery({ id });

  const [fetchVideos, { data: videosData, isFetching: isLoadingVideo }] =
    useLazyGetVideosQuery();

  const handlePlayTrailer = useCallback(async () => {
    try {
      const result = await fetchVideos({ id }).unwrap();

      const trailer = result.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
      );

      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
      }
    } catch (error) {
      console.error('Failed to fetch trailer:', error);
    }
  }, [id, fetchVideos]);

  const handleClose = useCallback(() => {
    document.body.classList.remove('modal-open');
    router.push(`/page/${getPage(params)}`);
  }, [router]);

  const releaseYear = data?.release_date.split('-')[0];
  const genres = data?.genres.map((genre) => genre.name).join(', ');
  const metaArr = [
    data?.release_date,
    genres,
    formatRuntime(data?.runtime),
  ].filter(Boolean);

  return (
    <Modal
      overlayClassName={`${styles.details__overlay} ${theme}`}
      className={styles.details__modal}
      isOpen={true}
      onRequestClose={handleClose}
      ariaHideApp={false}
      bodyOpenClassName="modal-open"
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
          {data.backdrop_path && (
            <div
              className={styles.details__backdrop}
              style={{
                backgroundImage: `url(${IMAGE_URLS.ORIGINAL}${data.backdrop_path})`,
              }}
            >
              <div className={styles['details__backdrop-overlay']} />
            </div>
          )}

          <div className={styles.details__content}>
            <div className={styles.details__poster}>
              {data.poster_path ? (
                <img
                  src={`${IMAGE_URLS.W500}${data.poster_path}`}
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
                  {releaseYear && (
                    <span className={styles.details__year}>
                      ({releaseYear})
                    </span>
                  )}
                </h1>

                <div className={styles.details__meta}>
                  <span className={styles.details__certification}>
                    {data.origin_country?.[0] || '-'}
                  </span>
                  {metaArr.map((item, index) => (
                    <React.Fragment key={index}>
                      <span>{item}</span>
                      {index < metaArr.length - 1 && <span>•</span>}
                    </React.Fragment>
                  ))}
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
                  disabled={
                    videosData !== undefined && videosData.results.length === 0
                  }
                >
                  {
                    <>
                      {isLoadingVideo ? (
                        <>
                          <FaPause />
                          <span>Loading...</span>
                        </>
                      ) : videosData?.results.length === 0 ? (
                        <>
                          <FaPause />
                          <span>No Trailer Available</span>
                        </>
                      ) : (
                        <>
                          <FaPlay />
                          <span>Play Trailer</span>
                        </>
                      )}
                    </>
                  }
                </button>
              </div>

              {data.tagline && (
                <p className={styles.details__tagline}>{data.tagline}</p>
              )}

              <div className={styles.details__overview}>
                <h3>Overview</h3>
                <p>{data.overview || 'Overview not found'}</p>
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
                            src={`${IMAGE_URLS.W200}${company.logo_path}`}
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
