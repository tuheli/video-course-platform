interface DropzoneProps {
  allowedDropzoneTag: string;
  children?: React.ReactNode;
}
export const Dropzone = ({ allowedDropzoneTag, children }: DropzoneProps) => {
  return <div className={`dropzone-${allowedDropzoneTag}`}>{children}</div>;
};
