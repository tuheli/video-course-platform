type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface CourseItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  creatorNames: string[];
  rating: number;
  ratingCount: number;
  listPrice: number;
  priceEur: number;
  isBestseller: boolean;
  lastUpdated: string;
  lengthHours: number;
  difficultyLevel: DifficultyLevel;
  hasSubtitles: boolean;
  description: string;
  bulletPoints: [string, string, string];
}

interface CourseTopic {
  name: string;
  heading: string;
  description: string;
  items: CourseItem[];
}

export interface CourseCategory {
  name: string;
  topicNames: string[];
  imageUrl: string;
}

export const broadCoursesSelectionData: CourseTopic[] = [
  {
    name: 'Python',
    heading: 'Expand your career opportunities with Python',
    description:
      'Take one of Lorem’s range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to beginners and experts alike.',
    items: [
      {
        id: 'python-course-1',
        title: 'The Complete Python Bootcamp From Zero to Hero in Python',
        thumbnailUrl: '/course-images/python-course-image-1.jpg',
        creatorNames: ['Jose Portilla'],
        rating: 3.2,
        ratingCount: 1234,
        listPrice: 89.99,
        priceEur: 9.99,
        isBestseller: false,
        lastUpdated: new Date().toDateString(),
        lengthHours: 10,
        difficultyLevel: 'Beginner',
        hasSubtitles: true,
        description:
          'Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games',
        bulletPoints: [
          'A practical programming course for office workers, academics, and administrators who want to improve their productivity.',
          'A practical programming course for office workers, academics, and administrators who want to improve their productivity.',
          'You will be able to use Python for your own work problems or personal projects.',
        ],
      },
      {
        id: 'python-course-2',
        title:
          'Python for Data Science and Machine Learning Bootcamp Long Text to Test Overflowing Title',
        thumbnailUrl: '/course-images/python-course-image-2.jpg',
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
        lastUpdated: new Date('2023-11-01').toDateString(),
        lengthHours: 20,
        difficultyLevel: 'Intermediate',
        hasSubtitles: false,
        description:
          'Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more!',
        bulletPoints: [
          'Use Python for Data Science and Machine Learning',
          'Use Spark for Big Data Analysis',
          'Implement Machine Learning Algorithms',
        ],
      },
      {
        id: 'python-course-3',
        title: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
        thumbnailUrl: '/course-images/python-course-image-3.jpg',
        creatorNames: ['Jose Portilla'],
        rating: 5,
        ratingCount: 123456,
        listPrice: 199.99,
        priceEur: 199.99,
        isBestseller: false,
        lastUpdated: new Date('2023-11-05').toDateString(),
        lengthHours: 30.5,
        difficultyLevel: 'All Levels',
        hasSubtitles: true,
        description:
          'Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!',
        bulletPoints: [
          'You will master the Python programming language by building 100 unique projects over 100 days.',
          'You will learn automation, game, app and web development, data science and machine learning all using Python.',
          'You will be able to program in Python professionally',
        ],
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
        id: 'excel-course-1',
        title: 'Microsoft Excel - Excel from Beginner to Advanced',
        thumbnailUrl: '/course-images/excel-course-image-1.jpg',
        creatorNames: ['Kyle Pew'],
        rating: 4.7,
        ratingCount: 1234567,
        listPrice: 199.99,
        priceEur: 9.99,
        isBestseller: true,
        lastUpdated: new Date('2022-05-01').toDateString(),
        lengthHours: 10,
        difficultyLevel: 'Intermediate',
        hasSubtitles: true,
        description:
          'Excel with this A-Z Microsoft Excel Course. Microsoft Excel 2010, 2013, 2016, Excel 2019 and Microsoft/Office 365/2024',
        bulletPoints: [
          'Master Microsoft Excel from Beginner to Advanced',
          'Build a solid understanding on the Basics of Microsoft Excel',
          'Learn the most common Excel functions used in the Office',
        ],
      },
      {
        id: 'excel-course-2',
        title: 'Microsoft Excel - Advanced Excel Formulas & Functions',
        thumbnailUrl: '/course-images/excel-course-image-2.jpg',
        creatorNames: ['Kyle Pew'],
        rating: 4.2,
        ratingCount: 12345,
        listPrice: 149.99,
        priceEur: 149.99,
        isBestseller: false,
        lastUpdated: new Date('2024-12-30').toDateString(),
        lengthHours: 20,
        difficultyLevel: 'Advanced',
        hasSubtitles: false,
        description:
          'Master 75+ Excel formulas with hands-on demos from a best-selling Microsoft Excel instructor (Excel 2010, 2013, 2016, 2019 and Office 365)',
        bulletPoints: [
          'Master Microsoft Excel formulas and functions',
          "Learn to use Excel's powerful data analysis tools",
          'Learn to use Excel for data analysis and visualization',
        ],
      },
    ],
  },
];

export const courseCategories: CourseCategory[] = [
  {
    name: 'Development',
    topicNames: ['Python', 'Excel'],
    imageUrl: '/course-category-images/category-development.jpg',
  },
  {
    name: 'Business',
    topicNames: [],
    imageUrl: '/course-category-images/category-business.jpg',
  },
];
