import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ValidStepNumber = 1 | 2 | 3 | 4;
export type CourseType = 'course' | 'practice-test';

export enum KnownCourseCategory {
  Design = 'Design',
  Development = 'Development',
  Marketing = 'Marketing',
  ITAndSoftware = 'IT and Software',
  PersonalDevelopment = 'Personal Development',
  Business = 'Business',
  Photography = 'Photography',
  Music = 'Music',
}

export enum TimeAvailablePerWeek {
  ImVeryBusy = '0-2 hours',
  IWorkOnThisOnTheSide = '2-4 hours',
  IHaveLotsOfFlexibility = '5+ hours',
  IHaventDecidedIfIHaveTime = 'indecisive',
}

export interface CourseCreationSteps {
  step1: {
    courseType: CourseType | null;
  };
  step2: {
    title: string;
  };
  step3: {
    category: KnownCourseCategory | null;
  };
  step4: {
    timeAvailablePerWeek: TimeAvailablePerWeek | null;
  };
}

export const isValidStepNumber = (num: number): num is ValidStepNumber => {
  return num === 1 || num === 2 || num === 3 || num === 4;
};

export const isValidCategory = (
  category: string
): category is KnownCourseCategory => {
  const categoryValues = Object.values(KnownCourseCategory);
  console.log(categoryValues);

  for (const categoryValue of categoryValues) {
    if (category === categoryValue) {
      return true;
    }
  }
  return false;
};

export const isAbleToContinue = (
  currentStep: number,
  steps: CourseCreationSteps
) => {
  switch (currentStep) {
    case 1:
      return steps.step1.courseType !== null;
    case 2:
      return steps.step2.title.length > 0;
    case 3:
      return steps.step3.category !== null;
    case 4:
      return (
        steps.step1.courseType !== null &&
        steps.step2.title.length > 0 &&
        steps.step3.category !== null &&
        steps.step4.timeAvailablePerWeek !== null
      );
    default:
      return false;
  }
};

interface CourseCreationState {
  currentStep: ValidStepNumber;
  totalSteps: number;
  steps: CourseCreationSteps;
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
    step3: {
      category: null,
    },
    step4: {
      timeAvailablePerWeek: null,
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
    step3Updated: (state, action: PayloadAction<KnownCourseCategory>) => {
      state.steps.step3.category = action.payload;
    },
    step4Updated: (state, action: PayloadAction<TimeAvailablePerWeek>) => {
      state.steps.step4.timeAvailablePerWeek = action.payload;
    },
    resetCourseCreation: () => {
      return initialState;
    },
  },
});

export const {
  changedStep,
  resetCourseCreation,
  step1Updated,
  step2Updated,
  step3Updated,
  step4Updated,
} = slice.actions;
export default slice.reducer;
