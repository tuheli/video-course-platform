import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ValidStepNumber = 1 | 2 | 3 | 4;
export type CourseType = 'course' | 'practice-test';

export interface Steps {
  step1: {
    courseType: CourseType | null;
  };
  step2: {
    title: string;
  };
}

export const isValidStepNumber = (num: number): num is ValidStepNumber => {
  return num === 1 || num === 2 || num === 3 || num === 4;
};

export const isAbleToContinue = (currentStep: number, steps: Steps) => {
  switch (currentStep) {
    case 1:
      return steps.step1.courseType !== null;
    case 2:
      return steps.step2.title.length > 0;
    default:
      return false;
  }
};

interface CourseCreationState {
  currentStep: ValidStepNumber;
  totalSteps: number;
  steps: Steps;
}

const initialState: CourseCreationState = {
  currentStep: 1,
  totalSteps: 4,
  steps: {
    step1: {
      courseType: null,
    },
    step2: {
      title: '',
    },
  },
};

const slice = createSlice({
  name: 'courseCreation',
  initialState,
  reducers: {
    changedStep: (state, action: PayloadAction<ValidStepNumber>) => {
      state.currentStep = action.payload;
    },
    step1Updated: (state, action: PayloadAction<CourseType>) => {
      state.steps.step1.courseType = action.payload;
    },
    step2Updated: (state, action: PayloadAction<string>) => {
      state.steps.step2.title = action.payload;
    },
    resetCourseCreation: () => {
      return initialState;
    },
  },
});

export const { changedStep, resetCourseCreation, step1Updated, step2Updated } =
  slice.actions;
export default slice.reducer;
