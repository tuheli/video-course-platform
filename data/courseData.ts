type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface Course {
  id: string;
  name: string;
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
  learerCount: number;
}

export interface CourseTopic {
  name: string;
  url: string;
  heading: string;
  description: string;
  courses: Course[];
}

export interface CourseCategory {
  name: string;
  url: string;
  imageUrl: string;
  subcategories: CourseSubcategory[];
}

interface CourseSubcategory {
  name: string;
  url: string;
  topics: CourseTopic[];
}

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomLearnerCount = () => {
  return getRandomInt(584, 213879);
};

export const getTopic = (topicName: string) => {
  for (const category of courseData) {
    for (const subcategory of category.subcategories) {
      const foundTopic = subcategory.topics.find((p) => p.name === topicName);
      if (foundTopic) {
        return foundTopic;
      }
    }
  }
};

export const getTopics = () => {
  const topics: CourseTopic[] = [];
  for (const category of courseData) {
    for (const subcategory of category.subcategories) {
      for (const topic of subcategory.topics) {
        topics.push(topic);
      }
    }
  }
  return topics;
};

export const getTopicsWithCourses = (maxCount: number) => {
  const topics = getTopics().filter((topic) => topic.courses.length > 0);

  if (topics.length <= maxCount) {
    return topics;
  }

  const sliceIndex = topics.length >= maxCount ? maxCount : topics.length;

  return topics.slice(0, sliceIndex);
};

const getCourses = () => {
  const topics = getTopics();
  return topics.flatMap((topic) => topic.courses);
};

export const getCourse = (courseId: string) => {
  const courses = getCourses();
  return courses.find((course) => course.id === courseId);
};

export const getCategories = () => {
  return courseData;
};

const getCategory = (categoryName: string) => {
  return courseData.find((category) => category.name === categoryName);
};

export const getFeaturedCategories = () => {
  const categories = getCategories();
  return categories.filter(
    ({ name }) =>
      name === 'Development' ||
      name === 'Business' ||
      name === 'IT and Software' ||
      name === 'Design'
  );
};

export const getFeaturedTopics = (categoryName: string) => {
  const category = getCategory(categoryName);

  if (!category) {
    return [];
  }

  const subcategories = category.subcategories;
  const topics: CourseTopic[] = [];

  const maxTopics = 3;
  let isTopicArrayFull = false;

  for (const subcategory of subcategories) {
    for (const topic of subcategory.topics) {
      if (topics.length < maxTopics) {
        topics.push(topic);
      } else {
        isTopicArrayFull = true;
        break;
      }
    }
    if (isTopicArrayFull) {
      break;
    }
  }

  return topics;
};

