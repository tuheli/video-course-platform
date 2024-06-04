import { useCallback, useEffect, useMemo } from 'react';
import isHotkey from 'is-hotkey';
import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';
import {
  createEditor,
  Descendant,
  Transforms,
  Element as IElement,
} from 'slate';
import { withHistory } from 'slate-history';
import { Toolbar } from './Toolbar';
import { HOTKEYS, isKnownHotkey } from './constants';
import { toggleMark } from './utils';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { BlockButton } from './buttons/BlockButton';
import { MarkButton } from './buttons/MarkButton';
import { Divider, Stack } from '@mui/material';

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
    try {
      const childCount = editor.children.length;
      if (childCount === 0) return;

      const lastChild = editor.children[childCount - 1];

      if (!IElement.isElement(lastChild)) return;

      const lastChildText = lastChild.children[0].text;
      const lastChildTextLength = lastChildText.length;

      Transforms.select(editor, {
        offset: lastChildTextLength,
        path: [childCount - 1, 0],
      });
    } catch (error) {}
  };

  // NOTE: Focus the editor on mount for the
  // mark buttons to work immediately without
  // the user first manually clicking the editor.
  // The autofocus attribute is also needed.
  useEffect(() => {
    focusEditor();
  }, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
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
    </Slate>
  );
};
