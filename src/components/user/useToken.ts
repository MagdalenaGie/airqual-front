import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const token = localStorage.getItem('token');
    var tokenString = token == null ? "" : token;
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken("");
    console.log("unset", token);
  }

  return {
    setToken: saveToken,
    unsetToken: removeToken,
    token
  }
}