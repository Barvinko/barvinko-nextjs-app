import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.spinnerContainer} data-testid="spinner-container">
      <div className={styles.spinner} data-testid="spinner" />
      <div className={styles.spinnerContainer__text}>
        <span>Loading</span>
        <span className={styles.spinnerContainer__dots}>
          <span />
          <span />
          <span />
        </span>
      </div>
    </div>
  );
};
