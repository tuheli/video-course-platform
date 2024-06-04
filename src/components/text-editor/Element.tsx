import { CustomElement } from './types';

interface ElementProps {
  attributes: any;
  children: any;
  element: CustomElement;
}

export const Element = ({ attributes, children, element }: ElementProps) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'paragraph':
      return (
        <div style={style} {...attributes}>
          {children}
        </div>
      );
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul
          style={{
            paddingLeft: 32,
            margin: 0,
            ...style,
          }}
          {...attributes}
        >
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol
          style={{
            paddingLeft: 32,
            margin: 0,
            ...style,
          }}
          {...attributes}
        >
          {children}
        </ol>
      );
    default:
      return (
        <div style={style} {...attributes}>
          {children}
        </div>
      );
  }
};
