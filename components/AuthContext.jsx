'use client'
import { useState,useEffect , createContext } from "react";
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  // Check if user data exists in local storage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedToken && storedUserInfo) {
      setToken(storedToken);
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUserInfo(newUser);
    // Store user data in local storage
    localStorage.setItem("token", newToken);
    localStorage.setItem("userInfo", JSON.stringify(newUser));

  };

  const logout = () => {
    setToken(null);
    setUserInfo(null);
    // Clear user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    router.push('/');
  };

  const authContextValue = {
    token,
    userInfo,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
