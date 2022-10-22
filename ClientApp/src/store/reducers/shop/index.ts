import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { EquipmentItem } from 'src/Services/Item';

const ShopReducer = createSlice({
  name: 'shop',
  initialState: {
    items: [] as EquipmentItem[],
  },
  reducers: {
    actionSetShopItems(state, action: PayloadAction<EquipmentItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { actionSetShopItems } = ShopReducer.actions;
export default ShopReducer.reducer;
