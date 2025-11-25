import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setSearchName } from '@store/localStorageSlice';

interface FormValues {
  query: string;
}

interface SearchProps {
  nameRequest: (name: string) => void;
}

export const Search = ({ nameRequest }: SearchProps) => {
  const dispatch = useDispatch();
  const localName = useSelector(
    (state: RootState) => state.localStorage.searchName
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { query: localName ?? '' },
  });

  const onSubmit: SubmitHandler<FormValues> = ({ query }) => {
    const trimmed = query.trim();
    nameRequest(trimmed);
    dispatch(setSearchName(trimmed));
  };

  return (
    <section className={`section-fluid ${styles.searchSection}`}>
      <div
        className={`section-fluid__content ${styles.searchSection__container}`}
      >
        <h2 className={styles.searchSection__title}>
          We&apos;ll find your film!
        </h2>
        <div className={styles.searchSection__content}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.searchSection__form}
          >
            <input
              className={styles.searchSection__input}
              type="search"
              placeholder="Search movie..."
              {...register('query')}
            />
            <button
              type="submit"
              className={`button ${styles.searchSection__button}`}
            >
              Search
            </button>
          </form>
          {errors.query && (
            <p className={styles.searchSection__errorMessage}>
              {errors.query.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
