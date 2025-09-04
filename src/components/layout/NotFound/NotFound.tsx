import Link from 'next/link';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound__title}>404</h1>
      <p className={styles.notFound__text}>Page Not Found</p>
      <Link className={styles.notFound__link} href="/">
        Go to Home
      </Link>
    </div>
  );
};
