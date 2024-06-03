import { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Toolbar } from './Toolbar';
import { HOTKEYS, isKnownHotkey } from './constants';
import { toggleMark } from './utils';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { BlockButton } from './buttons/BlockButton';
import { MarkButton } from './buttons/MarkButton';
import { Divider, Stack } from '@mui/material';
import { TextEditorContext } from '../../contexts/TextEditorContext';

// TODO: Ensure the editor gets focused,
// placeholder node is removed and editor
// contains atleast an empty text element on focus
// or if mark button is pressed

// TODO: Remove list formats if there is no
// text in the editor and user presses backspace

// TODO: Style the list formats so they dont
// add margins and paddings

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

interface TextEditorProps {
  placeholder: string;
}

export const TextEditor = ({ placeholder }: TextEditorProps) => {
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <TextEditorContext.Provider
        value={{
          setIsPlaceholderVisible,
        }}
      >
        <Stack
          sx={{
            border: '1px solid',
            borderColor: 'text.primary',
          }}
        >
          <Toolbar>
            <MarkButton format="bold" iconName="format_bold" />
            <MarkButton format="italic" iconName="format_italic" />
            <BlockButton
              blockPropertyName="numbered-list"
              icon="format_list_numbered"
            />
            <BlockButton
              blockPropertyName="bulleted-list"
              icon="format_list_bulleted"
            />
          </Toolbar>
          <Divider
            sx={{
              borderColor: 'text.primary',
              mb: 1,
            }}
          />
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={isPlaceholderVisible ? placeholder : ''}
            spellCheck={false}
            autoFocus={false}
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  if (!isKnownHotkey(hotkey)) return;
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
            style={{
              outline: 'none',
              paddingLeft: 14,
              paddingRight: 14,
              paddingBottom: 32,
            }}
          />
        </Stack>
      </TextEditorContext.Provider>
    </Slate>
  );
};
