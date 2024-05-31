import axios from 'axios';

// Instancia de Axios para la primera API
const axiosInstance1 = axios.create({
  baseURL: 'https://rickandmortyapi.com/api', // Reemplaza esta URL con la base de tu API
  timeout: 10000, // Ajusta el tiempo de espera según tus necesidades
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Instancia de Axios para la segunda API
const axiosInstance2 = axios.create({
  baseURL: 'https://security-production-d232.up.railway.app/api/v1', // Reemplaza esta URL con la base de tu otra API
  // baseURL: 'https://security-production-d232.up.railway.app/api/v1/users/auth/sign-up', // Reemplaza esta URL con la base de tu otra API
  timeout: 10000, // Ajusta el tiempo de espera según tus necesidades
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const axiosInstance3 = axios.create({
  // baseURL: 'https://gleaming-appreciation-production.up.railway.app/api/v1/courses', // Reemplaza esta URL con la base de tu otra API
  baseURL: 'https://gleaming-appreciation-production.up.railway.app/api/v1', // Reemplaza esta URL con la base de tu otra API
  timeout: 10000, // Ajusta el tiempo de espera según tus necesidades
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default {
  install(app) {
    app.config.globalProperties.$axios1 = axiosInstance1;
    app.config.globalProperties.$axios2 = axiosInstance2;
    app.config.globalProperties.$axios3 = axiosInstance3;
  }
};
