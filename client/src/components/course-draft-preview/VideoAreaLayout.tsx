import { ReactNode } from 'react';

interface VideoAreaLayoutProps {
  children?: ReactNode;
}

export const VideoAreaLayout = ({ children }: VideoAreaLayoutProps) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 0,
        paddingBottom: '56.25%',
      }}
    >
      {children}
    </div>
  );
};
