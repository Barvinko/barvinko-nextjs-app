'use client';
import { useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

  const { data, error, isFetching } = useGetMoviesQuery({
    query: searchName || undefined,
    page: getPage(),
  });

  function getPage(): number | undefined {
    const page = parseInt(params?.page);
    return Number.isInteger(page) ? page : undefined;
  }

  useEffect(() => {
    console.log('Data fetched:', data, 'd', getPage(), 'd', searchName);
  }, [data, searchName]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    router.push(`/page/${newPage}`);
  };

  const handleSearch = useCallback(
    (name: string, page: number) => {
      dispatch(setSearchName(name));
      router.push(`/page/${page}`);
    },
    [router, dispatch]
  );

  return (
    <article
      className={`${styles.searchList} ${selectedCards.length > 0 ? styles.searchList_selected : ''}`}
    >
      <Search nameRequest={handleSearch} />
      {isFetching ? (
        <Spinner />
      ) : error || !data?.results.length ? (
        <h2 className={styles.searchList__errorMessage}>Nothing Found</h2>
      ) : (
        getPage() && (
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
                  ((getPage() as number) < 8
                    ? data.total_pages < 8
                      ? data.total_pages
                      : 8
                    : (getPage() as number) + 1) || 0
                }
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={styles.pagination}
                pageClassName={`${styles.pagination__item} ${styles.pagination__page}`}
                activeClassName={`${styles.pagination__item} ${styles.pagination__page_active}`}
                forcePage={(getPage() as number) - 1}
              />
            </div>
          </div>
        )
      )}
      <Store />
    </article>
  );
};