const courseData: CourseCategory[] = [
  {
    name: 'Design',
    url: '/',
    imageUrl: '/course-category-images/category-design.jpg',
    subcategories: [
      {
        name: 'Graphic Design',
        url: '/graphic-design',
        topics: [
          {
            name: 'Adobe Illustrator',
            url: '/adobe-illustrator',
            heading: 'Master Adobe Illustrator with these courses',
            description:
              'Learn Adobe Illustrator with these courses from Lorem. You’ll learn how to create logos, icons, sketches, typography, and complex illustrations for print, web, interactive, video, and mobile. Whether you’re a beginner or an expert, these courses will help you take your design skills to the next level.',
            courses: [
              {
                id: 'adobe-illustrator-course-1',
                name: 'Illustrator CC 2021 MasterClass',
                thumbnailUrl: '/course-images/illustrator-course-image-1.jpg',
                creatorNames: ['Martin Perhiniak'],
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
                  'Master Adobe Illustrator CC with this in-depth training for all levels. ',
                bulletPoints: [
                  'Design your own graphics, without any experience',
                  'Learn how to use the Pen Tool like a pro',
                  'Create icons, logos, and more',
                ],
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'adobe-illustrator-course-2',
                name: 'Adobe Illustrator Advanced Vector Artwork',
                thumbnailUrl: '/course-images/illustrator-course-image-2.jpg',
                creatorNames: ['Daniel Scott'],
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
                  'Create Advanced Art that will Stand Up As Professional Work',
                bulletPoints: [
                  'Create advanced vector artwork',
                  'Use the power of Adobe Illustrator to design professional artwork',
                  'Create advanced special effects',
                ],
                learerCount: getRandomLearnerCount(),
              },
            ],
          },
          {
            name: 'Adobe Photoshop',
            url: '/adobe-photoshop',
            heading: 'Master Adobe Photoshop with these courses',
            description:
              'Learn Adobe Photoshop with these courses from Lorem. You’ll learn how to retouch photos, design websites, create digital art, and more. Whether you’re a beginner or an expert, these courses will help you take your design skills to the next level. Whether you’re a beginner or an expert, these courses will help you take your design skills to the next level.',
            courses: [
              {
                id: 'adobe-photoshop-course-1',
                name: 'Photoshop CC 2021 MasterClass',
                thumbnailUrl: '/course-images/photoshop-course-image-1.jpg',
                creatorNames: ['Martin Perhiniak'],
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
                  'Master Adobe Photoshop CC with this in-depth training for all levels.',
                bulletPoints: [
                  'Design your own graphics, without any experience',
                  'Learn how to use the Pen Tool like a pro',
                  'Create icons, logos, and more',
                ],
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'adobe-photoshop-course-2',
                name: 'Photoshop for Designers',
                thumbnailUrl: '/course-images/photoshop-course-image-2.jpg',
                creatorNames: ['Daniel Scott'],
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
                  'Photoshop for Designers focuses on the features in Photoshop designed for working with graphics.',
                bulletPoints: [
                  'Create advanced vector artwork',
                  'Use the power of Adobe Illustrator to design professional artwork',
                  'Create advanced special effects',
                ],
                learerCount: getRandomLearnerCount(),
              },
            ],
          },
        ],
      },
      {
        name: 'Web Design',
        url: '/web-design',
        topics: [
          {
            name: 'HTML',
            url: '/html',
            heading: 'Master HTML with these courses',
            description:
              'Learn HTML with these courses from Lorem. You’ll learn how to create websites, web applications, and mobile apps. Whether you’re a beginner or an expert, these courses will help you take your design skills to the next level. Whether you’re a beginner or an expert, these courses will help you take your design skills to the next level.',
            courses: [
              {
                id: 'html-course-1',
                name: 'Build Responsive Real World Websites with HTML5 and CSS3',
                thumbnailUrl: '/course-images/html-course-image-1.jpg',
                creatorNames: ['Jonas Schmedtmann'],
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
                  'The easiest way to learn modern web design, HTML5 and CSS3 step-by-step from scratch. Design AND code a huge project.',
                bulletPoints: [
                  'Real-world skills to build real-world websites: professional, beautiful, and truly responsive websites',
                  'A huge project that will teach you everything you need to know to get started with HTML5 and CSS3',
                  'The proven 7 real-world steps from complete scratch to a fully functional and optimized website',
                ],
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'html-course-2',
                name: 'HTML & CSS - Certification Course for Beginners',
                thumbnailUrl: '/course-images/html-course-image-2.jpg',
                creatorNames: ['YouAccel Training'],
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
                  'Learn HTML & CSS from Scratch. Build Responsive Real World Websites with HTML5 and CSS3',
                bulletPoints: [
                  'Learn HTML5 and CSS3 from scratch',
                  'Build responsive websites with HTML5 and CSS3',
                  'Understand the latest web technologies',
                ],
                learerCount: getRandomLearnerCount(),
              },
            ],
          },
        ],
      },
      {
        name: 'User Experience',
        url: '/user-experience',
        topics: [
          {
            name: 'User Interface Design',
            url: '/user-interface-design',
            heading: 'Master user interface design with these courses',
            description:
              'Learn user interface design with these courses from Lorem. You’ll learn how to create wireframes, prototypes, and mockups. Whether you’re a beginner or an expert, these courses will help you take your design skills to the next level.',
            courses: [],
          },
        ],
      },
    ],
  },
  {
    name: 'Development',
    url: '/',
    imageUrl: '/course-category-images/category-development.jpg',
    subcategories: [
      {
        name: 'Programming Languages',
        url: '/',
        topics: [
          {
            name: 'Python',
            url: '/',
            heading: 'Expand your career opportunities with Python',
            description:
              'Take one of Lorem’s range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to beginners and experts alike.',
            courses: [
              {
                id: 'python-course-1',
                name: 'The Complete Python Bootcamp From Zero to Hero in Python',
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
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'python-course-2',
                name: 'Python for Data Science and Machine Learning Bootcamp Long Text to Test Overflowing Title',
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
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'python-course-3',
                name: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
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
                learerCount: getRandomLearnerCount(),
              },
            ],
          },
          {
            name: 'Excel',
            url: '/',
            heading: 'Analyze and visualize data with Excel',
            description:
              'Take a Microsoft Excel course from Lorem, and learn how to use this industry-standard software. Real-world experts will show you the basics like how to organize data into sheets, rows and columns, and advanced techniques like creating complex dynamic formulas. Both small businesses and large companies use Excel to store, analyze, and visualize data.',
            courses: [
              {
                id: 'excel-course-1',
                name: 'Microsoft Excel - Excel from Beginner to Advanced',
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
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'excel-course-2',
                name: 'Microsoft Excel - Advanced Excel Formulas & Functions',
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
                learerCount: getRandomLearnerCount(),
              },
            ],
          },
        ],
      },
      {
        name: 'Web Development',
        url: '/',
        topics: [
          {
            name: 'React',
            url: '/react',
            heading: 'Master React with these courses',
            description:
              'Learn React with these courses from Lorem. You’ll learn how to build web applications, mobile apps, and games. Whether you’re a beginner or an expert, these courses will help you take your development skills to the next level.',
            courses: [
              {
                id: 'react-course-1',
                name: 'Modern React with Redux [2021 Update]',
                thumbnailUrl: '/course-images/react-course-image-1.jpg',
                creatorNames: ['Stephen Grider'],
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
                  'Master React v16.6.3 and Redux with React Router, Webpack, and Create-React-App. Includes Hooks!',
                bulletPoints: [
                  'Build amazing single page applications with React JS and Redux',
                  'Master fundamental concepts behind structuring Redux applications',
                  'Realize the power of building composable components',
                ],
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'react-course-2',
                name: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
                thumbnailUrl: '/course-images/react-course-image-2.jpg',
                creatorNames: ['Maximilian Schwarzmüller'],
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
                  'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
                bulletPoints: [
                  'Build powerful, fast, user-friendly and reactive web apps',
                  'Provide amazing user experiences by leveraging the power of JavaScript with ease',
                  'Apply for high-paid jobs or work as a freelancer in one the most-demanded sectors you can find in web dev right now',
                ],
                learerCount: getRandomLearnerCount(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Marketing',
    url: '/',
    imageUrl: '/course-category-images/category-marketing.jpg',
    subcategories: [
      {
        name: 'Digital Marketing',
        url: '/',
        topics: [
          {
            name: 'Social Media Marketing',
            url: '/',
            heading: 'Master social media marketing with these courses',
            description:
              'Learn social media marketing with these courses from Lorem. You’ll learn how to create a social media strategy, build a social media audience, and engage with your followers. Whether you’re a small business owner or a social media manager, these courses will help you understand the best practices for social media marketing.',
            courses: [
              {
                id: 'social-media-marketing-course-1',
                name: 'Social Media Marketing MASTERY | Learn Ads on 10+ Platforms',
                thumbnailUrl:
                  '/course-images/social-media-marketing-course-image-1.jpg',
                creatorNames: ['COURSE ENVY'],
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
                  'Learn Social Media Marketing via Facebook, Instagram, LinkedIn, Twitter, Pinterest & TikTok with ads. Bonus content.',
                bulletPoints: [
                  'Understand everything about Social Media Marketing!',
                  'Create highly optimized and high quality paid ads on all Social Media platforms.',
                  'Learn Instagram Marketing A-Z and how to monetize the social platform.',
                ],
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'social-media-marketing-course-2',
                name: 'Social Media Marketing - Complete Certificate Course',
                thumbnailUrl:
                  '/course-images/social-media-marketing-course-image-2.jpg',
                creatorNames: ['SO ME Academy'],
                rating: 4.2,
                ratingCount: 12345,
                listPrice: 149.99,
                priceEur: 149.99,
                isBestseller: false,
                lastUpdated: new Date('2024-12-30').toDateString(),
                lengthHours: 20,
                difficultyLevel: 'Beginner',
                hasSubtitles: false,
                description:
                  'The comprehensive social media course, beginner to advanced. Go viral, get started today!',
                bulletPoints: [
                  'Understand the social media foundations',
                  'Build a social media strategy',
                  'Use social media for all business activities',
                ],
                learerCount: getRandomLearnerCount(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'IT and Software',
    url: '/',
    imageUrl: '/course-category-images/category-it-and-software.jpg',
    subcategories: [
      {
        name: 'IT Certification',
        url: '/',
        topics: [
          {
            name: 'AWS Certification',
            url: '/',
            heading: 'Get certified in AWS with these courses',
            description:
              'Learn AWS with these courses from Lorem. You’ll learn how to build, deploy, and manage applications on AWS. Whether you’re a developer, system administrator, or solutions architect, these courses will help you understand the best practices for using AWS.',
            courses: [
              {
                id: 'aws-certification-course-1',
                name: 'Ultimate AWS Certified Solutions Architect Associate 2021',
                thumbnailUrl:
                  '/course-images/aws-certification-course-image-1.jpg',
                creatorNames: [
                  'Stephane Maarek | AWS Certified Solutions Architect',
                ],
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
                  'Pass the AWS Certified Solutions Architect Associate Certification SAA-C02. Complete AWS Certified Solutions Architect Associate.',
                bulletPoints: [
                  'Pass the AWS Certified Solutions Architect Associate Certification SAA-C02',
                  'Master all the exam required knowledge and subject areas',
                  'Be fully prepared for the AWS Certified Solutions Architect Associate exam',
                ],
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'aws-certification-course-2',
                name: 'AWS Certified Solutions Architect - Associate 2021',
                thumbnailUrl:
                  '/course-images/aws-certification-course-image-2.jpg',
                creatorNames: ['Ryan Kroonenburg'],
                rating: 4.2,
                ratingCount: 12345,
                listPrice: 149.99,
                priceEur: 149.99,
                isBestseller: false,
                lastUpdated: new Date('2024-12-30').toDateString(),
                lengthHours: 20,
                difficultyLevel: 'Beginner',
                hasSubtitles: false,
                description:
                  'Want to pass the AWS Solutions Architect - Associate Exam? Want to become Amazon Web Services Certified? Do this course!',
                bulletPoints: [
                  'Pass the AWS Certified Solutions Architect - Associate 2021 Exam',
                  'Become confident in creating basic Python and PHP code to manipulate AWS environments',
                  'Become intimately familiar with the AWS platform from a developer perspective.',
                ],
                learerCount: getRandomLearnerCount(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Personal Development',
    url: '/',
    imageUrl: '/course-category-images/category-personal-development.jpg',
    subcategories: [
      {
        name: 'Personal Transformation',
        url: '/',
        topics: [
          {
            name: 'Personal Productivity',
            url: '/',
            heading: 'Boost your productivity with these courses',
            description:
              'Learn personal productivity with these courses from Lorem. You’ll learn how to set goals, manage your time, and increase your focus. Whether you’re a student, entrepreneur, or professional, these courses will help you understand the best practices for personal productivity.',
            courses: [
              {
                id: 'personal-productivity-course-1',
                name: 'Productivity and Time Management for the Overwhelmed',
                thumbnailUrl:
                  '/course-images/personal-productivity-course-image-1.jpg',
                creatorNames: ['Marc Guberti'],
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
                  'Learn how to manage your time effectively and increase your productivity.',
                bulletPoints: [
                  'Learn how to manage your time effectively',
                  'Increase your productivity',
                  'Set goals and achieve them',
                ],
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'personal-productivity-course-2',
                name: 'Productivity and Time Management for the Overwhelmed',
                thumbnailUrl:
                  '/course-images/personal-productivity-course-image-2.jpg',
                creatorNames: ['Marc Guberti'],
                rating: 4.2,
                ratingCount: 12345,
                listPrice: 149.99,
                priceEur: 149.99,
                isBestseller: false,
                lastUpdated: new Date('2024-12-30').toDateString(),
                lengthHours: 20,
                difficultyLevel: 'Beginner',
                hasSubtitles: false,
                description:
                  'Learn how to manage your time effectively and increase your productivity.',
                bulletPoints: [
                  'Learn how to manage your time effectively',
                  'Increase your productivity',
                  'Set goals and achieve them',
                ],
                learerCount: getRandomLearnerCount(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Business',
    url: '/',
    imageUrl: '/course-category-images/category-business.jpg',
    subcategories: [
      {
        name: 'Finance',
        url: '/',
        topics: [
          {
            name: 'Accounting',
            url: '/',
            heading: 'Master accounting with these courses',
            description:
              'Learn accounting with these courses from Lorem. You’ll learn how to read financial statements, balance the books, and create budgets. Whether you’re a small business owner or an aspiring accountant, these courses will help you understand the numbers behind the business.',
            courses: [
              {
                id: 'accounting-course-1',
                name: 'Accounting & Financial Statement Analysis: Complete Training',
                thumbnailUrl: '/course-images/accounting-course-image-1.jpg',
                creatorNames: ['Chris Haroun'],
                rating: 4.5,
                ratingCount: 1234,
                listPrice: 199.99,
                priceEur: 9.99,
                isBestseller: true,
                lastUpdated: new Date('2022-05-01').toDateString(),
                lengthHours: 10,
                difficultyLevel: 'Intermediate',
                hasSubtitles: true,
                description:
                  'Accounting & Financial Ratio Analysis made easy. Learn important accounting skills that will get your foot in the door!',
                bulletPoints: [
                  'Understand and analyze an income statement (even if you have no experience with income statements).',
                  'Understand and analyze a balance sheet (even if you have no experience with balance sheets).',
                  'Understand and analyze a cash flow statement (even if you have no experience with cash flow statements).',
                ],
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'accounting-course-2',
                name: 'Accounting in 60 Minutes - A Brief Introduction',
                thumbnailUrl: '/course-images/accounting-course-image-2.jpg',
                creatorNames: ['Robert Steele'],
                rating: 4.2,
                ratingCount: 12345,
                listPrice: 99.99,
                priceEur: 99.99,
                isBestseller: false,
                lastUpdated: new Date('2024-12-30').toDateString(),
                lengthHours: 20,
                difficultyLevel: 'Beginner',
                hasSubtitles: false,
                description:
                  'Learn the very basics of accounting in just about an hour.',
                bulletPoints: [
                  'Understand the very basics of accounting.',
                  'Understand the accounting equation and the five categories involved.',
                  'Understand the double-entry accounting system.',
                ],
                learerCount: getRandomLearnerCount(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Photography',
    url: '/',
    imageUrl: '/course-category-images/category-photography.jpg',
    subcategories: [
      {
        name: 'Digital Photography',
        url: '/',
        topics: [
          {
            name: 'Adobe Lightroom',
            url: '/',
            heading: 'Master Adobe Lightroom with these courses',
            description:
              'Learn Adobe Lightroom with these courses from Lorem. You’ll learn how to organize, edit, and share your photos. Whether you’re a beginner or an expert, these courses will help you take your photography skills to the next level.',
            courses: [
              {
                id: 'adobe-lightroom-course-1',
                name: 'Lightroom Classic CC 2021 MasterClass',
                thumbnailUrl: '/course-images/lightroom-course-image-1.jpg',
                creatorNames: ['Martin Perhiniak'],
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
                  'Master Adobe Lightroom Classic CC with this in-depth training for all levels.',
                bulletPoints: [
                  'Edit images with Lightroom Classic CC like a pro',
                  'Organize images with Lightroom Classic CC',
                  'Create images with Lightroom Classic CC',
                ],
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'adobe-lightroom-course-2',
                name: 'Adobe Lightroom CC Photo Editing: The Complete Guide',
                thumbnailUrl: '/course-images/lightroom-course-image-2.jpg',
                creatorNames: ['Phil Ebiner'],
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
                  'Your complete guide to editing beautiful photos in Adobe Lightroom!',
                bulletPoints: [
                  'Edit images in Lightroom like a pro',
                  'Organize images in Lightroom',
                  'Create images in Lightroom',
                ],
                learerCount: getRandomLearnerCount(),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Music',
    url: '/',
    imageUrl: '/course-category-images/category-music.jpg',
    subcategories: [
      {
        name: 'Instruments',
        url: '/',
        topics: [
          {
            name: 'Guitar',
            url: '/',
            heading: 'Master the guitar with these courses',
            description:
              'Learn guitar with these courses from Lorem. You’ll learn how to play chords, scales, and songs. Whether you’re a beginner or an expert, these courses will help you take your guitar skills to the next level.',
            courses: [
              {
                id: 'guitar-course-1',
                name: 'Complete Guitar System - Beginner to Advanced',
                thumbnailUrl: '/course-images/guitar-course-image-1.jpg',
                creatorNames: ['Erich Andreas'],
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
                  'Learn how to play guitar with this comprehensive course for all levels.',
                bulletPoints: [
                  'Play chords, scales, and songs',
                  'Learn how to read music',
                  'Improve your guitar technique',
                ],
                learerCount: getRandomLearnerCount(),
              },
              {
                id: 'guitar-course-2',
                name: 'Guitar Super System Level 1',
                thumbnailUrl: '/course-images/guitar-course-image-2.jpg',
                creatorNames: ['Tyler Larson'],
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
                  'Master the guitar with this comprehensive course for all levels.',
                bulletPoints: [
                  'Play chords, scales, and songs',
                  'Learn how to read music',
                  'Improve your guitar technique',
                ],
                learerCount: getRandomLearnerCount(),
              },
            ],
          },
        ],
      },
    ],
  },
];
