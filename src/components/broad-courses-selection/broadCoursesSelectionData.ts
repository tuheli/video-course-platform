export interface CourseItem {
  title: string;
  thumbnailUrl: string;
  creatorNames: string[];
  rating: number;
  ratingCount: number;
  listPrice: number;
  priceEur: number;
  isBestseller: boolean;
}

interface CourseCategory {
  title: string;
  items: CourseItem[];
}

export const broadCoursesSelectionData: CourseCategory[] = [
  {
    title: 'Python',
    items: [
      {
        title: 'Python Programming Bootcamp',
        thumbnailUrl: '/course-images/course-image-1.jpg',
        creatorNames: ['Jose Portilla'],
        rating: 4.7,
        ratingCount: 1234,
        listPrice: 89.99,
        priceEur: 9.99,
        isBestseller: false,
      },
      {
        title:
          'Python for Data Science and Machine Learning Bootcamp Long Text to Test Overflowing Title',
        thumbnailUrl: '/course-images/course-image-1.jpg',
        creatorNames: [
          'Jose Portilla',
          'John Doe',
          'Jane Doe',
          'Foo Bar',
          'Baz Qux',
        ],
        rating: 4.7,
        ratingCount: 12345,
        listPrice: 199.99,
        priceEur: 9.99,
        isBestseller: true,
      },
      {
        title: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
        thumbnailUrl: '/course-images/course-image-1.jpg',
        creatorNames: ['Jose Portilla'],
        rating: 4.7,
        ratingCount: 123456,
        listPrice: 199.99,
        priceEur: 199.99,
        isBestseller: true,
      },
    ],
  },
  {
    title: 'Excel',
    items: [
      {
        title: 'Microsoft Excel - Excel from Beginner to Advanced',
        thumbnailUrl: '/course-images/course-image-1.jpg',
        creatorNames: ['Kyle Pew'],
        rating: 4.7,
        ratingCount: 12345,
        listPrice: 199.99,
        priceEur: 9.99,
        isBestseller: true,
      },
      {
        title: 'Microsoft Excel - Advanced Excel Formulas & Functions',
        thumbnailUrl: '/course-images/course-image-1.jpg',
        creatorNames: ['Kyle Pew'],
        rating: 4.7,
        ratingCount: 12345,
        listPrice: 199.99,
        priceEur: 9.99,
        isBestseller: true,
      },
    ],
  },
];
