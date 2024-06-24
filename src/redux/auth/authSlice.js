import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser, editUser } from './authOperations';

const { VITE_API_BASE_URL } = import.meta.env;

const USER_INITIAL_STATE = {
  firstName: null,
  lastName: null,
  email: null,
  subscription: null,
  avatarURL: null,
};

// Helper function to handle avatar URL based on whether it's a Gravatar link
const getAvatarURL = (baseURL, avatarURL) => {
  return avatarURL.startsWith('https://s.gravatar.com') ? avatarURL : `${baseURL}${avatarURL}`;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: USER_INITIAL_STATE,
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = {
          ...action.payload.user,
          avatarURL: getAvatarURL(VITE_API_BASE_URL, action.payload.user.avatarURL),
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = USER_INITIAL_STATE;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, state => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = {
          ...action.payload.user,
          avatarURL: getAvatarURL(VITE_API_BASE_URL, action.payload.user.avatarURL),
        };
      });
  },
});

export const authReducer = authSlice.reducer;
