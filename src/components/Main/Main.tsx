'use client';
import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import { Search } from './Search/Search';
import { CardList } from './CardList/CardList';
import { Spinner } from '@components/UI/Spinner/Spinner';
import { useEffect } from 'react';
import { Store } from './Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetMoviesQuery } from '@store/query/api';
import { setSearchName } from '@store/localStorageSlice';
import styles from './Main.module.scss';

export const Main = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';

  const [currentPage, setCurrentPage] = useState<number>(parseInt(page, 10));
  const dispatch = useDispatch();
  const searchName = useSelector(
    (state: RootState) => state.localStorage.searchName
  );
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const { data, error, isFetching } = useGetMoviesQuery({
    query: searchName || undefined,
    page: currentPage,
  });

  useEffect(() => {
    console.log('Data fetched:', data, currentPage, searchName);
  }, [data, currentPage, searchName]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
    router.push(`/page/${newPage}`);
  };

  const handleSearch = useCallback(
    (name: string, page: number) => {
      dispatch(setSearchName(name));
      setCurrentPage(page);
      router.push(`/page/${page}`);
    },
    [router, dispatch]
  );

  return (
    <main className={styles.main}>
      <article
        className={`${styles.searchList} ${selectedCards.length > 0 ? styles.searchList_selected : ''}`}
      >
        <Search nameRequest={handleSearch} />
        {isFetching ? (
          <Spinner />
        ) : error || !data?.results.length ? (
          <h2 className={styles.searchList__errorMessage}>Nothing Found</h2>
        ) : (
          <div className={styles.content}>
            <div className={styles.content__left}>
              <CardList dataCharacters={data?.results || []} />
              <ReactPaginate
                previousClassName={`${styles.pagination__item} ${styles.pagination__previous}`}
                nextClassName={`${styles.pagination__item} ${styles.pagination__next}`}
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={`${styles.pagination__item} pagination__break-me`}
                pageCount={
                  (currentPage < 8
                    ? data.total_pages < 8
                      ? data.total_pages
                      : 8
                    : currentPage + 1) || 0
                }
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={styles.pagination}
                pageClassName={`${styles.pagination__item} ${styles.pagination__page}`}
                activeClassName={`${styles.pagination__item} ${styles.pagination__page_active}`}
                forcePage={currentPage - 1}
              />
            </div>
          </div>
        )}
        <Store />
      </article>
    </main>
  );
};
