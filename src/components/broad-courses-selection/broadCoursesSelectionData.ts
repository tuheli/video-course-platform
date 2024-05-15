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

interface CourseTopic {
  name: string;
  heading: string;
  description: string;
  items: CourseItem[];
}

export const broadCoursesSelectionData: CourseTopic[] = [
  {
    name: 'Python',
    heading: 'Expand your career opportunities with Python',
    description:
      'Take one of Lorem’s range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to beginners and experts alike.',
    items: [
      {
        title: 'Python Programming Bootcamp',
        thumbnailUrl: '/course-images/course-image-1.jpg',
        creatorNames: ['Jose Portilla'],
        rating: 3.2,
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
        rating: 4.23,
        ratingCount: 12345,
        listPrice: 199.99,
        priceEur: 9.99,
        isBestseller: true,
      },
      {
        title: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
        thumbnailUrl: '/course-images/course-image-1.jpg',
        creatorNames: ['Jose Portilla'],
        rating: 5,
        ratingCount: 123456,
        listPrice: 199.99,
        priceEur: 199.99,
        isBestseller: false,
      },
    ],
  },
  {
    name: 'Excel',
    heading: 'Analyze and visualize data with Excel',
    description:
      'Take a Microsoft Excel course from Lorem, and learn how to use this industry-standard software. Real-world experts will show you the basics like how to organize data into sheets, rows and columns, and advanced techniques like creating complex dynamic formulas. Both small businesses and large companies use Excel to store, analyze, and visualize data.',
    items: [
      {
        title: 'Microsoft Excel - Excel from Beginner to Advanced',
        thumbnailUrl: '/course-images/course-image-1.jpg',
        creatorNames: ['Kyle Pew'],
        rating: 4.7,
        ratingCount: 1234567,
        listPrice: 199.99,
        priceEur: 9.99,
        isBestseller: true,
      },
      {
        title: 'Microsoft Excel - Advanced Excel Formulas & Functions',
        thumbnailUrl: '/course-images/course-image-1.jpg',
        creatorNames: ['Kyle Pew'],
        rating: 4.2,
        ratingCount: 12345,
        listPrice: 149.99,
        priceEur: 149.99,
        isBestseller: false,
      },
    ],
  },
];
