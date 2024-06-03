import { useSlate } from 'slate-react';
import { Icon } from '../Icon';
import { TEXT_ALIGN_TYPES } from '../constants';
import { isBlockActive, toggleBlock } from '../utils';
import { Alignment, IconType, TextBlockType } from '../types';
import { Button } from './Button';
import { MouseEvent } from 'react';

interface BlockButtonProps {
  blockPropertyName?: TextBlockType;
  align?: Alignment;
  icon: IconType;
}

export const BlockButton = ({
  blockPropertyName,
  align,
  icon,
}: BlockButtonProps) => {
  const editor = useSlate();

  const isTextAlignType = align ? TEXT_ALIGN_TYPES.includes(align) : false;

  const isActive = blockPropertyName
    ? isBlockActive(
        editor,
        blockPropertyName,
        isTextAlignType ? 'align' : 'type'
      )
    : false;

  const onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    if (!blockPropertyName) return;
    toggleBlock(editor, blockPropertyName);
  };

  return (
    <Button isActive={isActive} onMouseDown={onMouseDown}>
      <Icon iconName={icon} />
    </Button>
  );
};
