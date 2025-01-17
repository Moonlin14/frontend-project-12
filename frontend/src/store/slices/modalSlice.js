import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  channel: null,
};
/* eslint-disable */
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalType = action.payload.type;
      state.channel = action.payload.channel;
    },
    closeModal: (state) => {
      state.modalType = null;
      state.channel = null;
    },
  },
});
/* eslint-enable */
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
