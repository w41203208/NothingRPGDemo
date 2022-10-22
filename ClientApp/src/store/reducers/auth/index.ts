import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { userRegisterAPI, userLoginAPI } from '../../../api/api';

interface LoginParams {
  num: string;
  pwd: string;
}
interface ReigsterParams {
  num: string;
  pwd: string;
}
interface User {
  email: string;
  id: number;
}

export const userRegister = createAsyncThunk<any, ReigsterParams>(
  'auth/userRegister',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const { num, pwd } = _;
    try {
      const res = await userRegisterAPI(num, pwd);
      return fulfillWithValue(res.data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const userLogin = createAsyncThunk<any, LoginParams>(
  'auth/userLogin',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const { num, pwd } = _;
    try {
      const res = await userLoginAPI(num, pwd);
      return fulfillWithValue(res.data);
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    user: {} as User,
    isLoading: false,
    errorMsg: '',
    isLogin: false,
  },
  reducers: {
    setLogin(state) {
      state.isLogin = false;
    },
  },
  extraReducers(builder) {
    // Register
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMsg = '';
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoading = false;
      const { text } = action.payload as any;
      state.errorMsg = text;
    });
    builder.addCase(userRegister.pending, (state, action) => {
      state.isLoading = true;
    });

    // Login
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
      state.isLoading = false;
      state.errorMsg = '';
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      const { text } = action.payload as any;
      state.errorMsg = text;
    });
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const { setLogin } = authReducer.actions;
export default authReducer.reducer;
