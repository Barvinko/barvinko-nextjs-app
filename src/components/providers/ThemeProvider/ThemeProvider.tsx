import { useState, useEffect, ReactNode } from 'react';
import { ThemeContext } from '@store/ThemeContext';

interface ThemeProvider {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProvider) => {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
