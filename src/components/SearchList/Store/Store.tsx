import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { unselectCard } from '@store/selectedCardsSlice';
import { IoMdDownload, IoMdClose } from 'react-icons/io';
import styles from './Store.module.scss';

export const Store = () => {
  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const handleUnselectAll = () => {
    selectedCards.forEach((card) => dispatch(unselectCard(card.id)));
  };

  const handleDownload = (): string => {
    const indent = '  ';

    const csvContent = [
      'My Movie List',
      ...selectedCards.map((movie, index) =>
        [
          `${index + 1}.${movie.title}`,
          `${indent}Vote Average: ${movie.vote_average}`,
          `${indent}Release Date: ${movie.release_date}`,
          `${indent}"${movie.overview}"`,
          `${indent}Poster: https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`,
        ].join('\n')
      ),
    ].join('\n\n');

    const blow = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blow);
  };

  if (selectedCards.length === 0) return <></>;

  return (
    <div className={`section-fluid ${styles.store}`}>
      <div className={`section-fluid__content ${styles.store__container}`}>
        <p className={styles.store__count}>Selected: {selectedCards.length}</p>
        <div className={styles.store__actions}>
          <button
            className={`button ${styles.store__button} ${styles['store__button-unselect']}`}
            onClick={handleUnselectAll}
            aria-label="Unselect all movies"
          >
            <IoMdClose className={styles.store__icon} />
            Unselect all
          </button>
          <a
            href={handleDownload()}
            download={`${selectedCards.length}_My_Movies.csv`}
            className={`button ${styles.store__button} ${styles['store__button-download']}`}
            aria-label="Download selected movies"
          >
            <IoMdDownload className={styles.store__icon} />
            Download
          </a>
        </div>
      </div>
    </div>
  );
};
