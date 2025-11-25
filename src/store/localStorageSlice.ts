import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocalStorageState {
  searchName: string;
}

const keyName = 'searchName';
const initialState: LocalStorageState = {
  searchName:
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(keyName) || ''
      : '',
};

const localStorageSlice = createSlice({
  name: 'localStorage',
  initialState,
  reducers: {
    setSearchName(state, action: PayloadAction<string>) {
      state.searchName = action.payload;
      localStorage.setItem(keyName, action.payload);
    },
  },
});

export const { setSearchName } = localStorageSlice.actions;
export default localStorageSlice.reducer;
