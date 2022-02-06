import axios from 'axios';

const fetcher = <Data>(url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((response) => response.data);

export default fetcher;