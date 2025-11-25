'use client';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '@store/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { setSearchName } from '@store/localStorageSlice';
import styles from './Header.module.scss';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    dispatch(setSearchName(''));
    router.push('/page/1');
  };

  return (
    <header className={`section-fluid ${styles.header}`}>
      <div className={`section-fluid__content ${styles.header__container}`}>
        <div className={styles['header__container-links']}>
          <h1 onClick={handleLogoClick} className={styles.header__title}>
            TMDB
          </h1>
          <h2 onClick={handleLogoClick} className={styles.header__link}>
            TOP Movie
          </h2>
        </div>
        <button className={styles.header__button} onClick={toggleTheme}>
          {theme === 'light' ? (
            <FaSun data-testid="sun-icon" />
          ) : (
            <FaMoon data-testid="moon-icon" />
          )}
        </button>
      </div>
    </header>
  );
};
