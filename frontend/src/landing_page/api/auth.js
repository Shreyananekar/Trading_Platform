// src/api/auth.js
import axios from "axios";

const API_URL = "https://zerodha-clone-agsc.onrender.com/api/auth";

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};
