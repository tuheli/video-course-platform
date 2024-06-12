import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const imageHeight = 400;

export const YouWontHaveToDoItAlone = () => {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          height: imageHeight,
        }}
      >
        <img
          src="/you-wont-have-to-do-it-alone-images/you-wont-have-to-do-it-alone-image-1.jpg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
      <Stack
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: 500,
          gap: 1,
        }}
      >
        <Typography variant="h4">You won't have to do it alone</Typography>
        <Typography
          sx={{
            textAlign: 'center',
          }}
        >
          Our Instructor Support Team is here to answer your questions and
          review your test video, while our Teaching Center gives you plenty of
          resources to help you through the process. Plus, get the support of
          experienced instructors in our online community.
        </Typography>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            marginTop: 16,
          }}
        >
          <Typography
            sx={{
              color: 'secondary.main',
              fontWeight: 600,
              textDecoration: 'underline',
              textUnderlineOffset: 4,
              lineHeight: 1,
            }}
          >
            Need more details before you start? Learn more.
          </Typography>
        </Link>
      </Stack>
      <div
        style={{
          height: imageHeight,
        }}
      >
        <img
          src="/you-wont-have-to-do-it-alone-images/you-wont-have-to-do-it-alone-image-1.jpg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </Stack>
  );
};
