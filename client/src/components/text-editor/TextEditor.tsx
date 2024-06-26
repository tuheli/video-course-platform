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
  Element as SlateElement,
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
import { CustomElement } from './types';

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
    try {
      const childCount = editor.children.length;
      if (childCount === 0) return;

      let path = [0];
      let searchElement = editor.children[0] as CustomElement;

      // Find the first leaf ie. first
      // thing that contains text.
      while (searchElement.children && searchElement.children.length > 0) {
        const firstChild = searchElement.children[0];
        path.push(0);
        if (SlateElement.isElement(firstChild)) {
          searchElement = firstChild;
        } else {
          break;
        }
      }

      Transforms.select(editor, {
        anchor: { path, offset: 0 },
        focus: { path, offset: 0 },
      });
    } catch (error) {
      // NOTE: Error is not caught!
      // Error here will crash the app.
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
