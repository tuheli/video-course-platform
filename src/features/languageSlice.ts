import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Language } from '../../data/languageData';

interface LanguageState {
  language: Language;
}

const initialState: LanguageState = {
  language: {
    text: 'English',
    code: 'en',
  },
};

// TODO: Language state should be stored in local storage

const slice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changedLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { changedLanguage } = slice.actions;
export default slice.reducer;
