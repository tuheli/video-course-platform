import { ColumnOrderedGridItem } from '../src/components/column-ordered-grid/ColumnOrderedGrid';

interface Language {
  key: string;
  text: string;
}

export const getLanguages = () => {
  return languages;
};

const languages: Language[] = [
  { key: 'en', text: 'English' },
  { key: 'es', text: 'Spanish' },
  { key: 'fr', text: 'French' },
  { key: 'de', text: 'German' },
  { key: 'it', text: 'Italian' },
  { key: 'pt', text: 'Portuguese' },
  { key: 'nl', text: 'Dutch' },
  { key: 'ru', text: 'Russian' },
  { key: 'zh', text: 'Chinese' },
  { key: 'ja', text: 'Japanese' },
  { key: 'ko', text: 'Korean' },
  { key: 'ar', text: 'Arabic' },
];
