export interface LearnerPositiveReview {
  reviewedCourseId: string;
  firstName: string;
  lastNameLetter: string;
  reviewText: string;
}

export const learnerPositiveReviews: LearnerPositiveReview[] = [
  {
    reviewedCourseId: 'python-course-1',
    firstName: 'John',
    lastNameLetter: 'D',
    reviewText:
      'I am proud to say that after a few months of taking this course...I passed my exam and am now an expert in python! This content was exactly what I needed.',
  },
  {
    reviewedCourseId: 'python-course-2',
    firstName: 'Bob',
    lastNameLetter: 'L',
    reviewText:
      'I highly recommend this course for all budding data scientists. Even people with no prior knowledge of any visualization tools can become a master after completing this course.',
  },
  {
    reviewedCourseId: 'python-course-3',
    firstName: 'Alice',
    lastNameLetter: 'M',
    reviewText:
      'I have taken many online courses and this is by far the best one I have ever taken. The instructor is a great teacher and the course is very well organized.',
  },
  {
    reviewedCourseId: 'excel-course-1',
    firstName: 'Katie',
    lastNameLetter: 'S',
    reviewText:
      'I am so happy I took this course. I have learned so much and I am now able to do things I never thought I could do. I highly recommend this course to anyone who wants to learn Excel.',
  },
  {
    reviewedCourseId: 'excel-course-2',
    firstName: 'Philip',
    lastNameLetter: 'W',
    reviewText:
      'I have taken many Excel courses and this is by far the best one I have ever taken. The instructor is a great teacher and the course is very well organized.',
  },
];
