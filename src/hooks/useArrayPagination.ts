import { clamp } from "@/utils/generic/clamp";
import { useCallback, useMemo, useState } from "react";

/**
 * Array paginagtion utility. Handles paginating an array with a given pagesize
 * and returns all required properties and functions for working with simple
 * pagination.
 */
export function useArrayPagination<T>(arr: T[], pagesize: number) {
  const [index, _setIndex] = useState(0);

  const maxIndex = useMemo(
    () => Math.floor(arr.length / pagesize),
    [arr, pagesize]
  );

  const setIndex = useCallback(
    (nextPage: number | ((n: number) => number)) => {
      _setIndex((current) => {
        const _n = typeof nextPage === "number" ? nextPage : nextPage(current);
        return clamp(Math.floor(_n), 0, maxIndex);
      });
    },
    [_setIndex, maxIndex]
  );

  const maxPage = useMemo(() => maxIndex + 1, [maxIndex]);

  const currentPage = useMemo(() => index + 1, [index]);

  const setPage = useCallback(
    (nextPage: number | ((n: number) => number)) => {
      setIndex(
        typeof nextPage === "number" ? nextPage - 1 : (n) => nextPage(n) - 1
      );
    },
    [setIndex]
  );

  const goToNextPage = useCallback(() => {
    setIndex((_) => _ + 1);
  }, [setIndex]);

  const goToPrevPage = useCallback(() => {
    setIndex((_) => _ - 1);
  }, [setIndex]);

  const goToFirstPage = useCallback(() => {
    setIndex(0);
  }, [setIndex]);

  const goToLastPage = useCallback(() => {
    setIndex(maxIndex);
  }, [maxIndex, setIndex]);

  const isFirstPage = useMemo(() => index === 0, [index]);

  const isLastPage = useMemo(() => index === maxIndex, [index, maxIndex]);

  const page = useMemo(() => {
    return arr.slice(index * pagesize, (index + 1) * pagesize);
  }, [index, pagesize, arr]);

  return {
    index,
    maxIndex,
    setIndex,
    page,
    currentPage,
    maxPage,
    setPage,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
    isFirstPage,
    isLastPage,
  };
}
