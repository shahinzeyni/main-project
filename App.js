import React, { useCallback, useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'

import AuthContext from './Context/authContext'

import './App.css'

export default function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [token,setToken] = useState(null)
  const [userInfos,setUserInfos] = useState({})

  const login = useCallback((useInfos, tokenUser) => {
    setToken(tokenUser);
    setIsLoggedIn(true);
    setUserInfos(useInfos);
    localStorage.setItem("user", JSON.stringify({ tokenUser: tokenUser }));
  },[]);

  const logout = useCallback(() => {
    setToken(null);
    setUserInfos({});
    localStorage.removeItem("user");
  }, []);
  
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    if (localStorageData){
      fetch(`http://localhost:4000/v1/auth/me`,{
        headers:{
          Authorization:`Bearer ${localStorageData.tokenUser}`
        }
      }).then(res => res.json())
      .then(userData => {
        setIsLoggedIn(true)
        setUserInfos(userData)
  
      })
    }
  },[])



  const router = useRoutes(routes)

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}
