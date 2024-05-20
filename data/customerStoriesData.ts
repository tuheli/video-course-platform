export interface CustomerStory {
  customer: {
    name: string;
    imageUrl: string;
    jobTitle: string;
    companyName: string;
  };
  shortText: string;
  caseStudyUrl: string;
}

export const getCustomerStories = () => {
  return customerStoriesData;
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
  },
];
