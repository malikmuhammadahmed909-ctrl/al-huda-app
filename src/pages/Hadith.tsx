import React, { useState } from 'react';
import { hadithApi } from '@/src/services/api';
import { Search, Book, Loader2, Hash, Languages, CheckCircle2, AlertCircle, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function Hadith() {
  const [books] = useState(hadithApi.getBooks());
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [hadithNumber, setHadithNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const fetchHadith = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedBook || !hadithNumber) return;

    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Fetch Hadith number ${hadithNumber} from ${selectedBook.name}. Provide the Arabic text and its Urdu translation. Also include its authenticity (Sahih, Hasan, Da'if, etc.). Format as JSON: { "arabic": "...", "urdu": "...", "reference": "...", "authenticity": "..." }`,
        config: { responseMimeType: "application/json" }
      });
      
      const text = response.text;
      if (text) {
        const data = JSON.parse(text);
        setResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHadithByTopic = async (topic: string) => {
    if (!selectedBook) return;
    setLoading(true);
    setActiveTopic(topic);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Find a famous Hadith about "${topic}" from ${selectedBook.name}. Provide the Arabic text, Urdu translation, reference, and authenticity. Format as JSON: { "arabic": "...", "urdu": "...", "reference": "...", "authenticity": "..." }`,
        config: { responseMimeType: "application/json" }
      });
      
      const text = response.text;
      if (text) {
        const data = JSON.parse(text);
        setResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchHadithByTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Search for a Hadith related to "${searchQuery}". Provide the Arabic text, Urdu translation, reference, and authenticity. Format as JSON: { "arabic": "...", "urdu": "...", "reference": "...", "authenticity": "..." }`,
        config: { responseMimeType: "application/json" }
      });
      
      const text = response.text;
      if (text) {
        const data = JSON.parse(text);
        setResult(data);
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
        <h1 className="text-4xl font-bold text-emerald-900">Hadith Collections</h1>
        <p className="text-emerald-700/70">Explore the sayings of Prophet Muhammad (PBUH) with authenticity indicators.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 space-y-4">
            <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
              <Book className="w-5 h-5 text-emerald-500" />
              Select Book
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {books.map(book => (
                <button
                  key={book.id}
                  onClick={() => {
                    setSelectedBook(book);
                    setActiveTopic(null);
                    setResult(null);
                  }}
                  className={`p-3 rounded-xl text-left text-sm font-medium transition-all ${
                    selectedBook?.id === book.id 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'bg-stone-50 text-emerald-900 border border-emerald-50 hover:border-emerald-200'
                  }`}
                >
                  {book.name}
                </button>
              ))}
            </div>
          </section>

          {selectedBook && (
            <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 space-y-4"
            >
              <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
                <Filter className="w-5 h-5 text-emerald-500" />
                Browse Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {selectedBook.topics.map((topic: string) => (
                  <button
                    key={topic}
                    onClick={() => fetchHadithByTopic(topic)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTopic === topic 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          <section className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 space-y-4">
            <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
              <Hash className="w-5 h-5 text-emerald-500" />
              Search by Number
            </h2>
            <form onSubmit={fetchHadith} className="space-y-4">
              <input 
                type="number"
                placeholder="e.g. 1"
                className="w-full p-3 bg-stone-50 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={hadithNumber}
                onChange={(e) => setHadithNumber(e.target.value)}
              />
              <button 
                disabled={loading || !selectedBook || !hadithNumber}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                Fetch Hadith
              </button>
            </form>
          </section>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <form onSubmit={searchHadithByTopic} className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 w-5 h-5 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                type="text"
                placeholder="Search for any topic (e.g. Prayer, Charity, Manners...)"
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {loading ? (
            <div className="bg-white rounded-3xl p-20 flex flex-col items-center justify-center gap-4 border border-emerald-50 shadow-sm">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
              <p className="text-emerald-600 font-medium">Searching collections...</p>
            </div>
          ) : result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm space-y-8"
            >
              <div className="flex justify-between items-center border-b border-emerald-50 pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-4 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold">
                    {result.reference}
                  </span>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                    result.authenticity?.toLowerCase().includes('sahih') 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {result.authenticity?.toLowerCase().includes('sahih') ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {result.authenticity}
                  </div>
                </div>
                <Languages className="text-emerald-200" />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">Arabic Text</h4>
                  <p className="text-3xl text-right font-serif leading-relaxed text-emerald-950" dir="rtl">
                    {result.arabic}
                  </p>
                </div>

                <div className="pt-8 border-t border-emerald-50">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">Urdu Translation</h4>
                  <p className="text-2xl text-right font-serif leading-relaxed text-emerald-800 font-urdu" dir="rtl">
                    {result.urdu}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-emerald-50/50 rounded-3xl p-20 flex flex-col items-center justify-center gap-4 border border-dashed border-emerald-200 text-center">
              <Book className="w-12 h-12 text-emerald-200" />
              <div className="space-y-1">
                <p className="text-emerald-900 font-bold text-lg">No Hadith Selected</p>
                <p className="text-emerald-600/60 max-w-xs">Select a book and number or browse by topic to see results here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
