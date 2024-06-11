import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const languageCodes = {
  english: 'en',
  spanish: 'es',
  french: 'fr',
  german: 'de',
  italian: 'it',
  portuguese: 'pt',
  finnish: 'fi',
  dutch: 'nl',
  chinese: 'zh',
  japanese: 'ja',
  korean: 'ko',
  arabic: 'ar',
} as const;

export const languages = {
  english: {
    name: 'English',
    code: languageCodes.english,
  },
  spanish: {
    name: 'Spanish',
    code: languageCodes.spanish,
  },
  french: {
    name: 'French',
    code: languageCodes.french,
  },
  german: {
    name: 'German',
    code: languageCodes.german,
  },
  italian: {
    name: 'Italian',
    code: languageCodes.italian,
  },
  portuguese: {
    name: 'Portuguese',
    code: languageCodes.portuguese,
  },
  finnish: {
    name: 'Finnish',
    code: languageCodes.finnish,
  },
  dutch: {
    name: 'Dutch',
    code: languageCodes.dutch,
  },
  chinese: {
    name: 'Chinese',
    code: languageCodes.chinese,
  },
  japanese: {
    name: 'Japanese',
    code: languageCodes.japanese,
  },
  korean: {
    name: 'Korean',
    code: languageCodes.korean,
  },
  arabic: {
    name: 'Arabic',
    code: languageCodes.arabic,
  },
} as const;

export type Language = (typeof languages)[keyof typeof languages];

type LanguageProperty = keyof typeof languages;

export const getLanguage = (name: LanguageProperty) => {
  return languages[name];
};

interface LanguageState {
  currentLanguage: Language;
}

const initialState: LanguageState = {
  currentLanguage: languages.english,
};

// TODO: Language state should be stored in local storage

const slice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changedLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { changedLanguage } = slice.actions;
export default slice.reducer;
