import { useCallback, useMemo } from 'react';
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
import { Toolbar } from './Components';
import { HOTKEYS, isKnownHotkey } from './constants';
import { toggleMark } from './utils';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { BlockButton } from './buttons/BlockButton';
import { MarkButton } from './buttons/MarkButton';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
];

export const TextEditor = () => {
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
      <Toolbar>
        <MarkButton format="bold" iconName="format_bold" />
        <MarkButton format="italic" iconName="format_italic" />
        <MarkButton format="underline" iconName="format_underlined" />
        <MarkButton format="code" iconName="code" />
        <BlockButton blockPropertyName="heading-one" icon="looks_one" />
        <BlockButton blockPropertyName="heading-two" icon="looks_two" />
        <BlockButton blockPropertyName="block-quote" icon="format_quote" />
        <BlockButton
          blockPropertyName="numbered-list"
          icon="format_list_numbered"
        />
        <BlockButton
          blockPropertyName="bulleted-list"
          icon="format_list_bulleted"
        />
        <BlockButton align="left" icon="format_align_left" />
        <BlockButton align="center" icon="format_align_center" />
        <BlockButton align="right" icon="format_align_right" />
        <BlockButton align="justify" icon="format_align_justify" />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
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
      />
    </Slate>
  );
};
