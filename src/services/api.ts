import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    "x-api-key": "reqres_0345c6e9b3a840508ac536736407c6b0",

  },
});

export default api;
