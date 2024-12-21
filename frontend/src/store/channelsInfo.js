import { createSlice, current } from '@reduxjs/toolkit';
import fetchData from '../fetchData.js';

const defaultChannelId = 1;

const slice = createSlice({
  name: 'channelsInfo',
  initialState: { loading: false, channels: [], currentChannelId: defaultChannelId },
  reducers: {
    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
      state.newChannelId = payload.id;
    },
    deleteChannel(state, { payload }) {
      state.channels = state.channels.filter((channel) => channel.id !== payload.id);
      if (currentChannelId === payload.id) {
        currentChannelId = defaultChannelId;
      };
    },
    renameChannel(state, { payload: { id, name } }) {
      const channel = state.channels.find((channel) => channel.id === id);
      channel.name = name;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchData.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    })
    .addCase(fetchData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { actions } = slice;
export default slice.reducer;