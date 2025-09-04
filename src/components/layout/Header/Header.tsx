import { useContext } from 'react';
import { ThemeContext } from '@store/ThemeContext';
import styles from './Header.module.scss';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className={styles.header}>
      <button className="button" onClick={toggleTheme}>
        {theme === 'light' ? '☀️' : '🌙'}
      </button>
      <h1 className={styles.header__title}>The Characters of StarWars</h1>
    </header>
  );
};
