import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './operations';

const initialState = { items: [], isLoading: false, error: null };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContacts.pending](state) {
      return { ...state, isLoading: true };
    },
    [fetchContacts.fulfilled](_, { payload }) {
      return { items: [...payload], isLoading: false, error: null };
    },
    [fetchContacts.rejected](_, { payload }) {
      return { isLoading: false, error: payload };
    },
  },
});

export const contactsReducer = contactsSlice.reducer;

export const getContacts = state => state.contacts.items;
