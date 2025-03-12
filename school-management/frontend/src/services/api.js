import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
// export const registerUser = async (userData) => {
//   try {
//     const response = await api.post('/auth/register', userData);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : { message: 'Network error' };
//   }
// };
export const registerUser = async (userData) => {
    try {
      console.log('Sending registration data:', userData);
      const response = await api.post('/auth/register', userData);
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.error('Server error data:', error.response.data);
        console.error('Server error status:', error.response.status);
        throw error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received');
        throw { message: 'No response from server. Please check if the server is running.' };
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', error.message);
        throw { message: `Request failed: ${error.message}` };
      }
    }
  };

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network error' };
  }
};

export default api;

