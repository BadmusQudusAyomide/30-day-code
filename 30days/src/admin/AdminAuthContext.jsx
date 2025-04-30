import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem("adminToken");
      const storedUser = localStorage.getItem("adminUser");

      if (storedToken && storedUser) {
        const user = JSON.parse(storedUser);

        try {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;

          await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`);

          setAdminUser(user);
        } catch (err) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          delete axios.defaults.headers.common["Authorization"];
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (userData) => {
    setAdminUser(userData);
    localStorage.setItem("adminToken", userData.token);
    localStorage.setItem("adminUser", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    adminUser,
    loading,
    login,
    logout,
    isAuthenticated: !!adminUser,
    isAdmin: adminUser?.isAdmin,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;
