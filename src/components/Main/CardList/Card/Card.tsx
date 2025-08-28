'use client';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { selectCard, unselectCard } from '@store/selectedCardsSlice';
import { Movie } from 'tmdb-ts';
import CardBT from 'react-bootstrap/Card';
import styles from './Card.module.scss';

export const Card = ({ id, title, poster_path, overview }: Movie) => {
  const router = useRouter();
  const params = useParams<{ page: string }>();

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const isSelected = selectedItems.some((card) => card.id === id);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLInputElement).type === 'checkbox') {
      return;
    }

    if (id && !isNaN(Number(id))) {
      router.push(`/page/${params?.page}/details/${id}`, { scroll: false });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (isSelected) {
      dispatch(unselectCard(id));
    } else {
      dispatch(selectCard({ id }));
    }
  };

  return (
    <CardBT className="border-0" onClick={handleClick}>
      <CardBT.Img
        variant="top"
        className={styles.card__img}
        src={`https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`}
      />
      <CardBT.Body>
        <CardBT.Title>{title}</CardBT.Title>
        <CardBT.Text>
          {overview
            ? overview.slice(0, 100) + '...'
            : 'No description available.'}
        </CardBT.Text>
        <input
          className={styles.card__checkbox}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
      </CardBT.Body>
    </CardBT>
  );
};
