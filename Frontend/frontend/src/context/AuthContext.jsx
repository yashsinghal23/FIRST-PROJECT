import { createContext, useEffect, useState } from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
} from "../api/authApi.js";

import { getCurrentUser } from "../api/userApi.js";

 const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Derived State
  const isAuthenticated = !!user;

  const register = async (formData) => {
    try {
      setLoading(true);

      const response = await registerUser(formData);

      return response;
    } finally {
      setLoading(false);
    }
  };



  const login = async (formData) => {
    try {
      setLoading(true);

      await loginUser(formData);

      await getMe();
    } finally {
      setLoading(false);
    }
  };

  

  const logout = async () => {
    try {
      setLoading(true);

      await logoutUser();

      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  const getMe = async () => {
    try {
      const response = await getCurrentUser();

      setUser(response.data);
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  };


  useEffect(() => {
    const initializeUser = async () => {
      await getMe();
      setLoading(false);
    };

    initializeUser();
  }, []);


  const value = {
    user,
    loading,
    isAuthenticated,

    login,
    register,
    logout,
    getMe,

    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export {AuthContext}