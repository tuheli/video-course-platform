import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export interface PopularInstructorResource {
  linkTo: string;
  linkText: string;
  description: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
}

const popularInstructorResourcesData: PopularInstructorResource[] = [
  {
    linkTo: '/',
    linkText: 'Test Video',
    description: 'Send us a sample video and get expert feedback.',
    Icon: OndemandVideoIcon,
  },
  {
    linkTo: '/',
    linkText: 'Insctructor Community',
    description:
      'Connect with experienced instructors. Ask questions, browse discussions, and more.',
    Icon: QuestionAnswerIcon,
  },
  {
    linkTo: '/',
    linkText: 'Teaching Center',
    description: 'Learn about best practices for teaching on Lorem.',
    Icon: EmojiPeopleIcon,
  },
  {
    linkTo: '/',
    linkText: 'Marketplace Insights',
    description:
      'Validate your course topic by exploring our marketpace supply and demand.',
    Icon: AutoGraphIcon,
  },
  {
    linkTo: '/',
    linkText: 'Help Center',
    description: 'Browse our Help Center or contact our support team.',
    Icon: HelpCenterIcon,
  },
];

export const getPopularInstructorResourcesData = () =>
  popularInstructorResourcesData;
