import { CustomText } from './types';

type ExtendedLeftAttributes = React.HTMLAttributes<HTMLElement> & {
  'data-slate-leaf': true;
};

interface LeafProps {
  attributes: ExtendedLeftAttributes;
  children: React.ReactNode;
  leaf: CustomText;
}

export const Leaf = ({ attributes, children, leaf }: LeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
