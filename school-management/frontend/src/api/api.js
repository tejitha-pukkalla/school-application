// import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth"; // Backend URL

// export const register = (userData) => axios.post(`${API_URL}/register`, userData);
// export const login = (userData) => axios.post(`${API_URL}/login`, userData);


import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth"; // Use .env or default

// Register User
export const register = (userData) => axios.post(`${API_URL}/register`, userData);

// Login User
export const login = (userData) => axios.post(`${API_URL}/login`, userData);

// Logout User
export const logout = () => {
  localStorage.removeItem("access_token");
};

// Fetch Authenticated User
export const getProfile = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No token found");

  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
