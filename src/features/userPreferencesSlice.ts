import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type OrderingOptionType =
  (typeof OrderingOption)[keyof typeof OrderingOption];

export const OrderingOption = {
  Newest: 'Newest',
  Oldest: 'Oldest',
  AZ: 'A-Z',
  ZA: 'Z-A',
  PublishedFirst: 'Published first',
  UnpublishedFirst: 'Unpublished first',
} as const;

enum Locale {
  en_US = 'en-US',
  es_MX = 'es-MX',
  fr_FR = 'fr-FR',
  zh_CN = 'zh-CN',
  ar_SA = 'ar-SA',
}

enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  CNY = 'CNY',
  SAR = 'SAR',
  MXN = 'MXN',
  AED = 'AED',
  JPY = 'JPY',
  GBP = 'GBP',
  AUD = 'AUD',
  CAD = 'CAD',
  SEK = 'SEK',
}

interface UserPreferences {
  locale: Locale;
  currency: Currency;
  myCoursesOrdering: OrderingOptionType;
}

const initialState: UserPreferences = {
  locale: Locale.en_US,
  currency: Currency.USD,
  myCoursesOrdering: OrderingOption.Newest,
};

const slice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    changedMyCoursesOrdering: (
      state,
      action: PayloadAction<OrderingOptionType>
    ) => {
      state.myCoursesOrdering = action.payload;
    },
  },
});

export const { changedMyCoursesOrdering } = slice.actions;
export default slice.reducer;
