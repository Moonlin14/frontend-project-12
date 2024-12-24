import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import getRoutes from './routes.js';

export default createAsyncThunk(
  'channelsInfo/setInitialState',
  async (authHeader, { rejectWithValue }) => {
    try {
      const res = await axios.get(getRoutes.dataPath(), { headers: authHeader });
      return res.data;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: err.status });
    }
  },
);