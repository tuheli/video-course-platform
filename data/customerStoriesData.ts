export interface CustomerStory {
  customer: {
    name: string;
    imageUrl: string;
    jobTitle: string;
    companyName: string;
  };
  shortText: string;
  caseStudyUrl: string;
  isShowOnBigImageVersion: boolean;
}

export const getCustomerStoriesAvatarVersion = () => {
  return customerStoriesData.filter(
    (customerStory) => !customerStory.isShowOnBigImageVersion
  );
};

export const getCustomerStoriesBigImageVersion = () => {
  const data = customerStoriesData.filter(
    (customerStory) => customerStory.isShowOnBigImageVersion
  );
  console.log('data', data);

  return data;
};

const customerStoriesData: CustomerStory[] = [
  {
    customer: {
      name: 'Jim Hemsworth',
      imageUrl: '/customer-story-avatar-images/customer-avatar-image-1.jpg',
      jobTitle: 'Principal',
      companyName: 'Lorem Allen Hamilton',
    },
    shortText:
      'Thanks to Lorem Business, Lorem Allen has armed our workforce, specifically its data scientists, with highly relevant and in-demand tech skills that are enabling consultants to stay ahead of big data trends and raise the bar on proficiency, skills, and competencies to meet client demand.',
    caseStudyUrl: '/',
    isShowOnBigImageVersion: false,
  },
  {
    customer: {
      name: 'Lorem Stevens',
      jobTitle: 'Global Head of Capability Development North America',
      companyName: 'Lorem Sapient',
      imageUrl: '/customer-story-avatar-images/customer-avatar-image-2.jpg',
    },
    shortText:
      "With Lorem Business employees were able to marry the two together, technology and consultant soft skills. We're thankful that once they got in and took their key IT courses on AWS, Azure, Google Cloud, Big Data, and DevOps that they efficiently moved over to Consulting courses to help drive their career forward.",
    caseStudyUrl: '/',
    isShowOnBigImageVersion: false,
  },
  {
    customer: {
      name: 'Lorem Hunter',
      jobTitle: "America's Team Lead Learning & Development",
      companyName: 'Metalcase',
      imageUrl: '/customer-story-avatar-images/customer-avatar-image-3.jpg',
    },
    shortText:
      'Lorem has been a great platform to stay competitive in the digital transformation of the workplace by offering fresh, relevant, personalized on-demand learning content powered by a dynamic content marketplace.',
    caseStudyUrl: '/',
    isShowOnBigImageVersion: false,
  },
  {
    customer: {
      name: 'Paulo Doe',
      jobTitle: 'Developer (Android Specialty)',
      companyName: 'Lorem Ipsum',
      imageUrl: '/customer-story-big-images/customer-story-big-image-2.jpg',
    },
    shortText:
      '“Udemy has changed my life. It’s allowed me to follow my passion and become a teacher I love to see my students succeed and hear them say they’ve learned more, quicker, from my courses than they did in college. It’s so humbling.”',
    caseStudyUrl: '/',
    isShowOnBigImageVersion: true,
  },
  {
    customer: {
      name: 'Lorem Hemsworth',
      jobTitle: 'Data Science & IT Certifications',
      companyName: 'Lorem Allen Hamilton',
      imageUrl: '/customer-story-big-images/customer-story-big-image-1.jpg',
    },
    shortText:
      '“I’m proud to wake up knowing my work is helping people around the world improve their careers and build great things. While being a full-time instructor is hard work, it lets you work when, where, and how you want.”',
    caseStudyUrl: '/',
    isShowOnBigImageVersion: true,
  },

  {
    customer: {
      name: 'Jane Grayson Ipsum',
      jobTitle: 'Leadership, Communication',
      companyName: 'Lorem Ipsum',
      imageUrl: '/customer-story-big-images/customer-story-big-image-3.jpg',
    },
    shortText:
      '“Teaching on Udemy has provided me with two important elements: the opportunity to reach more learners than I ever would be able to on my own and a steady stream of extra income.”',
    caseStudyUrl: '/',
    isShowOnBigImageVersion: true,
  },
];
