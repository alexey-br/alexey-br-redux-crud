import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';

const initialState = { items: [], isLoading: false, error: null };

const handlePending = state => ({ ...state, isLoading: true });
const handleRejected = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: payload,
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [addContact.pending]: handlePending,
    [deleteContact.pending]: handlePending,

    [fetchContacts.rejected]: handleRejected,
    [addContact.rejected]: handleRejected,
    [deleteContact.rejected]: handleRejected,

    [fetchContacts.fulfilled](_, { payload }) {
      return { items: [...payload], isLoading: false, error: null };
    },
    [addContact.fulfilled]({ items }, { payload: { name, phone, id } }) {
      return {
        items: [...items, { id, name, phone }],
        isLoading: false,
        error: null,
      };
    },
    [deleteContact.fulfilled]({ items }, { payload: { id } }) {
      return {
        items: items.filter(contact => contact.id !== id),
        isLoading: false,
        error: null,
      };
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
