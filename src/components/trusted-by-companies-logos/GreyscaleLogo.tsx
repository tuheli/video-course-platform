interface GreyscaleLogoProps {
  url: string;
}
export const GreyscaleLogo = ({ url }: GreyscaleLogoProps) => {
  return (
    <img
      src={url}
      alt="Company logo"
      style={{
        filter: 'grayscale(100%)',
        WebkitFilter: 'grayscale(100%)',
      }}
    />
  );
};
