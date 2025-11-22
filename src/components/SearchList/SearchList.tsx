'use client';
import { useCallback, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import { Search } from './Search/Search';
import { CardList } from './CardList/CardList';
import { Spinner } from '@components/UI/Spinner/Spinner';
import { Store } from './Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useGetMoviesQuery } from '@store/query/api';
import { setSearchName } from '@store/localStorageSlice';
import { getPage } from '@utilities/getPage';
import styles from './SearchList.module.scss';

export const SearchList = () => {
  const router = useRouter();
  const params = useParams<{ page: string }>();

  const dispatch = useDispatch();
  const searchName = useSelector(
    (state: RootState) => state.localStorage.searchName
  );
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const currentPage = getPage(params);

  const queryParams = useMemo(
    () => ({
      query: searchName || undefined,
      page: currentPage,
    }),
    [searchName, currentPage]
  );

  const { data, error, isFetching } = useGetMoviesQuery(queryParams, {
    skip: !currentPage,
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const handlePageChange = useCallback(
    ({ selected }: { selected: number }) => {
      const newPage = selected + 1;
      router.push(`/page/${newPage}`);
    },
    [router]
  );

  const handleSearch = useCallback(
    (name: string) => {
      dispatch(setSearchName(name));
      router.push('/page/1');
    },
    [router, dispatch]
  );

  return (
    <article
      className={`${styles.searchList} ${selectedCards.length > 0 ? styles.searchList_selected : ''}`}
    >
      {!isFetching && <Search nameRequest={handleSearch} />}
      {isFetching ? (
        <Spinner />
      ) : error || !data?.results.length ? (
        <h2 className={styles.searchList__errorMessage}>Nothing Found</h2>
      ) : (
        currentPage && (
          <div className={styles.content}>
            <CardList dataCharacters={data?.results} />
            <ReactPaginate
              previousClassName={`${styles.pagination__item} ${styles.pagination__previous}`}
              nextClassName={`${styles.pagination__item} ${styles.pagination__next}`}
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={`${styles.pagination__item} pagination__break-me`}
              pageCount={
                currentPage < 8
                  ? data.total_pages < 8
                    ? data.total_pages
                    : 8
                  : currentPage + 1
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
        )
      )}
      <Store />
    </article>
  );
};
