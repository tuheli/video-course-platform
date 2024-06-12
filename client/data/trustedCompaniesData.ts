interface CompanyLogo {
  id: number;
  url: string;
}

export const getTrustedCompanyLogos = () => {
  return logoData;
};

const logoData: CompanyLogo[] = [
  {
    id: 1,
    url: '/trusted-by-companies-logos/logoipsum-245.svg',
  },
  {
    id: 2,
    url: '/trusted-by-companies-logos/logoipsum-282.svg',
  },
  {
    id: 3,
    url: '/trusted-by-companies-logos/logoipsum-292.svg',
  },
  {
    id: 4,
    url: '/trusted-by-companies-logos/logoipsum-298.svg',
  },
  {
    id: 5,
    url: '/trusted-by-companies-logos/logoipsum-323.svg',
  },
  {
    id: 6,
    url: '/trusted-by-companies-logos/logoipsum-325.svg',
  },
  {
    id: 7,
    url: '/trusted-by-companies-logos/logoipsum-327.svg',
  },
  {
    id: 8,
    url: '/trusted-by-companies-logos/logoipsum-330.svg',
  },
];
