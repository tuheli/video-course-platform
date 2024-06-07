interface DropzoneProps {
  allowedDropzoneTag: string;
  children?: React.ReactNode;
}
export const Dropzone = ({ allowedDropzoneTag, children }: DropzoneProps) => {
  return (
    <div
      className={`dropzone-${allowedDropzoneTag}`}
      style={{
        backgroundColor: 'lightgreen',
        width: '400px',
        height: '400px',
      }}
    >
      {children}
    </div>
  );
};
