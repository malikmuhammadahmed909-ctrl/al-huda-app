import React, { useState } from 'react';
import { History, User, Sword, Loader2, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const categories = [
  { id: 'Ambiya', name: 'Stories of Prophets', icon: History, color: 'bg-blue-500' },
  { id: 'Sahaba', name: 'Stories of Sahaba', icon: User, color: 'bg-emerald-500' },
  { id: 'Ghazwat', name: 'Battles (Ghazwat)', icon: Sword, color: 'bg-rose-500' },
];

export default function Waqiat() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState<any[]>([]);
  const [selectedStory, setSelectedStory] = useState<any | null>(null);

  const fetchStories = async (category: string) => {
    setLoading(true);
    setActiveCategory(category);
    setSelectedStory(null);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `List 5 famous ${category} in Islam. Provide a title and a short summary for each. Format as JSON: { "stories": [{ "title": "...", "summary": "..." }] }`,
        config: { responseMimeType: "application/json" }
      });
      const data = JSON.parse(response.text || '{}');
      setStories(data.stories || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFullStory = async (title: string) => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Write a detailed story of "${title}" in Urdu and English. 
        IMPORTANT: 
        1. Include a detailed "Pas-e-manzar" (Background/Historical Context) in both languages.
        2. Explain the "Behind the Scenes" (Hidden wisdom or events leading up to the main story).
        3. Provide the main narrative in detail.
        4. Include 5 key lessons and wisdom.
        Format as JSON: { 
          "title": "...", 
          "urdu_background": "...", 
          "english_background": "...", 
          "urdu_behind_scenes": "...",
          "english_behind_scenes": "...",
          "urdu_story": "...", 
          "english_story": "...", 
          "lessons": ["...", "..."] 
        }`,
        config: { responseMimeType: "application/json" }
      });
      const data = JSON.parse(response.text || '{}');
      setSelectedStory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-emerald-900">Islamic Waqiat</h1>
        <p className="text-emerald-700/70">Inspiring stories of Prophets, Companions, and historical events.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => fetchStories(cat.id)}
            className={`p-6 rounded-3xl border transition-all flex items-center gap-4 ${
              activeCategory === cat.id 
                ? 'bg-white border-emerald-500 shadow-lg' 
                : 'bg-white/50 border-emerald-100 hover:bg-white'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${cat.color}`}>
              <cat.icon className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-bold text-emerald-900">{cat.name}</p>
              <p className="text-xs text-emerald-600/60">Explore history</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Story List */}
        <div className="lg:col-span-1 space-y-4">
          {loading && !selectedStory ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
          ) : stories.length > 0 ? (
            <div className="space-y-3">
              {stories.map((story, idx) => (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={story.title}
                  onClick={() => fetchFullStory(story.title)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedStory?.title === story.title 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' 
                      : 'bg-white border-emerald-100 text-emerald-900 hover:border-emerald-300'
                  }`}
                >
                  <h3 className="font-bold">{story.title}</h3>
                  <p className={`text-xs mt-1 line-clamp-1 ${selectedStory?.title === story.title ? 'text-emerald-100' : 'text-emerald-500'}`}>
                    {story.summary}
                  </p>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="bg-emerald-50/50 rounded-3xl p-10 border border-dashed border-emerald-200 text-center">
              <BookOpen className="w-10 h-10 text-emerald-200 mx-auto mb-2" />
              <p className="text-emerald-600 text-sm">Select a category to see stories</p>
            </div>
          )}
        </div>

        {/* Story Content */}
        <div className="lg:col-span-2">
          {loading && selectedStory ? (
            <div className="bg-white rounded-3xl p-20 flex flex-col items-center justify-center gap-4 border border-emerald-50 shadow-sm">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
              <p className="text-emerald-600 font-medium">Fetching full story...</p>
            </div>
          ) : selectedStory ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm space-y-8"
            >
              <h2 className="text-3xl font-bold text-emerald-900 border-b border-emerald-50 pb-4">
                {selectedStory.title}
              </h2>

              <div className="space-y-8">
                {/* Background Section */}
                <div className="p-6 bg-stone-50 rounded-3xl border border-emerald-50 space-y-6">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <History className="w-5 h-5" />
                    <h3 className="font-bold uppercase tracking-widest text-xs">Pas-e-manzar (Background)</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-2xl text-right font-serif leading-relaxed text-emerald-950 font-urdu" dir="rtl">
                      {selectedStory.urdu_background}
                    </p>
                    <p className="text-sm text-emerald-700 italic border-l-2 border-emerald-200 pl-4">
                      {selectedStory.english_background}
                    </p>
                  </div>
                </div>

                {/* Behind the Scenes Section */}
                <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 space-y-6">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="font-bold uppercase tracking-widest text-xs">Behind the Scenes (Hidden Wisdom)</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-2xl text-right font-serif leading-relaxed text-emerald-950 font-urdu" dir="rtl">
                      {selectedStory.urdu_behind_scenes}
                    </p>
                    <p className="text-sm text-emerald-700 italic border-l-2 border-emerald-200 pl-4">
                      {selectedStory.english_behind_scenes}
                    </p>
                  </div>
                </div>

                {/* Main Story Section */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Urdu Narrative</h4>
                    <p className="text-2xl text-right font-serif leading-relaxed text-emerald-950 font-urdu" dir="rtl">
                      {selectedStory.urdu_story}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-emerald-50 space-y-4">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">English Narrative</h4>
                    <p className="text-lg text-emerald-800 leading-relaxed">
                      {selectedStory.english_story}
                    </p>
                  </div>
                </div>

                {selectedStory.lessons && (
                  <div className="pt-8 border-t border-emerald-50">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">Lessons & Wisdom</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedStory.lessons.map((lesson: string, i: number) => (
                        <div key={i} className="flex gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs shrink-0">
                            {i + 1}
                          </div>
                          <p className="text-sm text-emerald-800">{lesson}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-emerald-50/50 rounded-3xl p-20 flex flex-col items-center justify-center gap-4 border border-dashed border-emerald-200 text-center">
              <History className="w-12 h-12 text-emerald-200" />
              <div className="space-y-1">
                <p className="text-emerald-900 font-bold text-lg">Select a Story</p>
                <p className="text-emerald-600/60 max-w-xs">Pick a story from the list to read the full account in Urdu and English.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
