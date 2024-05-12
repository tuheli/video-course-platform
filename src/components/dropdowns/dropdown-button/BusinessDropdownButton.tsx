import { DropdownButton } from './DropdownButton';

export const BusinessDropdownButton = () => {
  const onClick = () => {};

  return (
    <DropdownButton
      onClick={onClick}
      text="Lorem Business"
      dropdownHeading="Get your team access to over 25,000 top Lorem courses, anytime, anywhere."
      dropdownButtonText="Try Lorem Business"
    />
  );
};
