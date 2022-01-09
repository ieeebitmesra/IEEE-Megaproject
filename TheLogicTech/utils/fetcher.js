export const getFetcher = (url) =>
fetch(url, { method: 'GET' }).then((res) => res.json());