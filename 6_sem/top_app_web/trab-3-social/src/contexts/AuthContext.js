import React, { createContext, useState, useEffect } from 'react';
import { getToken, storeToken, removeToken } from '../services/authStorage';
import apiService from '../api/apiService'; // Usado para login/logout

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Para armazenar dados do usuário se necessário

  useEffect(() => {
    console.log('[AuthContext] useEffect bootstrapAsync: Iniciando');
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await getToken();
        console.log('[AuthContext] Token do AsyncStorage:', token);
      } catch (e) {
        console.error('[AuthContext] Erro ao restaurar token:', e);
      }
      setUserToken(token);
      setIsLoading(false);
      console.log('[AuthContext] bootstrapAsync: Finalizado, isLoading:', false);
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (email, password) => {
      console.log('[AuthContext] Tentando signIn com:', email);
      try {
        const response = await apiService.post('/users/login', { email, password });
        const { token, user } = response.data;
        await storeToken(token);
        setUserToken(token);
        setUserData(user);
        console.log('[AuthContext] signIn bem-sucedido, token:', token);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Erro desconhecido ao tentar fazer login.';
        console.error('[AuthContext] Erro no signIn:', errorMessage, error.response?.data);
        throw new Error(errorMessage); // Re-throw com mensagem mais clara
      }
    },
    signUp: async (name, email, password) => {
      console.log('[AuthContext] Tentando signUp com:', name, email);
      try {
        // Chamar a API de cadastro
        const response = await apiService.post('/users/register', { name, email, password });
        console.log('[AuthContext] signUp resposta da API:', response.data);
        // Opcional: fazer login automaticamente após o cadastro ou redirecionar para login
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Erro desconhecido ao tentar cadastrar.';
        console.error('[AuthContext] Erro no signUp:', errorMessage, error.response?.data);
        throw new Error(errorMessage); // Re-throw com mensagem mais clara
      }
    },
    signOut: async () => {
      console.log('[AuthContext] Tentando signOut');
      try {
        await removeToken();
        setUserToken(null);
        setUserData(null);
      } catch (e) {
        console.error('Sign out error', e);
      }
    },
    userToken,
    userData,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
