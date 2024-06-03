import { useSlate } from 'slate-react';
import { Button } from './Button';
import { Icon } from '../Icon';
import { isMarkActive, toggleMark } from '../utils';
import { Format } from '../types';

interface MarkButtonProps {
  format: Format;
  iconName: string;
}

export const MarkButton = ({ format, iconName }: MarkButtonProps) => {
  const editor = useSlate();

  const onMouseDown = () => {
    toggleMark(editor, format);
  };

  const isActive = isMarkActive(editor, format);

  return (
    <Button isActive={isActive} onMouseDown={onMouseDown}>
      <Icon iconName={iconName} />
    </Button>
  );
};
