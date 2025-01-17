import { createSlice } from '@reduxjs/toolkit';
import defaultChannel from '../../utils/defaultChannel';
/* eslint-disable */
const initialState = {
  activeChannel: defaultChannel,
};
const activeChannelsSlice = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
  },
});
/* eslint-enable */
export const { setActiveChannel } = activeChannelsSlice.actions;
export const activeChannelSelector = (state) => state.activeChannel.activeChannel;
export default activeChannelsSlice.reducer;
