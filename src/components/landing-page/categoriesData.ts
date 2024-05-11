export interface MenuItem {
  title: string;
  url: string;
  submenu?: MenuItem[];
}

export const categoriesData: MenuItem[] = [
  {
    title: 'Development',
    url: '/',
    submenu: [
      {
        title: 'Web Development',
        url: '/',
        submenu: [
          {
            title: 'Javascript',
            url: '/',
          },
          {
            title: 'React JS',
            url: '/',
          },
          {
            title: 'Angular',
            url: '/',
          },
          {
            title: 'Next.js',
            url: '/',
          },
          {
            title: 'CSS',
            url: '/',
          },
          {
            title: 'HTML',
            url: '/',
          },
          {
            title: 'ASP.NET Core',
            url: '/',
          },
          {
            title: 'Node.js',
            url: '/',
          },
        ],
      },
      {
        title: 'Data Science',
        url: '/',
        submenu: [
          {
            title: 'Machine Learning',
            url: '/',
          },
          {
            title: 'Deep Learning',
            url: '/',
          },
          {
            title: 'Python',
            url: '/',
          },
          {
            title: 'Artificial Intelligence (AI)',
            url: '/',
          },
          {
            title: 'Natural Language Processing (NLP)',
            url: '/',
          },
          {
            title: 'LangChain',
            url: '/',
          },
          {
            title: 'Data Analysis',
            url: '/',
          },
          {
            title: 'R (Programming Language)',
            url: '/',
          },
        ],
      },
      {
        title: 'Mobile Development',
        url: '/',
        submenu: [
          {
            title: 'Android Development',
            url: '/',
          },
          {
            title: 'iOS Development',
            url: '/',
          },
          {
            title: 'React Native',
            url: '/',
          },
          {
            title: 'Flutter',
            url: '/',
          },
        ],
      },
      {
        title: 'Game Development',
        url: '/',
        submenu: [
          {
            title: 'Unity',
            url: '/',
          },
          {
            title: 'Unreal Engine',
            url: '/',
          },
          {
            title: 'Godot Engine',
            url: '/',
          },
          {
            title: 'GameMaker Studio',
            url: '/',
          },
        ],
      },
    ],
  },
  {
    title: 'Business',
    url: '/',
    submenu: [
      {
        title: 'Entrepreneurship',
        url: '/',
        submenu: [
          {
            title: 'Business Fundamentals',
            url: '/',
          },
          {
            title: 'Entrepreneurship Fundamentals',
            url: '/',
          },
          {
            title: 'Business Strategy',
            url: '/',
          },
          {
            title: 'Freelancing',
            url: '/',
          },
          {
            title: 'Online Business',
            url: '/',
          },
          {
            title: 'ChatGPT',
            url: '/',
          },
          {
            title: 'Startup',
            url: '/',
          },
          {
            title: 'Business Plan',
            url: '/',
          },
          {
            title: 'Instagram Marketing',
            url: '/',
          },
        ],
      },
    ],
  },
];
