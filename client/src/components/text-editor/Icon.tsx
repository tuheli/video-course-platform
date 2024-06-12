import { Span } from './styled/Span';

interface IconProps {
  iconName: string;
}

export const Icon = ({ iconName }: IconProps) => {
  return (
    <Span
      className="material-icons"
      sx={{
        fontFamily: 'Material Icons',
        fontSize: '24px',
        verticalAlign: 'text-bottom',
        display: 'inline-block',
        textTransform: 'none',
        wordWrap: 'normal',
        letterSpacing: 'normal',
        lineHeight: 1,
        direction: 'ltr',
        WebkitFontSmoothing: 'antialiased',
        textRendering: 'optimizeLegibility',
        MozOsxFontSmoothing: 'grayscale',
        fontFeatureSettings: 'liga',
      }}
    >
      {iconName}
    </Span>
  );
};
