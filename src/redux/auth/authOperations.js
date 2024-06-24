import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const { VITE_API_BASE_URL } = import.meta.env;

axios.defaults.baseURL = VITE_API_BASE_URL;

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { firstName,lastName, email, password }
 */
export const register = createAsyncThunk(
  'auth/register',
  async ({ firstName, lastName, email, password }, thunkAPI) => {
    try {
      const res = await axios.post('api/users/signup', { firstName, lastName, email, password });
      toast.success('Account registration successful!');
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle 409 (Conflict) error - email already exists
        toast.error('Registration failed. Email already exists.');
      } else {
        // Handle other errors
        toast.error('Registration failed! Please try again.');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const res = await axios.post('api/users/login', { email, password });
    // After successful login, add the token to the HTTP header
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle 401 (Unauthorized) error - email/password doesn't match
      toast.error('Incorrect email address or password!');
    } else {
      // Handle other errors
      toast.error('Login failed! Please try again.');
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.get('api/users/logout');
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  // Reading the token from the state via getState()
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    // If there is no token, exit without performing any request
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }

  try {
    // If there is a token, add it to the HTTP header and perform the request
    setAuthHeader(persistedToken);
    const res = await axios.get('api/users/current');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * PUT @ /users/info
 * body: { avatar, firstName, lastName, email }
 * headers: Authorization: Bearer token
 */
export const editUser = createAsyncThunk(
  'auth/updateUserInfo',
  async ({ avatar, firstName, lastName, email }, thunkAPI) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);

    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;

      // Set the Authorization header using the token
      setAuthHeader(persistedToken);

      const res = await axios.put('api/users/info', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Account has been succesfully edited!');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
