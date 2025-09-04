import { useContext } from 'react';
import { ThemeContext } from '@store/ThemeContext';

export const ErrorBoundaryComponent = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <article className={`body errorBoundary ${theme}`}>
      <h1>Oops!</h1>
      <h3>Something went wrong.</h3>
      <h3>Please try again.</h3>
      <button className="button" onClick={() => window.location.reload()}>
        Reload
      </button>
    </article>
  );
};
