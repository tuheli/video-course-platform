import { Editor, Transforms, Element as SlateElement } from 'slate';
import { TEXT_ALIGN_TYPES, LIST_TYPES } from './constants';
import { Alignment, MarkType, TextBlockType } from './types';
import { Descendant } from 'slate';

export const toggleBlock = (
  editor: Editor,
  blockPropertyName: TextBlockType,
  alignPropertyName?: Alignment
) => {
  const isTextAlignType = alignPropertyName
    ? TEXT_ALIGN_TYPES.includes(alignPropertyName)
    : false;

  const isListType = LIST_TYPES.includes(blockPropertyName);

  const isActive = isBlockActive(
    editor,
    blockPropertyName,
    isTextAlignType ? 'align' : 'type'
  );

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !isTextAlignType,
    split: true,
  });

  const newProperties = isTextAlignType
    ? {
        align: isActive ? undefined : alignPropertyName,
      }
    : {
        type: isActive
          ? 'paragraph'
          : isListType
            ? 'list-item'
            : blockPropertyName,
      };

  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isListType) {
    const block = { type: blockPropertyName, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor: Editor, markPropertyName: MarkType) => {
  const isActive = isMarkActive(editor, markPropertyName);

  if (isActive) {
    Editor.removeMark(editor, markPropertyName);
  } else {
    Editor.addMark(editor, markPropertyName, true);
  }
};

export const isBlockActive = (
  editor: Editor,
  blockPropertyName: TextBlockType,
  alignPropertyName: 'align' | 'type'
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[alignPropertyName] === blockPropertyName,
    })
  );

  return !!match;
};

export const isMarkActive = (editor: Editor, markPropertyName: MarkType) => {
  const marks = Editor.marks(editor);
  return marks ? marks[markPropertyName] === true : false;
};

export const getLectureDescriptionLocalStorageKey = (
  courseDraftId: string,
  sectionId: string,
  lectureId: string
) => {
  return `${courseDraftId}_${sectionId}_${lectureId}`;
};

export const saveToLocalStorage = (key: string, value: Descendant[]) => {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
};

export const getStateFromLocalStorageOrDefault = (
  key: string
): Descendant[] => {
  const stringValue = localStorage.getItem(key);

  if (!stringValue) {
    return [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ];
  }

  return JSON.parse(stringValue);
};
