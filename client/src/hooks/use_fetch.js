import React from 'react';
import useSWR from 'swr';

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {T | null} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useFetch(apiPath, fetcher) {
  const { data, error } = useSWR(apiPath, fetcher);
  const isLoading = React.useMemo(() => !data && !error, [data, error]);

  return {
    data: data,
    error: error,
    isLoading: isLoading,
  };
}
