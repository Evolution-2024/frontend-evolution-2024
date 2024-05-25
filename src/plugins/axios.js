import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api', // Reemplaza esta URL con la base de tu API
  timeout: 10000, // Ajusta el tiempo de espera según tus necesidades
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default {
  install(app) {
    app.config.globalProperties.$axios = axiosInstance;
  }
};
