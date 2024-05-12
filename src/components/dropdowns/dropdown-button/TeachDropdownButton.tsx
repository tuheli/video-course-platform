import { DropdownButton } from './DropdownButton';

export const TeachDropdownButton = () => {
  const onClick = () => {};

  return (
    <DropdownButton
      onClick={onClick}
      text="Teach on Lorem"
      dropdownHeading="Turn what you know into an opportunity and reach millions around the world."
      dropdownButtonText="Learn More"
    />
  );
};
