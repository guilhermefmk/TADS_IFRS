import { API_BASE_URL as API_BASE_URL_FROM_ENV } from '@env';

// Log para verificar se a variável de ambiente está sendo carregada
console.log('[constants.js] API_BASE_URL_FROM_ENV:', API_BASE_URL_FROM_ENV);

export const API_BASE_URL = API_BASE_URL_FROM_ENV || 'https://simple-api-ngvw.onrender.com'; // Fallback caso @env falhe

if (!API_BASE_URL_FROM_ENV) {
  console.warn('[constants.js] ATENÇÃO: API_BASE_URL não carregada de .env. Usando fallback.');
}
