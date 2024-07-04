export interface Placement {
  top: number;
  left: number;
}

export interface ReactangleSize {
  width: number;
  height: number;
}

export interface SpaceAround {
  spaceLeft: number;
  spaceRight: number;
  spaceAbove: number;
  spaceBelow: number;
}

export type RenderPosition = 'left' | 'right' | 'below';

export type AnchorPoint = 'bottom-left' | 'top-right' | 'bottom-right-end';

export const getFittingPosition = (
  portalSize: { width: number; height: number },
  parentSpaceAround: SpaceAround,
  errorMargin = 20
): RenderPosition => {
  const fitsRight =
    parentSpaceAround.spaceRight - errorMargin >= portalSize.width;
  const fitsLeft =
    parentSpaceAround.spaceLeft + errorMargin >= portalSize.width;

  if (fitsRight) return 'right';
  if (fitsLeft) return 'left';
  return 'below';
};

export const getSpaceAroundElement = (element: HTMLElement): SpaceAround => {
  const rect = element.getBoundingClientRect();
  return {
    spaceLeft: rect.left,
    spaceRight: window.innerWidth - rect.right,
    spaceAbove: rect.top,
    spaceBelow: window.innerHeight - rect.bottom,
  };
};

export const getTopRightPosition = (anchorElement: HTMLElement) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.top + window.scrollY - 1,
    left: anchor.right + window.scrollX,
  };

  return position;
};

export const getBottomLeftPosition = (anchorElement: HTMLElement) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.bottom + window.scrollY,
    left: anchor.left + window.scrollX,
  };

  return position;
};

export const getBottomRightEndPosition = (
  anchorElement: HTMLElement,
  myWidth: number
) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.bottom + window.scrollY,
    left: anchor.right + window.scrollX - myWidth,
  };

  return position;
};

export const getCenteredRightPosition = (
  anchorElement: HTMLElement,
  mySize: ReactangleSize
) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.top + window.scrollY + (anchor.height - mySize.height) / 2,
    left: anchor.right + window.scrollX,
  };

  return position;
};

export const getCenteredLeftPosition = (
  anchorElement: HTMLElement,
  mySize: ReactangleSize
) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.top + window.scrollY + (anchor.height - mySize.height) / 2,
    left: anchor.left + window.scrollX - mySize.width,
  };

  return position;
};

export const getCenteredBottomPosition = (
  anchorElement: HTMLElement,
  mySize: ReactangleSize
) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.bottom + window.scrollY,
    left: anchor.left + window.scrollX + (anchor.width - mySize.width) / 2,
  };

  return position;
};

// NOTE: Dont delete
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
const getBottomRightPosition = (anchorElement: HTMLElement) => {
  const anchor = anchorElement.getBoundingClientRect();

  const position = {
    top: anchor.bottom + window.scrollY,
    left: anchor.right + window.scrollX,
  };

  return position;
};

// NOTE: Dont delete
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
const getFlexDirectionForDirectionTriangle = (
  renderPosition: RenderPosition
) => {
  switch (renderPosition) {
    case 'right':
      return 'row';
    case 'left':
      return 'row';
    case 'below':
      return 'column';
    default:
      return undefined;
  }
};
