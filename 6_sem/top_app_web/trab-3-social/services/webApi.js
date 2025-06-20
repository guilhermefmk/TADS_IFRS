// CAMADA 3 - WEBAPI - API ESPECIFICA DO PROJETO
import { urls, GetFetch, PostFetch } from './apiBase';

const createUser = (user) => {
  return PostFetch(`${urls.USER_CREATE}`, user);
}

export const apiDefault = {
  createUser,
};
