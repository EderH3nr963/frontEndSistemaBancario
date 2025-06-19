import axios from "axios";

/**
 * Axios instance configured for the application
 * Features:
 * - Base URL configuration
 * - Credentials included in requests
 * - Default headers
 */
const api = axios.create({
  baseURL: "http://localhost:3000", // API base URL
  withCredentials: true, // Include credentials in requests
});

export default api;
