import { PayloadAction, createSlice, isRejected } from '@reduxjs/toolkit';

export const maxOfferDuration = 14_400; // 4h
const localStorageName = 'special-offer';

interface SpecialOffer {
  duration: number;
  isRedeemed: boolean;
  isRejected: boolean;
}

const getLocalStorageStateOrDefault = (): SpecialOffer => {
  const localStorageState = window.localStorage.getItem(localStorageName);

  const defaultReturn = {
    duration: maxOfferDuration,
    isRedeemed: false,
    isRejected: false,
  };

  if (!localStorageState) {
    return defaultReturn;
  }

  const localStorageObject: unknown = JSON.parse(localStorageState);

  if (
    localStorageObject &&
    typeof localStorageObject === 'object' &&
    'duration' in localStorageObject &&
    'isRedeemed' in localStorageObject &&
    'isRejected' in localStorageObject
  ) {
    const duration = localStorageObject.duration;

    if (
      !(
        duration !== null &&
        duration !== undefined &&
        typeof duration === 'number' &&
        duration > 0 &&
        duration <= maxOfferDuration
      )
    ) {
      return defaultReturn;
    }

    const isRedeemed = localStorageObject.isRedeemed;

    if (
      !(
        isRedeemed !== null &&
        isRedeemed !== undefined &&
        typeof isRedeemed === 'boolean'
      )
    ) {
      return defaultReturn;
    }

    const isRejected = localStorageObject.isRejected;

    if (
      !(
        isRejected !== null &&
        isRejected !== undefined &&
        typeof isRejected === 'boolean'
      )
    ) {
      return defaultReturn;
    }

    return {
      duration,
      isRedeemed,
      isRejected,
    };
  }

  return defaultReturn;
};

const saveToLocalStorage = (state: SpecialOffer) => {
  const stringified = JSON.stringify(state);
  window.localStorage.setItem(localStorageName, stringified);
};

const initialState: SpecialOffer = getLocalStorageStateOrDefault();

const slice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    redeemed: (state, action: PayloadAction<void>) => {
      const newState = {
        ...state,
        isRedeemed: true,
      };
      saveToLocalStorage(newState);
      return newState;
    },
    rejected: (state, action: PayloadAction<void>) => {
      const newState = {
        ...state,
        isRejected: true,
      };
      saveToLocalStorage(newState);
      return newState;
    },
    secondPassed: (state, action: PayloadAction<void>) => {
      const newState = {
        ...state,
        duration: state.duration - 1,
      };
      saveToLocalStorage(newState);
      return newState;
    },
  },
});

export const { redeemed, rejected, secondPassed } = slice.actions;
export default slice.reducer;
