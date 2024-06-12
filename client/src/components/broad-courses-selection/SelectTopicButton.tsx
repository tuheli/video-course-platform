import { Button } from '@mui/material';

interface SelectTopicButtonProps {
  name: string;
  currentTopic: string;
  setTopicName: (topic: string) => void;
}
export const SelectTopicButton = ({
  name,
  currentTopic,
  setTopicName,
}: SelectTopicButtonProps) => {
  const onClick = () => {
    setTopicName(name);
  };

  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        color: name === currentTopic ? 'text.primary' : 'text.secondary',
        fontSize: 15,
        fontWeight: 600,
        '&:hover': {
          color: 'text.primary',
        },
      }}
    >
      {name}
    </Button>
  );
};
