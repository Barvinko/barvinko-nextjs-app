'use client';
import { memo, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { selectCard, unselectCard } from '@store/selectedCardsSlice';
import { Movie } from 'tmdb-ts';
import Form from 'react-bootstrap/Form';
import { CiImageOff } from 'react-icons/ci';
import { CircularRating } from '@components/UI/CircularRating/CircularRating';
import CardBT from 'react-bootstrap/Card';
import { IMAGE_URLS } from '@/constants/URLs';
import styles from './Card.module.scss';

export const Card = memo((movie: Movie) => {
  const router = useRouter();
  const params = useParams<{ page: string }>();

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const { id, title, poster_path, overview, vote_average } = movie;

  const isSelected = selectedItems.some((card) => card.id === id);

  const handleClick = useCallback(() => {
    router.push(`/page/${params?.page}/details/${id}`, { scroll: false });
  }, [router, params, id]);

  const handleCheckboxChange = useCallback(() => {
    if (isSelected) {
      dispatch(unselectCard(id));
    } else {
      dispatch(selectCard(movie));
    }
  }, [isSelected, dispatch, id, movie]);

  return (
    <CardBT className={styles.card} onClick={handleClick}>
      {poster_path ? (
        <CardBT.Img
          variant="top"
          className={styles.card__img}
          src={`${IMAGE_URLS.W500}${poster_path}`}
          alt={title || 'Movie poster'}
          loading="lazy"
        />
      ) : (
        <CiImageOff className={styles.card__img} />
      )}
      <CardBT.Body className={styles.card__body}>
        <CircularRating percent={vote_average} />
        <CardBT.Title>{title}</CardBT.Title>
        <CardBT.Text>
          {overview
            ? overview.length > 120
              ? overview.slice(0, 120) + '...'
              : overview
            : 'No description available.'}
        </CardBT.Text>
      </CardBT.Body>
      <Form.Check.Input
        checked={isSelected}
        onClick={(e) => e.stopPropagation()}
        onChange={handleCheckboxChange}
        className={styles.card__checkbox}
        aria-label={`Select ${title}`}
      />
    </CardBT>
  );
});

Card.displayName = 'Card';
