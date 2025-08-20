import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
  id: number;
}

interface SelectedCardsState {
  selectedCards: Card[];
}

const initialState: SelectedCardsState = {
  selectedCards: [],
};

const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    selectCard: (state, action: PayloadAction<Card>) => {
      state.selectedCards.push(action.payload);
    },
    unselectCard: (state, action: PayloadAction<number>) => {
      state.selectedCards = state.selectedCards.filter(
        (card) => card.id !== action.payload
      );
    },
  },
});

export const { selectCard, unselectCard } = selectedCardsSlice.actions;
export default selectedCardsSlice.reducer;
