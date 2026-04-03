import React from 'react';
import Quran from './Quran';
import Hadith from './Hadith';
import Assistant from './Assistant';
import Waqiat from './Waqiat';
import Search from './Search';
import Pillars from './Pillars';
import Fiqh from './Fiqh';
import Settings from './Settings';
import DownloadPage from './Download';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Heart, Shield, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center space-y-12 relative overflow-hidden px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-emerald-100/50" />
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/islamic-art.png")' }} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100 shadow-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Welcome to Al-Huda Hub</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-bold text-emerald-900 tracking-tighter leading-none">
            Spiritual <span className="text-emerald-600">Guidance</span> <br />
            at your <span className="italic font-serif">fingertips</span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-700/80 max-w-2xl mx-auto leading-relaxed font-medium">
            A comprehensive digital sanctuary for the modern Muslim. 
            Explore the Quran, authentic Hadith, and the rich history of Islam in one seamless experience.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a href="#quran" className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-bold shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95">
            Begin Journey
          </a>
          <a href="#assistant" className="px-10 py-5 bg-white text-emerald-900 rounded-2xl font-bold border border-emerald-100 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md active:scale-95">
            Ask Al-Huda AI
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16">
          {[
            { icon: Heart, label: 'Authentic', sub: 'Verified Sources' },
            { icon: Shield, label: 'Secure', sub: 'Privacy First' },
            { icon: BookOpen, label: 'Detailed', sub: 'Deep Insights' },
            { icon: Sparkles, label: 'AI Powered', sub: 'Smart Search' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-center space-y-2 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto text-emerald-600 mb-2 shadow-sm group-hover:shadow-md group-hover:bg-emerald-50 transition-all">
                <item.icon className="w-6 h-6" />
              </div>
              <p className="font-bold text-emerald-900 text-base">{item.label}</p>
              <p className="text-[10px] text-emerald-600/60 uppercase tracking-widest font-bold">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-emerald-300 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Scroll to Explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Intro Context Section */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold text-emerald-900">Your Spiritual Gateway</h2>
          <p className="text-lg text-emerald-700/70 leading-relaxed">
            Al-Huda Hub is more than just an app; it's a companion for your daily life. 
            Whether you're looking for a specific Hadith, need to understand a Fiqh ruling, 
            or want to immerse yourself in the inspiring stories of the Prophets, 
            everything is laid out for you in one continuous, easy-to-navigate journey.
          </p>
        </motion.div>
      </section>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        <section id="quran" className="scroll-mt-24">
          <Quran />
        </section>

        <section id="hadith" className="scroll-mt-24">
          <Hadith />
        </section>

        <section id="assistant" className="scroll-mt-24">
          <Assistant />
        </section>

        <section id="waqiat" className="scroll-mt-24">
          <Waqiat />
        </section>

        <section id="search" className="scroll-mt-24">
          <Search />
        </section>

        <section id="pillars" className="scroll-mt-24">
          <Pillars />
        </section>

        <section id="fiqh" className="scroll-mt-24">
          <Fiqh />
        </section>

        <section id="settings" className="scroll-mt-24">
          <Settings />
        </section>

        <section id="download" className="scroll-mt-24">
          <DownloadPage />
        </section>
      </div>
    </div>
  );
}
