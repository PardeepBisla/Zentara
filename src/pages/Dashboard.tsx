import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Sparkles, 
  Image as ImageIcon, 
  ChevronRight, 
  Loader2, 
  CheckCircle2,
  Diamond,
  LayoutDashboard,
  History,
  Settings,
  LogOut
} from 'lucide-react';
import { uploadGeneratedImage } from '../lib/firebase-storage';
import { saveGenerationAndDeductCredit } from '../lib/firestore';
import { cn } from '../lib/utils';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

// Style options for the background
const STYLE_OPTIONS = [
  { id: 'obsidian-marble', name: 'Dark Obsidian Marble', description: 'Deep black stone with subtle gold veins' },
  { id: 'silk-velvet', name: 'Silk Velvet', description: 'Soft, luxurious draped fabric in charcoal' },
  { id: 'floating-pedestal', name: 'Floating Pedestal', description: 'Minimalist geometric stone in a void' },
  { id: 'organic-elements', name: 'Organic Elements', description: 'Raw minerals and natural textures' }
];

export default function Dashboard() {
  const [selectedStyle, setSelectedStyle] = useState(STYLE_OPTIONS[0].id);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState(10); // Mock credits for UI
  const [hasUserKey, setHasUserKey] = useState(false);

  React.useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasUserKey(selected);
      }
    };
    checkApiKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasUserKey(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRawImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = async () => {
    if (!rawImage) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // 1. Call the API route
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image: rawImage, 
          style: STYLE_OPTIONS.find(s => s.id === selectedStyle)?.name 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // If the API key is invalid or not found, prompt to re-select
        if (data.isAuthError || response.status === 401) {
          setHasUserKey(false);
          throw new Error("The API key you provided is invalid or not authorized for 4K generation. Please ensure billing is enabled on your Google Cloud project or use standard quality.");
        }
        throw new Error(data.error || "Generation failed");
      }
      
      const base64Result = `data:image/png;base64,${data.image}`;
      setGeneratedImage(base64Result);
      
      if (data.warning) {
        setError(data.warning); // Show warning as a non-fatal error
      }
      
      // 2. Upload to Firebase Storage & Update Firestore (Mock User ID for now)
      // In a real app, you'd get the UID from Firebase Auth
      const mockUserId = "user_123"; 
      const downloadUrl = await uploadGeneratedImage(data.image, mockUserId);
      await saveGenerationAndDeductCredit(mockUserId, downloadUrl);
      
      setCredits(prev => prev - 1);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred");
      // If it's an auth error, we already setHasUserKey(false) in the try block
    } finally {
      setIsGenerating(false);
    }
  };

  const clearErrorAndReset = () => {
    setError(null);
    setHasUserKey(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-gold-500/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl z-50 hidden lg:flex flex-col">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 obsidian-gradient rounded-full flex items-center justify-center text-gold-400 border border-gold-500/20">
            <Diamond size={16} strokeWidth={1.5} />
          </div>
          <span className="text-xl font-serif font-bold tracking-[0.2em] uppercase">Zentara</span>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Generate', active: true },
            { icon: History, label: 'History' },
            { icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button 
              key={item.label}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                item.active ? "bg-white/5 text-gold-400" : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-6 border-t border-white/5">
          <div className="glass-card p-4 rounded-2xl mb-6">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Available Credits</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">{credits}</span>
              <Sparkles size={16} className="text-gold-500" />
            </div>
          </div>
          <button className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors text-sm">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-8 lg:p-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tighter bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] bg-clip-text text-transparent">
            Synthesize Excellence
          </h1>
          <p className="text-slate-400 font-light">Transform your raw captures into editorial-grade masterpieces.</p>
        </header>

        <div className="grid xl:grid-cols-2 gap-12">
          {/* Left Column: Controls */}
          <div className="space-y-10">
            {/* Upload Zone */}
            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500 mb-6">1. Source Capture</h3>
              <div 
                className={cn(
                  "relative aspect-video rounded-[2rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center overflow-hidden",
                  rawImage ? "border-gold-500/50" : "border-white/10 hover:border-gold-500/30 bg-white/[0.02]"
                )}
              >
                {rawImage ? (
                  <>
                    <img src={rawImage} className="w-full h-full object-contain p-4" alt="Raw" />
                    <button 
                      onClick={() => setRawImage(null)}
                      className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full hover:bg-black/80 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform">
                      <Upload size={24} />
                    </div>
                    <span className="text-sm text-slate-400 font-light">Drag & drop or <span className="text-gold-400">browse</span></span>
                    <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                  </label>
                )}
              </div>
            </section>

            {/* Style Selector */}
            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500 mb-6">2. Environment Style</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {STYLE_OPTIONS.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={cn(
                      "p-6 rounded-2xl border text-left transition-all duration-300",
                      selectedStyle === style.id 
                        ? "border-gold-500/50 bg-gold-500/5 shadow-[0_0_20px_rgba(184,141,41,0.1)]" 
                        : "border-white/5 bg-white/[0.02] hover:border-white/10"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-serif font-bold text-lg tracking-tight">{style.name}</span>
                      {selectedStyle === style.id && <CheckCircle2 size={16} className="text-gold-500" />}
                    </div>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">{style.description}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Action Button */}
            <div className="space-y-4">
              {hasUserKey ? (
                <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Diamond size={16} className="text-gold-500 animate-pulse" />
                    <p className="text-[10px] text-gold-400 uppercase tracking-widest font-bold">
                      4K Masterpiece Mode Active
                    </p>
                  </div>
                  <button 
                    onClick={() => setHasUserKey(false)}
                    className="text-[10px] text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-gold-500/5 border border-gold-500/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Diamond size={16} className="text-gold-500" />
                    <p className="text-[10px] text-gold-400 uppercase tracking-widest font-bold">
                      Standard Quality Active
                    </p>
                  </div>
                  <button 
                    onClick={handleSelectKey}
                    className="text-[10px] text-white bg-gold-500/20 px-3 py-1 rounded-full hover:bg-gold-500/30 transition-colors uppercase tracking-widest font-bold"
                  >
                    Upgrade to 4K
                  </button>
                </div>
              )}
              
              <button
                onClick={generateImage}
                disabled={!rawImage || isGenerating}
                className={cn(
                  "w-full py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm transition-all duration-500 flex items-center justify-center gap-4",
                  !rawImage || isGenerating
                    ? "bg-white/5 text-slate-500 cursor-not-allowed"
                    : "gold-gradient text-white shadow-[0_20px_40px_-10px_rgba(184,141,41,0.3)] hover:scale-[1.02]"
                )}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Synthesizing light rays...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    {hasUserKey ? "Generate 4K Masterpiece" : "Generate Luxury Image"}
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <div className="space-y-3">
                <p className="text-red-400 text-sm text-center font-light leading-relaxed">{error}</p>
                {error.includes("API key") && (
                  <button 
                    onClick={clearErrorAndReset}
                    className="w-full py-2 text-[10px] text-slate-400 hover:text-white transition-colors uppercase tracking-widest border border-white/5 rounded-full"
                  >
                    Clear Key & Use Standard Quality
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Result Gallery */}
          <div className="relative">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500 mb-6">Generated Masterpiece</h3>
            <div className="aspect-square rounded-[3rem] border border-white/5 obsidian-gradient overflow-hidden relative group">
              <AnimatePresence mode="wait">
                {generatedImage ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full"
                  >
                    <img src={generatedImage} className="w-full h-full object-cover" alt="Generated" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                      <button className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                        Download 4K
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full flex flex-col items-center justify-center p-12 text-center"
                  >
                    <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center text-slate-700 mb-6">
                      <ImageIcon size={40} strokeWidth={1} />
                    </div>
                    <p className="text-slate-500 font-light max-w-xs">
                      Your high-fidelity generation will appear here once synthesized.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {isGenerating && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-12 text-center">
                  <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-2 border-gold-500/20 rounded-full" />
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-t-2 border-gold-500 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="text-gold-500 animate-pulse" size={32} />
                    </div>
                  </div>
                  <p className="text-gold-400 font-serif italic text-xl mb-2">Refining facets...</p>
                  <p className="text-slate-400 text-xs tracking-widest uppercase">
                    {hasUserKey ? "Nano Banana Engine v3.1 (4K)" : "Nano Banana Engine v2.5"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const X = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
