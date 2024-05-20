export interface Language {
  text: string;
  code: string;
}

enum KnownLanguages {
  English = 'en',
  Spanish = 'es',
  French = 'fr',
  German = 'de',
  Italian = 'it',
  Portuguese = 'pt',
  Dutch = 'nl',
  Russian = 'ru',
  Chinese = 'zh',
  Japanese = 'ja',
  Korean = 'ko',
  Arabic = 'ar',
}

export const getLanguages = () => {
  return languages;
};

const languages: Language[] = [
  { text: 'English', code: KnownLanguages.English },
  { text: 'Spanish', code: KnownLanguages.Spanish },
  { text: 'French', code: KnownLanguages.French },
  { text: 'German', code: KnownLanguages.German },
  { text: 'Italian', code: KnownLanguages.Italian },
  { text: 'Portuguese', code: KnownLanguages.Portuguese },
  { text: 'Dutch', code: KnownLanguages.Dutch },
  { text: 'Russian', code: KnownLanguages.Russian },
  { text: 'Chinese', code: KnownLanguages.Chinese },
  { text: 'Japanese', code: KnownLanguages.Japanese },
  { text: 'Korean', code: KnownLanguages.Korean },
  { text: 'Arabic', code: KnownLanguages.Arabic },
];
