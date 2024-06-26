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
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, state => {
        state.isLoading = false;
      })
      .addCase(logIn.pending, state => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...action.payload.user,
          avatarURL: getAvatarURL(VITE_API_BASE_URL, action.payload.user.avatarURL),
        };
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, state => {
        state.isLoading = false;
      })
      .addCase(logOut.pending, state => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.isLoading = false;
        state.user = USER_INITIAL_STATE;
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, state => {
        state.isLoading = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.user = {
          ...action.payload.user,
          avatarURL: getAvatarURL(VITE_API_BASE_URL, action.payload.user.avatarURL),
        };
      })
      .addCase(refreshUser.rejected, state => {
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(editUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...action.payload.user,
          avatarURL: getAvatarURL(VITE_API_BASE_URL, action.payload.user.avatarURL),
        };
      })
      .addCase(editUser.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
