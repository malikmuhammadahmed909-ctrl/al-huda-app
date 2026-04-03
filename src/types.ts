export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
}

export interface HadithBook {
  name: string;
  id: string;
  available: number;
}

export interface Hadith {
  number: number;
  arab: string;
  id: string;
  ur?: string;
  en?: string;
}

export type FiqhSchool = 'Hanafi' | 'Shafi\'i' | 'Maliki' | 'Hanbali';

export interface PillarStep {
  title: string;
  description: string;
  fiqhNotes: Record<FiqhSchool, string>;
}

export interface Waqia {
  id: string;
  title: string;
  category: 'Ambiya' | 'Sahaba' | 'Ghazwat';
  content: string;
}

export interface MasailIssue {
  id: string;
  topic: string;
  question: string;
  rulings: Record<FiqhSchool, string>;
}

export type AppLanguage = 'ur' | 'en' | 'ar' | 'hi';
