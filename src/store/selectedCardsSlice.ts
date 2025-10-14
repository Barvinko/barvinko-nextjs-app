import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from 'tmdb-ts';

interface SelectedCardsState {
  selectedCards: Movie[];
}

const initialState: SelectedCardsState = {
  selectedCards: [],
};

const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    selectCard: (state, action: PayloadAction<Movie>) => {
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
