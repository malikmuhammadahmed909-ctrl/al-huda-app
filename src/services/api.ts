import axios from 'axios';

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';
const HADITH_API_BASE = 'https://hadith-api-azhar.vercel.app/api'; // Alternative Hadith API or similar

export const quranApi = {
  getSurahs: async () => {
    const response = await axios.get(`${QURAN_API_BASE}/surah`);
    return response.data.data;
  },
  getSurahDetail: async (number: number, edition: string = 'ar.alafasy') => {
    const response = await axios.get(`${QURAN_API_BASE}/surah/${number}/${edition}`);
    return response.data.data;
  },
  getSurahWithTranslation: async (number: number, translationEdition: string = 'ur.jalandhry') => {
    const [arabic, translation] = await Promise.all([
      axios.get(`${QURAN_API_BASE}/surah/${number}/ar.alafasy`),
      axios.get(`${QURAN_API_BASE}/surah/${number}/${translationEdition}`)
    ]);
    return {
      arabic: arabic.data.data,
      translation: translation.data.data
    };
  }
};

export const hadithApi = {
  getBooks: () => [
    { id: 'bukhari', name: 'Sahih Bukhari', available: 7563, topics: ['Faith', 'Prayer', 'Zakat', 'Hajj', 'Business', 'Marriage'] },
    { id: 'muslim', name: 'Sahih Muslim', available: 3033, topics: ['Faith', 'Purification', 'Prayer', 'Zakat', 'Fasting'] },
    { id: 'abudawud', name: 'Sunan Abu Dawud', available: 4419, topics: ['Purification', 'Prayer', 'Zakat', 'Hajj'] },
    { id: 'tirmidhi', name: 'Jami at-Tirmidhi', available: 3956, topics: ['Purification', 'Prayer', 'Zakat', 'Fasting'] },
    { id: 'nasai', name: 'Sunan an-Nasa\'i', available: 5758, topics: ['Purification', 'Water', 'Menstruation', 'Prayer'] },
    { id: 'ibnmajah', name: 'Sunan Ibn Majah', available: 4341, topics: ['Faith', 'Purification', 'Prayer', 'Funerals'] },
    { id: 'malik', name: 'Muwatta Malik', available: 1720, topics: ['Prayer', 'Hajj', 'Jihad', 'Business'] },
    { id: 'ahmad', name: 'Musnad Ahmad', available: 27000, topics: ['Faith', 'Prayer', 'Character', 'History'] }
  ],
  getHadith: async (book: string, number: number) => {
    try {
      const response = await axios.get(`https://hadith-api-azhar.vercel.app/api/hadith/${book}/${number}`);
      return response.data;
    } catch (e) {
      return null;
    }
  }
};
