import React, { useState } from 'react';
import { Search, Loader2, Book, BookOpen, Hash } from 'lucide-react';
import { quranApi } from '@/src/services/api';
import { GoogleGenAI } from "@google/genai";
import { motion } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      // Use Gemini for a comprehensive search across Quran and Hadith
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Search for "${query}" in Islamic scriptures. Provide 1 Quranic verse (Arabic, Urdu, Reference) and 1 Hadith (Arabic, Urdu, Reference). Format as JSON: { "quran": { "arabic": "...", "urdu": "...", "ref": "..." }, "hadith": { "arabic": "...", "urdu": "...", "ref": "..." } }. Ensure translations are authentic and references are accurate.`,
        config: { responseMimeType: "application/json" }
      });
      
      const text = response.text;
      if (text) {
        const data = JSON.parse(text);
        setResults(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-emerald-900">Global Search</h1>
        <p className="text-emerald-700/70">Search across Quran and Hadith by words or topics.</p>
      </header>

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto w-full">
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-400 w-6 h-6 group-focus-within:text-emerald-600 transition-colors" />
          <input 
            type="text"
            placeholder="Search for topics like 'Patience', 'Parents', 'Charity'..."
            className="w-full pl-16 pr-6 py-5 bg-white rounded-3xl border-2 border-emerald-100 focus:outline-none focus:border-emerald-500 transition-all shadow-xl text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Search'}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
          <p className="text-emerald-600 font-medium text-lg">Searching the archives...</p>
        </div>
      ) : results ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quran Result */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 text-emerald-700 border-b border-emerald-50 pb-4">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-xl font-bold">Quranic Verse</h2>
              <span className="ml-auto text-xs font-bold bg-emerald-50 px-3 py-1 rounded-full">{results.quran.ref}</span>
            </div>
            <div className="space-y-6">
              <p className="text-3xl text-right font-serif leading-relaxed text-emerald-950" dir="rtl">
                {results.quran.arabic}
              </p>
              <p className="text-xl text-right font-serif leading-relaxed text-emerald-800 border-t border-emerald-50 pt-4" dir="rtl">
                {results.quran.urdu}
              </p>
            </div>
          </motion.div>

          {/* Hadith Result */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 text-emerald-700 border-b border-emerald-50 pb-4">
              <Book className="w-6 h-6" />
              <h2 className="text-xl font-bold">Hadith</h2>
              <span className="ml-auto text-xs font-bold bg-emerald-50 px-3 py-1 rounded-full">{results.hadith.ref}</span>
            </div>
            <div className="space-y-6">
              <p className="text-3xl text-right font-serif leading-relaxed text-emerald-950" dir="rtl">
                {results.hadith.arabic}
              </p>
              <p className="text-xl text-right font-serif leading-relaxed text-emerald-800 border-t border-emerald-50 pt-4" dir="rtl">
                {results.hadith.urdu}
              </p>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-20 opacity-30">
          <Search className="w-20 h-20 mx-auto mb-4" />
          <p className="text-xl">Enter a keyword to start searching</p>
        </div>
      )}
    </div>
  );
}
