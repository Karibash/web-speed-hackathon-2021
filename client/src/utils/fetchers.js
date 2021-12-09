/**
 * @param {RequestInfo} input
 * @param {RequestInit} init
 * @returns {Promise<Response>}
 */
async function fetchApi(input, init) {
  const result = await fetch(input, init);
  if (!result.ok) throw Error(await result.json());
  return result;
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  const result = await fetchApi(url, {
    method: 'GET',
  });
  return result.json();
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const result = await fetchApi(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: file,
  });
  return await result.json();
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const result = await fetchApi(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  return await result.json();
}

export { fetchApi, fetchJSON, sendFile, sendJSON };
