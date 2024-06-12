import { useContext } from 'react';
import { SelectedCourseTopicContext } from '../contexts/SelectedCourseTopicContext';

export const useSelectedCourseTopicContext = () => {
  const context = useContext(SelectedCourseTopicContext);
  return context;
};
