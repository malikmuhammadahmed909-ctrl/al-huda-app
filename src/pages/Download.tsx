import React from 'react';
import { Download, Smartphone, Laptop, Share2, ExternalLink, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function DownloadPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <header className="text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl mb-6">
          <Download className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-emerald-900">Download Al-Huda Hub</h1>
        <p className="text-emerald-700/70 text-lg">Take your spiritual journey with you, anywhere.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mobile Installation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <Smartphone className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-900">Mobile App</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-emerald-800">You can install Al-Huda as a <span className="font-bold">Progressive Web App (PWA)</span> on your phone:</p>
            <ol className="space-y-3 text-emerald-700 list-decimal list-inside">
              <li>Open this website in your mobile browser (Chrome or Safari).</li>
              <li>Tap the <span className="font-bold">Share</span> button (iOS) or <span className="font-bold">Menu</span> (Android).</li>
              <li>Select <span className="font-bold">"Add to Home Screen"</span>.</li>
              <li>The Al-Huda icon will appear on your home screen like a native app.</li>
            </ol>
          </div>
        </motion.div>

        {/* Desktop Installation */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <Laptop className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-900">Desktop App</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-emerald-800">Install Al-Huda directly on your computer for quick access:</p>
            <ol className="space-y-3 text-emerald-700 list-decimal list-inside">
              <li>Look at the address bar in your browser (Chrome/Edge).</li>
              <li>Click the <span className="font-bold">Install</span> icon (usually a computer with a down arrow).</li>
              <li>Confirm the installation.</li>
              <li>Launch Al-Huda from your Applications or Desktop.</li>
            </ol>
          </div>
        </motion.div>
      </div>

      {/* APK Explanation */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
            <Smartphone className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-900">Regarding APK Files</h2>
        </div>
        <div className="space-y-4 text-emerald-800">
          <p>
            Since Al-Huda is built as a <span className="font-bold">Progressive Web App (PWA)</span>, you don't actually need an APK file to use it like an app. 
            The "Add to Home Screen" method provides the same experience as an APK:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>It works offline.</li>
            <li>It has its own icon on your home screen.</li>
            <li>It launches without the browser address bar.</li>
            <li>It takes up much less storage than a traditional APK.</li>
          </ul>
          <p className="text-sm bg-amber-50 p-4 rounded-xl border border-amber-100">
            <span className="font-bold">Note:</span> If you specifically need a native APK for the Google Play Store, you can export the source code (using the Export button in AI Studio) and wrap it using <span className="font-bold">Capacitor</span> or <span className="font-bold">Cordova</span>.
          </p>
        </div>
      </section>

      {/* Developer Info */}
      <section className="bg-emerald-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Info className="w-40 h-40" />
        </div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-bold">Export for Developers</h2>
          <p className="text-emerald-100/80 max-w-2xl text-lg">
            If you want to download the source code of this application to host it yourself or modify it:
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-emerald-800/50 p-4 rounded-2xl border border-emerald-700 flex-1 min-w-[250px]">
              <h3 className="font-bold mb-2">Via AI Studio</h3>
              <p className="text-sm opacity-70">Click on the <span className="font-bold">Settings</span> menu in the top right of the AI Studio interface and select <span className="font-bold">"Export to GitHub"</span> or <span className="font-bold">"Download ZIP"</span>.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center gap-6 text-emerald-400">
        <button className="flex items-center gap-2 hover:text-emerald-600 transition-colors">
          <Share2 className="w-5 h-5" />
          Share App
        </button>
        <button className="flex items-center gap-2 hover:text-emerald-600 transition-colors">
          <ExternalLink className="w-5 h-5" />
          Visit Website
        </button>
      </div>
    </div>
  );
}
