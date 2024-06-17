import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

/*
 * GET @ /contacts
 */
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('api/contacts');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * POST @ /contacts
 * body: { name, phone, email }
 */
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phone, email }, thunkAPI) => {
    try {
      const response = await axios.post('api/contacts', { name, phone, email });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * DELETE @ /contacts/:id
 */
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`api/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * PUT @ /contacts/:id
  body: { name, phone, email }
 */
export const editContact = createAsyncThunk(
  'contacts/editContact',
  async ({ contactId, name, phone, email }, thunkAPI) => {
    try {
      const response = await axios.put(`api/contacts/${contactId}`, { name, phone, email });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
