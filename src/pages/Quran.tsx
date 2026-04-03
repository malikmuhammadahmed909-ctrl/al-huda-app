import React, { useEffect, useState } from 'react';
import { quranApi } from '@/src/services/api';
import { Surah, Ayah } from '@/src/types';
import { ChevronRight, Search, BookOpen, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Quran() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [surahData, setSurahData] = useState<{ arabic: any, translation: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    quranApi.getSurahs().then(data => {
      setSurahs(data);
      setLoading(false);
    });
  }, []);

  const handleSurahClick = async (num: number) => {
    setLoading(true);
    setSelectedSurah(num);
    const data = await quranApi.getSurahWithTranslation(num);
    setSurahData(data);
    setLoading(false);
    document.getElementById('quran')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.number.toString() === searchQuery
  );

  if (selectedSurah && surahData) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedSurah(null)}
          className="text-emerald-700 font-medium flex items-center gap-2 hover:underline"
        >
          ← Back to Surah List
        </button>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 text-center space-y-4">
          <h2 className="text-4xl font-serif text-emerald-900">{surahData.arabic.name}</h2>
          <p className="text-xl text-emerald-700">{surahData.arabic.englishName} - {surahData.arabic.englishNameTranslation}</p>
          <div className="flex justify-center gap-4 text-sm text-emerald-600/60">
            <span>{surahData.arabic.revelationType}</span>
            <span>•</span>
            <span>{surahData.arabic.numberOfAyahs} Ayahs</span>
          </div>
        </div>

        <div className="space-y-8">
          {surahData.arabic.ayahs.map((ayah: Ayah, index: number) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              key={ayah.number} 
              className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-emerald-50 border-r-4 border-r-emerald-500"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
                  {ayah.numberInSurah}
                </span>
                <p className="text-3xl md:text-4xl text-right font-serif leading-relaxed text-emerald-950" dir="rtl">
                  {ayah.text}
                </p>
              </div>
              <div className="pt-6 border-t border-emerald-50">
                <p className="text-lg md:text-xl text-right font-serif leading-relaxed text-emerald-800/80" dir="rtl">
                  {surahData.translation.ayahs[index].text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-emerald-900">Holy Quran</h1>
        <p className="text-emerald-700/70">Read and study the Quran with Urdu translation.</p>
        
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Search Surah by name or number..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
          <p className="text-emerald-600 font-medium">Loading Quranic data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSurahs.map((surah) => (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={surah.number}
              onClick={() => handleSurahClick(surah.number)}
              className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 text-left group"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 font-bold group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                {surah.number}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-emerald-900">{surah.englishName}</h3>
                <p className="text-xs text-emerald-600/60">{surah.englishNameTranslation}</p>
              </div>
              <div className="text-right">
                <p className="font-serif text-lg text-emerald-800">{surah.name}</p>
                <p className="text-[10px] text-emerald-400 uppercase tracking-wider">{surah.numberOfAyahs} Ayahs</p>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
