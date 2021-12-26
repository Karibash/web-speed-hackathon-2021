import React from 'react';
import useSWRInfinite from 'swr/infinite'

const LIMIT = 5;

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {Array<T>} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 * @property {() => Promise<void>} fetchMore
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T[]>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useInfiniteFetch(apiPath, fetcher) {
  const [result, setResult] = React.useState({ data: [], isLoading: false });
  const internalRef = React.useRef({ isLoading: false, isReachingEnd: false });

  const { data = [], error, size, setSize } = useSWRInfinite((index, previous) => {
    if (previous && !previous.length) return null;
    return `${apiPath}?offset=${index * LIMIT}&limit=${LIMIT}`;
  }, fetcher, { revalidateFirstPage: false });

  React.useEffect(() => {
    const isLoading = (!data && !error) || (0 < size && data && typeof data[size - 1] === 'undefined');
    const isReachingEnd = (data?.[0]?.length === 0) || (data && data[data.length - 1]?.length < LIMIT);

    setResult({ data: [].concat(...data), isLoading });
    internalRef.current = { isLoading, isReachingEnd };
  }, [data, error, size]);

  const fetchMore = React.useCallback(() => {
    if (internalRef.current.isLoading || internalRef.current.isReachingEnd) return;
    setSize(size => size + 1).finally(() => {});
  }, [setSize]);

  return {
    ...result,
    error: error,
    fetchMore: fetchMore,
  };
}
