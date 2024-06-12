import { useCallback, useEffect, useMemo } from 'react';
import isHotkey from 'is-hotkey';
import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';
import { createEditor, Descendant, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Toolbar } from './Toolbar';
import { HOTKEYS, isKnownHotkey } from './constants';
import { toggleMark } from './utils';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { BlockButton } from './buttons/BlockButton';
import { MarkButton } from './buttons/MarkButton';
import { Divider, Stack } from '@mui/material';

interface TextEditorProps {
  placeholder: string;
  initialValue?: Descendant[];
  onChange: (value: Descendant[]) => void;
}

export const TextEditor = ({
  placeholder,
  initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ],
  onChange,
}: TextEditorProps) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const focusEditor = () => {
    // Focus at the beginning of the editor instead
    // of the end. I think its nicer ux
    // since the screen will do a sudden
    // jump to the end if there is a lot of text.
    try {
      const childCount = editor.children.length;
      if (childCount === 0) return;

      Transforms.select(editor, {
        offset: 0,
        path: [0, 0],
      });
    } catch (error) {
      // Ignore the error
    }
  };

  const onChangeWrapper = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op) => 'set_selection' !== op.type
    );

    if (!isAstChange) return;

    onChange(value);
  };

  // NOTE: Focus the editor on mount for the
  // mark buttons to work immediately without
  // the user first manually clicking the editor.
  // The autofocus attribute is also needed.
  useEffect(() => {
    focusEditor();
  }, []);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={onChangeWrapper}
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
          placeholder={placeholder}
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            maxWidth: '100%',
          }}
        />
      </Stack>
    </Slate>
  );
};
