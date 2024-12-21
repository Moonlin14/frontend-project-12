import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modalInfo',
  initialState: { isOpened: false, type: null, changed: null },
  reducers: {
    openModal(state, { payload }) {
      const { type, id } = payload;
      state.isOpened = true;
      state.type = type;
      state.changed = id ?? null;
    },
    closeModal(state) {
      state.isOpened = false;
      state.type = null;
      state.changed = null;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;