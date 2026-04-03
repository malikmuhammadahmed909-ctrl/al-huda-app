import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Moon, Sun, Bell, Shield, Languages } from 'lucide-react';
import { motion } from 'motion/react';

const languages = [
  { id: 'ur', name: 'اردو (Urdu)', flag: '🇵🇰' },
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' },
  { id: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { id: 'bn', name: 'বাংলা (Bengali)', flag: '🇧🇩' },
  { id: 'tr', name: 'Türkçe (Turkish)', flag: '🇹🇷' },
];

export default function Settings() {
  const [selectedLang, setSelectedLang] = useState('ur');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-emerald-900">Settings</h1>
        <p className="text-emerald-700/70">Customize your Al-Huda experience.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Language Selection */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 space-y-6">
            <div className="flex items-center gap-3 border-b border-emerald-50 pb-4">
              <Globe className="w-6 h-6 text-emerald-500" />
              <h2 className="text-xl font-bold text-emerald-900">App Language</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.id)}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                    selectedLang === lang.id 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' 
                      : 'bg-stone-50 border-emerald-50 text-emerald-900 hover:border-emerald-200'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 space-y-6">
            <div className="flex items-center gap-3 border-b border-emerald-50 pb-4">
              <Shield className="w-6 h-6 text-emerald-500" />
              <h2 className="text-xl font-bold text-emerald-900">Privacy & Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                <div>
                  <p className="font-bold text-emerald-900">Prayer Notifications</p>
                  <p className="text-xs text-emerald-600/60">Get alerts for daily prayers</p>
                </div>
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-all relative ${notifications ? 'bg-emerald-500' : 'bg-stone-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                <div>
                  <p className="font-bold text-emerald-900">Dark Mode</p>
                  <p className="text-xs text-emerald-600/60">Easier on the eyes at night</p>
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? 'bg-emerald-500' : 'bg-stone-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Profile Summary */}
        <div className="space-y-6">
          <section className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
            <div className="w-20 h-20 bg-emerald-500 rounded-full mx-auto flex items-center justify-center text-3xl font-bold">
              A
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold">Al-Huda User</h3>
              <p className="text-emerald-300 text-sm">malikmuhammadahmed909@gmail.com</p>
            </div>
            <div className="pt-6 border-t border-emerald-800 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Language</span>
                <span>{languages.find(l => l.id === selectedLang)?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Status</span>
                <span className="text-emerald-400">Premium Active</span>
              </div>
            </div>
          </section>

          <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 text-center">
            <p className="text-xs text-emerald-600 font-medium uppercase tracking-widest mb-2">App Version</p>
            <p className="text-emerald-900 font-bold">v2.4.0-build.islamic</p>
          </div>
        </div>
      </div>
    </div>
  );
}
