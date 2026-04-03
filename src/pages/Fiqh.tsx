import React, { useState } from 'react';
import { Info, CheckCircle2, ChevronRight, BookOpen, Users, Search, Loader2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type FiqhSchool = 'Hanafi' | 'Shafi\'i' | 'Maliki' | 'Hanbali';

const fiqhData: Record<string, { title: string, steps: any[] }> = {
  salah: {
    title: 'Salah (Prayer)',
    steps: [
      {
        action: 'Niyyah (Intention)',
        hanafi: 'Must be made in the heart; verbal is better. No specific time gap required between Niyyah and Takbir.',
        shafii: 'Must be made exactly at the moment of saying "Allahu Akbar".',
        maliki: 'Intention must be present at the start of the prayer.',
        hanbali: 'Can be made slightly before the Takbir.'
      },
      {
        action: 'Takbiratul Ihram',
        hanafi: 'Raise hands to earlobes. Thumbs touch earlobes.',
        shafii: 'Raise hands to shoulder level. Palms face Qibla.',
        maliki: 'Raise hands to shoulder level or ears.',
        hanbali: 'Raise hands to shoulder level or ears.'
      },
      {
        action: 'Hand Placement',
        hanafi: 'Below the navel. Right hand over left, grasping the wrist.',
        shafii: 'Above the navel, below the chest. Slightly to the left.',
        maliki: 'Hands at the sides (Sadl) is common, though folding (Qabd) is also practiced.',
        hanbali: 'Below the navel or on the chest.'
      },
      {
        action: 'Recitation of Surah Fatiha',
        hanafi: 'Imam recites for the follower in loud prayers. Follower remains silent.',
        shafii: 'Follower must recite Fatiha even if the Imam is reciting loudly.',
        maliki: 'Follower remains silent during loud recitation, recites during silent ones.',
        hanbali: 'Follower recites during pauses or silent prayers.'
      }
    ]
  },
  wudu: {
    title: 'Wudu (Ablution)',
    steps: [
      {
        action: 'Niyyah',
        hanafi: 'Sunnah (recommended), not a Fard (obligation) for the validity of Wudu.',
        shafii: 'Fard (Obligatory). Wudu is invalid without it.',
        maliki: 'Fard (Obligatory).',
        hanbali: 'Fard (Obligatory).'
      },
      {
        action: 'Order (Tartib)',
        hanafi: 'Sunnah. Wudu is valid even if order is changed.',
        shafii: 'Fard. Must follow the Quranic order.',
        maliki: 'Sunnah.',
        hanbali: 'Fard.'
      },
      {
        action: 'Wiping the Head (Masah)',
        hanafi: 'Wiping a quarter of the head is mandatory.',
        shafii: 'Wiping even a few hairs is sufficient.',
        maliki: 'Wiping the entire head is mandatory.',
        hanbali: 'Wiping the entire head including ears is mandatory.'
      }
    ]
  },
  zakat: {
    title: 'Zakat (Almsgiving)',
    steps: [
      {
        action: 'Nisab on Gold',
        hanafi: '7.5 Tolas (approx 87.48g).',
        shafii: '20 Mithqals (approx 85g).',
        maliki: '20 Mithqals (approx 85g).',
        hanbali: '20 Mithqals (approx 85g).'
      },
      {
        action: 'Zakat on Jewelry',
        hanafi: 'Obligatory on all gold/silver jewelry regardless of use.',
        shafii: 'Not obligatory on jewelry intended for personal use.',
        maliki: 'Not obligatory on jewelry intended for personal use.',
        hanbali: 'Not obligatory on jewelry intended for personal use.'
      }
    ]
  },
  fasting: {
    title: 'Sawm (Fasting)',
    steps: [
      {
        action: 'Niyyah for Fasting',
        hanafi: 'Can be made until mid-morning for Ramadan fasts.',
        shafii: 'Must be made every night before dawn.',
        maliki: 'One intention at the start of Ramadan is sufficient for the whole month.',
        hanbali: 'Must be made every night before dawn.'
      },
      {
        action: 'Vomiting while Fasting',
        hanafi: 'Only breaks the fast if it is mouthful and intentional.',
        shafii: 'Intentional vomiting breaks the fast regardless of amount.',
        maliki: 'Intentional vomiting breaks the fast.',
        hanbali: 'Intentional vomiting breaks the fast.'
      }
    ]
  },
  hajj: {
    title: 'Hajj (Pilgrimage)',
    steps: [
      {
        action: 'Ihram',
        hanafi: 'Mandatory to wear Ihram before crossing the Miqat.',
        shafii: 'Mandatory to wear Ihram before crossing the Miqat.',
        maliki: 'Mandatory to wear Ihram before crossing the Miqat.',
        hanbali: 'Mandatory to wear Ihram before crossing the Miqat.'
      },
      {
        action: 'Wuquf at Arafat',
        hanafi: 'The core pillar of Hajj. Must stay until sunset.',
        shafii: 'Staying for any moment between noon and dawn is sufficient.',
        maliki: 'Must stay for a portion of the night.',
        hanbali: 'Staying for any moment between noon and dawn is sufficient.'
      }
    ]
  }
};

export default function Fiqh() {
  const [activeTab, setActiveTab] = useState('salah');
  const [selectedSchool, setSelectedSchool] = useState<FiqhSchool>('Hanafi');
  const [masailQuery, setMasailQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [masailResult, setMasailResult] = useState<any>(null);

  const schools: FiqhSchool[] = ['Hanafi', 'Shafi\'i', 'Maliki', 'Hanbali'];

  const searchMasail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!masailQuery) return;
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide the rulings (Masail) for the following issue in Islam: "${masailQuery}". Give the answer for all four major Fiqh schools (Hanafi, Shafi'i, Maliki, Hanbali) in Urdu and English. Format as JSON: { "issue": "...", "hanafi": "...", "shafii": "...", "maliki": "...", "hanbali": "..." }`,
        config: { responseMimeType: "application/json" }
      });
      const data = JSON.parse(response.text || '{}');
      setMasailResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-emerald-900">Fiqh & Masail</h1>
        <p className="text-emerald-700/70">Detailed steps of worship and legal rulings according to the four major Imams.</p>
      </header>

      {/* Masail Search */}
      <section className="bg-emerald-900 p-8 rounded-[40px] shadow-xl text-white space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-emerald-400" />
          <div>
            <h2 className="text-2xl font-bold">Ask a Masala (Issue)</h2>
            <p className="text-emerald-200/70 text-sm">Get rulings from all 4 Madhhabs instantly.</p>
          </div>
        </div>
        <form onSubmit={searchMasail} className="relative">
          <input 
            type="text"
            placeholder="e.g. Traveling prayer, Zakat on property, Wudu with makeup..."
            className="w-full pl-6 pr-32 py-4 bg-emerald-800/50 rounded-2xl border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg placeholder:text-emerald-400/50"
            value={masailQuery}
            onChange={(e) => setMasailQuery(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Ask'}
          </button>
        </form>

        <AnimatePresence>
          {masailResult && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {schools.map(school => (
                <div key={school} className="bg-emerald-800/40 p-5 rounded-2xl border border-emerald-700/50">
                  <h4 className="text-emerald-400 font-bold mb-2">{school} Ruling</h4>
                  <p className="text-sm leading-relaxed font-urdu text-right mb-2" dir="rtl">{masailResult[school.toLowerCase().replace("'", "")]}</p>
                  <p className="text-xs opacity-60 italic">Authentic legal perspective</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="flex flex-wrap gap-2">
        {Object.keys(fiqhData).map(key => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              activeTab === key 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-white text-emerald-700 border border-emerald-100'
            }`}
          >
            {fiqhData[key].title}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden">
        <div className="bg-emerald-900 p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-white">
            <Users className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold">Select Madhhab (School)</h2>
          </div>
          <div className="flex gap-2">
            {schools.map(school => (
              <button
                key={school}
                onClick={() => setSelectedSchool(school)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  selectedSchool === school 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-emerald-800 text-emerald-100 hover:bg-emerald-700'
                }`}
              >
                {school}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 space-y-8">
          {fiqhData[activeTab].steps.map((step, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={step.action} 
              className="flex gap-6 group"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 font-bold border-2 border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                {idx !== fiqhData[activeTab].steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-emerald-50 my-2" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <h3 className="text-xl font-bold text-emerald-900 mb-2">{step.action}</h3>
                <div className="p-5 bg-stone-50 rounded-2xl border border-emerald-50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-5">
                    <BookOpen className="w-12 h-12" />
                  </div>
                  <p className="text-emerald-800 leading-relaxed italic">
                    <span className="font-bold text-emerald-600 not-italic mr-2">[{selectedSchool}]</span>
                    {step[selectedSchool.toLowerCase().replace("'", "")]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-start gap-4">
        <Info className="w-6 h-6 text-emerald-500 shrink-0" />
        <div className="space-y-1">
          <p className="font-bold text-emerald-900">Note on Differences</p>
          <p className="text-sm text-emerald-700">
            Differences among the four Imams (Abu Hanifa, Shafi'i, Malik, and Ahmad ibn Hanbal) are considered a mercy and are based on their interpretations of the Quran and Sunnah. All four schools are valid paths in Sunni Islam.
          </p>
        </div>
      </div>
    </div>
  );
}
