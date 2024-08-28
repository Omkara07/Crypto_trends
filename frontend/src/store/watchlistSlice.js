import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk('fetchData', async () => {
  const token = localStorage.getItem("token")
  const res = await axios.get('https://crypto-trends-api.onrender.com/api/v1/watchlist/getall', {
    headers: {
      "authentication": token,
      "Content-Type": "application/json"
    }
  })
  return res.data
})
export const addData = createAsyncThunk('addData', async (initialData) => {
  const token = localStorage.getItem("token")
  const res = await axios.post('https://crypto-trends-api.onrender.com/api/v1/watchlist/add',
    initialData,
    {
      headers: {
        "authentication": token,
        "Content-Type": "application/json"
      }
    })
  return res.data
})
export const removeData = createAsyncThunk('removeData', async (initialData) => {
  const token = localStorage.getItem("token")
  const res = await axios.delete('https://crypto-trends-api.onrender.com/api/v1/watchlist/remove',
    {
      headers: {
        "authentication": token,
        "Content-Type": "application/json"
      },
      data: initialData
    },)
  return res.data
})

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    isLoading: false,
    data: [],
    error: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.items;
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.error = true;
      console.log("error", action.error.msg)
    })
    builder.addCase(addData.fulfilled, (state, action) => {
      return { ...state, data: [...state.data, action.payload.data] }
    })
    builder.addCase(removeData.fulfilled, (state, action) => {
      return { ...state, data: state.data.filter((t) => t.id !== action.payload.data.id) }
    })
  }
});

export const { handleAdd, handleRemove } = watchlistSlice.actions;
export default watchlistSlice.reducer;