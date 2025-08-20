'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { selectCard, unselectCard } from '@store/selectedCardsSlice';
import { Movie } from 'tmdb-ts';
import styles from './Card.module.scss';

export const Card = ({ id, title }: Movie) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const isSelected = selectedItems.some((card) => card.id === id);

  const handleClick = () => {
    if (id && !isNaN(Number(id))) {
      router.push(`/page/${page}/details/${id}`);
    }
  };

  const handleCheckboxChange = () => {
    if (isSelected) {
      dispatch(unselectCard(id));
    } else {
      dispatch(selectCard({ id }));
    }
  };

  return (
    <div className={styles.card}>
      <input
        className={styles.card__checkbox}
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      <h3 className={styles.card__name} onClick={handleClick}>
        {title}
      </h3>
    </div>
  );
};
