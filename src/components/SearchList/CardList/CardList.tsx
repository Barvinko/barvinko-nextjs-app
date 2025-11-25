import { memo } from 'react';
import { Card } from './Card/Card';
import { Movie } from 'tmdb-ts';
import styles from './CardList.module.scss';

interface CardListProps {
  dataCharacters: Movie[];
}

export const CardList = memo(({ dataCharacters }: CardListProps) => {
  return (
    <section className={styles.cardList}>
      <div className={styles.cardList__cards}>
        {dataCharacters.map((character) => (
          <Card key={character.id} {...character} />
        ))}
      </div>
    </section>
  );
});

CardList.displayName = 'CardList';
