interface GreyscaleLogoProps {
  imageUrl: string;
  brightness?: number;
}
export const GreyscaleLogo = ({ imageUrl, brightness }: GreyscaleLogoProps) => {
  return (
    <img
      src={imageUrl}
      alt="Company logo"
      style={{
        filter: brightness
          ? `grayscale(100%) brightness(${brightness})`
          : 'grayscale(100%)',
        WebkitFilter: brightness
          ? `grayscale(100%) brightness(${brightness})`
          : 'grayscale(100%)',
      }}
    />
  );
};
