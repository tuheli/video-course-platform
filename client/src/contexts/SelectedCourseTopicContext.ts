import { createContext } from 'react';

interface SelectedCourseTopicContextType {
  topic: string;
  changeTopic: (topic: string) => void;
}

const defaultValue = {
  topic: 'Adobe Illustrator',
  changeTopic: () => {},
};

export const SelectedCourseTopicContext =
  createContext<SelectedCourseTopicContextType>(defaultValue);
