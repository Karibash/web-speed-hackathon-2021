import React from 'react';
import { useSWRConfig } from 'swr';
import useSWRInfinite, { unstable_serialize } from 'swr/infinite'

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
  const getKey = React.useCallback((index, previous) => {
    if (previous && !previous.length) return null;
    return `${apiPath}?offset=${index * LIMIT}&limit=${LIMIT}`;
  }, [apiPath]);

  const { fallback } = useSWRConfig();
  const { data = [], error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    fallback: {
      [unstable_serialize(getKey)]: fallback[apiPath],
    },
  });

  const [result, setResult] = React.useState({ data: [].concat(...data), isLoading: false });
  const internalRef = React.useRef({ isLoading: false, isReachingEnd: false });

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
