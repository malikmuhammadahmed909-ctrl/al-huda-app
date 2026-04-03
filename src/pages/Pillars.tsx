import React, { useState } from 'react';
import { ShieldCheck, Heart, Star, Moon, Sun, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const pillars = [
  {
    id: 'shahada',
    name: 'Shahada',
    arabic: 'الشهادة',
    translation: 'Faith',
    icon: Heart,
    color: 'bg-rose-500',
    description: 'The declaration of faith: "There is no god but Allah, and Muhammad is the messenger of Allah."',
    details: 'It is the foundation of Islam. A person becomes a Muslim by reciting this statement with sincerity and conviction.'
  },
  {
    id: 'salah',
    name: 'Salah',
    arabic: 'الصلاة',
    translation: 'Prayer',
    icon: Sun,
    color: 'bg-amber-500',
    description: 'Performing the five daily prayers at their prescribed times.',
    details: 'Fajr, Dhuhr, Asr, Maghrib, and Isha. It is a direct link between the worshipper and Allah.'
  },
  {
    id: 'zakat',
    name: 'Zakat',
    arabic: 'الزكاة',
    translation: 'Almsgiving',
    icon: Star,
    color: 'bg-emerald-500',
    description: 'Giving a portion of one\'s wealth to those in need.',
    details: 'Typically 2.5% of accumulated wealth annually. It purifies wealth and promotes social justice.'
  },
  {
    id: 'sawm',
    name: 'Sawm',
    arabic: 'الصوم',
    translation: 'Fasting',
    icon: Moon,
    color: 'bg-indigo-500',
    description: 'Fasting during the holy month of Ramadan.',
    details: 'Abstaining from food, drink, and other physical needs from dawn until sunset to develop self-control and empathy.'
  },
  {
    id: 'hajj',
    name: 'Hajj',
    arabic: 'الحج',
    translation: 'Pilgrimage',
    icon: ShieldCheck,
    color: 'bg-slate-700',
    description: 'The pilgrimage to the holy city of Makkah.',
    details: 'Required once in a lifetime for those who are physically and financially able. It is the ultimate spiritual journey.'
  }
];

export default function Pillars() {
  const [activePillar, setActivePillar] = useState(pillars[0]);

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-emerald-900">The Five Pillars of Islam</h1>
        <p className="text-emerald-700/70">The core beliefs and practices that shape a Muslim's life.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            onClick={() => setActivePillar(pillar)}
            className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
              activePillar.id === pillar.id 
                ? 'bg-white border-emerald-500 shadow-lg scale-105' 
                : 'bg-white/50 border-emerald-100 hover:bg-white'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${pillar.color}`}>
              <pillar.icon className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">{pillar.translation}</p>
              <p className="font-bold text-emerald-900">{pillar.name}</p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePillar.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-emerald-100 grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-5xl font-serif text-emerald-900">{activePillar.arabic}</h2>
              <h3 className="text-3xl font-bold text-emerald-700">{activePillar.name}</h3>
            </div>
            <p className="text-xl text-emerald-900/80 leading-relaxed">
              {activePillar.description}
            </p>
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h4 className="font-bold text-emerald-900 mb-2">Key Significance</h4>
              <p className="text-emerald-700">{activePillar.details}</p>
            </div>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={`https://picsum.photos/seed/${activePillar.id}/800/800`} 
              alt={activePillar.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="text-sm font-medium opacity-80">Pillar {pillars.indexOf(activePillar) + 1}</p>
                <p className="text-2xl font-bold">{activePillar.translation}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
