import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type IconType =
  | 'format_bold'
  | 'format_italic'
  | 'format_underlined'
  | 'code'
  | 'looks_one'
  | 'looks_two'
  | 'format_quote'
  | 'format_list_numbered'
  | 'format_list_bulleted'
  | 'format_align_left'
  | 'format_align_center'
  | 'format_align_right'
  | 'format_align_justify';

export type Alignment = 'center' | 'left' | 'right' | 'justify';

export type Format = 'bold' | 'italic' | 'underline' | 'code';

export type TextBlockType =
  | 'paragraph'
  | 'block-quote'
  | 'bulleted-list'
  | 'heading-one'
  | 'heading-two'
  | 'list-item'
  | 'numbered-list';

export type CustomElement = {
  type: TextBlockType;
  children: CustomText[];
  align?: Alignment;
};

export type CustomText = {
  text: string;
  bold?: true;
  italic?: true;
  code?: true;
  underline?: true;
  align?: Alignment;
};

export type MarkType = keyof Omit<CustomText, 'text'>;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
