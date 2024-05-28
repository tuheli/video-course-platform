export interface CreateAnEngagingCourseSection {
  imageUrl: string;
  title: string;
  description: string;
}

const createAnEngagingCourseData: CreateAnEngagingCourseSection[] = [
  {
    imageUrl: '/how-to-begin-images/plan-your-curriculum.jpg',
    title: 'Create an Engaging Course',
    description: `Whether you've been teaching for years or are teaching for the first
    time, you can make an engaging course. We've compiled resources and
    best practices to help you get to the next level, no matter where
    you're starting.`,
  },
  {
    imageUrl: '/how-to-begin-images/record-your-video.jpg',
    title: 'Get Started with Video',
    description: `Quality video lectures can set your course apart. Use our resources to learn the basics`,
  },
  {
    imageUrl: '/how-to-begin-images/record-your-video.jpg',
    title: 'Build your audience',
    description: `Set your course up for success by building your audience.`,
  },
  {
    imageUrl: '/how-to-begin-images/launch-your-course.jpg',
    title: 'Join the New Instructor Challenge!',
    description: `Get exlusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!`,
  },
];

export const getEngagingCourseData = () => createAnEngagingCourseData;
