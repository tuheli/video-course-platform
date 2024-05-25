import { TimeAvailablePerWeek } from '../../../../features/courseCreationSlice';
import { Step4ItemProps } from './Step4Item';

export const step4Data: Step4ItemProps[] = [
  {
    value: TimeAvailablePerWeek.ImVeryBusy,
    text: "I'm very busy right now (0-2 hours)",
  },
  {
    value: TimeAvailablePerWeek.IWorkOnThisOnTheSide,
    text: "I'll work on this on the side (2-4 hours)",
  },
  {
    value: TimeAvailablePerWeek.IHaveLotsOfFlexibility,
    text: 'I have lots of flexibility (5+ hours)',
  },
  {
    value: TimeAvailablePerWeek.IHaventDecidedIfIHaveTime,
    text: "I haven't yet decided if I have time",
  },
];
