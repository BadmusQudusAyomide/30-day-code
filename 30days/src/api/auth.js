// src/api/auth.js
import axios from "axios";

<<<<<<< Updated upstream
const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";
=======
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
>>>>>>> Stashed changes

export const verifyToken = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/auth/verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.isValid;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};

// Add other auth-related API calls here if needed
