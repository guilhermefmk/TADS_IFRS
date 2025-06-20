import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';
const RUNNING_MODE = process.env.NODE_ENV || 'DEV';

// CAMADA 1 - API - INSTANCIA DA API
export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});


api.interceptors.response.use(
  function (response) {
    if (RUNNING_MODE == 'DEV') {
      console.log('======== API REQ/RES');
      console.log('REQUESTED URL: ', response.request.responseURL);
      console.log('RESPONSE DATA:');
      // console.log(response.data[0]);
      console.log('======================');
    }
    return response;
  },
  async function (error) {
    if (RUNNING_MODE === 'DEV') {
      console.log('======== ERROR API REQ/RES');
      console.log('ERROR: ', error);
      console.log(error.message);
      console.log('======================');
    }
    return Promise.reject(error);
  },
);

;
