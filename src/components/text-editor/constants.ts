export const isKnownHotkey = (
  hotkey: string
): hotkey is keyof typeof HOTKEYS => {
  return hotkey in HOTKEYS;
};

export const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
} as const;

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];
