import { createSlice } from '@reduxjs/toolkit';

export const maxOfferDuration = 14_400; // 4h
const localStorageName = 'special-offer';

interface SpecialOffer {
  duration: number;
  isRedeemed: boolean;
  isRejected: boolean;
  isExpired: boolean;
}

const isSpecialOffer = (obj: unknown): obj is SpecialOffer => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (
    !(
      'duration' in obj &&
      'isRedeemed' in obj &&
      'isRejected' in obj &&
      'isExpired' in obj
    )
  ) {
    return false;
  }

  return (
    typeof obj.duration === 'number' &&
    typeof obj.isRedeemed === 'boolean' &&
    typeof obj.isRejected === 'boolean' &&
    typeof obj.isExpired === 'boolean'
  );
};

const getOfferFromLocalStorageOrDefault = (): SpecialOffer => {
  const localStorageState = window.localStorage.getItem(localStorageName);

  if (!localStorageState) {
    return {
      duration: maxOfferDuration,
      isRedeemed: false,
      isRejected: false,
      isExpired: false,
    };
  }

  const localStorageSpecialOffer: unknown = JSON.parse(localStorageState);

  if (!isSpecialOffer(localStorageSpecialOffer)) {
    return {
      duration: maxOfferDuration,
      isRedeemed: false,
      isRejected: false,
      isExpired: false,
    };
  }

  return localStorageSpecialOffer;
};

const saveOfferToLocalStorage = (state: SpecialOffer) => {
  const stringified = JSON.stringify(state);
  window.localStorage.setItem(localStorageName, stringified);
};

const initialState: SpecialOffer = getOfferFromLocalStorageOrDefault();

const slice = createSlice({
  name: 'specialOffer',
  initialState,
  reducers: {
    redeemed: (state) => {
      const newState = {
        ...state,
        duration: 0,
        isRedeemed: true,
      };
      saveOfferToLocalStorage(newState);
      return newState;
    },
    rejected: (state) => {
      const newState = {
        ...state,
        duration: 0,
        isRejected: true,
      };
      saveOfferToLocalStorage(newState);
      return newState;
    },
    offerExpired: (state) => {
      const newState = {
        ...state,
        duration: 0,
        isExpired: true,
      };
      saveOfferToLocalStorage(newState);
      return newState;
    },
    secondPassed: (state) => {
      const newState = {
        ...state,
        duration: state.duration - 1,
      };
      saveOfferToLocalStorage(newState);
      return newState;
    },
  },
});

export const { redeemed, rejected, offerExpired, secondPassed } = slice.actions;
export default slice.reducer;
