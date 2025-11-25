'use client';
import { useState, useEffect, ReactNode, useMemo } from 'react';
import { ThemeContext } from '@store/ThemeContext';

interface ThemeProvider {
  children: ReactNode;
}

const THEME_KEY = 'theme';

export const ThemeProvider = ({ children }: ThemeProvider) => {
  const [theme, setTheme] = useState<string>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    if (savedTheme !== theme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.className = theme;
      localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
