import { Card } from './Card/Card';
import { Movie } from 'tmdb-ts';
import styles from './CardList.module.scss';

interface CardListProps {
  dataCharacters: Movie[];
}

export const CardList = ({ dataCharacters }: CardListProps) => {
  return (
    <section className={styles.cardList}>
      <div className={styles.cardList__cards}>
        {dataCharacters.map((character, index) => (
          <Card key={index} {...character} />
        ))}
      </div>
    </section>
  );
};
