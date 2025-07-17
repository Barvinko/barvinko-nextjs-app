'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { selectCard, unselectCard } from '@store/selectedCardsSlice';
import styles from './Card.module.scss';

interface CardProps {
  name: string;
  url: string;
}

export const Card = ({ name, url }: CardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const parts = url.split('/');
  const id = parts[parts.length - 2];
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
      dispatch(selectCard({ id, name, url }));
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
        {name}
      </h3>
    </div>
  );
};
