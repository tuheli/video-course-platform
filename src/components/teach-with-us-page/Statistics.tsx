import { Container, Stack } from '@mui/material';
import { StatisticsItem } from './StatisticsItem';

export const Statistics = () => {
  return (
    <Container>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <StatisticsItem count="62M" text="Students" />
        <StatisticsItem count="75+" text="Languages" />
        <StatisticsItem count="830M" text="Enrollments" />
        <StatisticsItem count="180+" text="Countries" />
        <StatisticsItem count="15,000+" text="Enterprise customers" />
      </Stack>
    </Container>
  );
};
