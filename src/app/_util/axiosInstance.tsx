import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/1-3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInRlYW1JZCI6IjEtMyIsImlhdCI6MTcwMjk4MjAyMiwiaXNzIjoic3AtdGFza2lmeSJ9.CyJw1VGMNUVnP97QL8coPmhfCeaBZkMHZDU1KjOyAyo`,
  },
});
