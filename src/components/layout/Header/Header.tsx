'use client';
import { useContext } from 'react';
import { ThemeContext } from '@store/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from './Header.module.scss';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className={`section-fluid ${styles.header}`}>
      <h1 className={styles.header__title}>TMDB</h1>
      <button className={styles.header__button} onClick={toggleTheme}>
        {theme === 'light' ? (
          <FaSun data-testid="sun-icon" />
        ) : (
          <FaMoon data-testid="moon-icon" />
        )}
      </button>
    </header>
  );
};
