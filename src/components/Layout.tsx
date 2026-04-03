import React from 'react';
import { Book, BookOpen, Search, Info, ShieldCheck, Menu, X, MessageSquare, Download, History, Settings as SettingsIcon, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { name: 'Home', path: '#hero', icon: Sparkles },
  { name: 'Quran', path: '#quran', icon: BookOpen },
  { name: 'Hadith', path: '#hadith', icon: Book },
  { name: 'AI Assistant', path: '#assistant', icon: MessageSquare },
  { name: 'Waqiat', path: '#waqiat', icon: History },
  { name: 'Search', path: '#search', icon: Search },
  { name: '5 Pillars', path: '#pillars', icon: ShieldCheck },
  { name: 'Fiqh Steps', path: '#fiqh', icon: Info },
  { name: 'Settings', path: '#settings', icon: SettingsIcon },
  { name: 'Download', path: '#download', icon: Download },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('#hero');

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.path.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-emerald-900 text-white flex-col sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-emerald-100">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-serif">A</span>
            </div>
            Al-Huda
          </h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                activeSection === item.path 
                  ? "bg-emerald-800 text-white shadow-lg" 
                  : "text-emerald-100/70 hover:bg-emerald-800/50 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-transform duration-200",
                activeSection === item.path ? "scale-110" : "group-hover:scale-110"
              )} />
              <span className="font-medium text-sm">{item.name}</span>
            </a>
          ))}
        </nav>
        <div className="p-6 border-t border-emerald-800">
          <p className="text-xs text-emerald-100/40">© 2026 Al-Huda Islamic Hub</p>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden bg-emerald-900 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center text-sm">A</div>
          Al-Huda
        </h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-40 bg-emerald-900 pt-20 px-6 space-y-2 overflow-y-auto"
          >
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl text-lg",
                  activeSection === item.path ? "bg-emerald-800" : ""
                )}
              >
                <item.icon />
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
