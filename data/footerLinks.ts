interface FooterLink {
  text: string;
  href?: string;
}

export const getFooterLinks = () => {
  return footerLinks;
};

const footerLinks: FooterLink[] = [
  {
    text: 'Lorem Business',
  },
  {
    text: 'Teach on Lorem',
  },
  {
    text: 'Get the app',
  },
  {
    text: 'About us',
  },
  {
    text: 'Contact us',
  },
  {
    text: 'Careers',
  },
  {
    text: 'Blog',
  },
  {
    text: 'Help and support',
  },
  {
    text: 'Affiliate',
  },
  {
    text: 'Investors',
  },
  {
    text: 'Terms',
  },
  {
    text: 'Privacy policy',
  },
  {
    text: 'Cookie settings',
  },
  {
    text: 'Sitemap',
  },
  {
    text: 'Accessibility statement',
  },
];
