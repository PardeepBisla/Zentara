import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './pages/Dashboard';
import { 
  Diamond, 
  Upload, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Zap, 
  Layers, 
  Maximize, 
  Palette,
  Menu,
  X
} from 'lucide-react';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { LuxuryCard, GoldButton } from './components/UI';
import { cn } from './lib/utils';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen selection:bg-gold-100 selection:text-gold-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-luxury-beige/60 backdrop-blur-xl border-b border-gold-100/30">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 obsidian-gradient rounded-full flex items-center justify-center text-gold-400 border border-gold-500/20">
              <Diamond size={20} strokeWidth={1.5} />
            </div>
            <span className="text-2xl font-serif font-bold tracking-[0.2em] uppercase">Zentara</span>
          </div>

          <div className="hidden md:flex items-center gap-12">
            {['Process', 'Gallery', 'Features', 'Pricing'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-gold-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <Link to="/dashboard">
              <GoldButton variant="obsidian" className="px-8 py-3 text-[10px]">
                Get Started
              </GoldButton>
            </Link>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-gold-100 overflow-hidden"
            >
              <div className="px-8 py-12 flex flex-col gap-8">
                {['Process', 'Gallery', 'Features', 'Pricing'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    className="text-2xl font-serif font-medium text-slate-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <GoldButton variant="primary" className="w-full">Get Started</GoldButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-56 pb-32 px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-gold-200/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-gold-100/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/40 border border-gold-200/40 text-gold-700 text-[10px] font-bold uppercase tracking-[0.3em] mb-10 backdrop-blur-sm">
              <Sparkles size={12} className="text-gold-500" />
              The New Standard in Jewelry Photography
            </div>
            <h1 className="text-7xl md:text-8xl font-serif font-bold leading-[0.95] mb-10 tracking-tighter">
              Studio Quality. <br />
              <span className="gold-text-gradient italic">Effortless</span> <br />
              Intelligence.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-12 max-w-lg font-light">
              Elevate your jewelry brand with AI-driven studio photography. 
              Cartier-level visuals, generated in seconds from your smartphone.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/dashboard">
                <GoldButton className="px-12 py-6">
                  Start Creating
                </GoldButton>
              </Link>
              <GoldButton variant="outline" className="px-12 py-6">
                View Showcase
              </GoldButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -15, 0]
            }}
            transition={{ 
              opacity: { duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gold-500/5 blur-3xl rounded-full" />
            <BeforeAfterSlider 
              beforeImage="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000"
              afterImage="/input_file_0.png"
              className="aspect-[4/5] md:aspect-square rounded-[3rem] shadow-2xl border border-white/20"
            />
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-white/30 backdrop-blur-sm border-y border-gold-100/50">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-16">
            Trusted by the world's most prestigious maisons
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-20 grayscale contrast-150">
            {['VOGUE', 'TIFFANY & CO.', 'CARTIER', 'BULGARI', 'PANDORA'].map(brand => (
              <span key={brand} className="text-3xl md:text-4xl font-serif font-black tracking-tighter italic">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="py-40 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 tracking-tighter">The Editorial Process</h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed">
                Our proprietary neural engine simulates the complex physics of light on precious metals and high-refractive gemstones.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-[1px] bg-gold-200 mb-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600">Excellence in every pixel</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Upload, title: "Capture", desc: "Snap a raw photo with any device. Our AI handles the rest." },
              { icon: Palette, title: "Compose", desc: "Select from curated architectural and organic studio environments." },
              { icon: Download, title: "Export", desc: "Download 4K assets optimized for high-conversion e-commerce." }
            ].map((step, i) => (
              <LuxuryCard key={i} delay={i * 0.1} className="group hover:-translate-y-2">
                <div className="w-14 h-14 obsidian-gradient rounded-2xl flex items-center justify-center text-gold-400 mb-10 group-hover:scale-110 transition-transform duration-500">
                  <step.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6 tracking-tighter">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{step.desc}</p>
              </LuxuryCard>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-40 obsidian-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gold-900/20 blur-[150px] rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 tracking-tighter">The Showcase</h2>
              <p className="text-slate-400 text-xl font-light leading-relaxed">
                Indistinguishable from traditional photography. Scalable for the modern digital era.
              </p>
            </div>
            <GoldButton variant="outline" className="border-white/10 text-white hover:bg-white/5">View Full Archive</GoldButton>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {[
              { 
                before: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
                after: "/input_file_1.png",
                label: "High Jewelry"
              },
              { 
                before: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
                after: "/input_file_0.png",
                label: "Bespoke Timepieces"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <BeforeAfterSlider 
                  beforeImage={item.before}
                  afterImage={item.after}
                  className="aspect-[16/10] rounded-[2.5rem] shadow-3xl border border-white/5"
                />
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-gold-500/50" />
                  <p className="text-gold-400 font-bold tracking-[0.3em] uppercase text-[10px]">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-40 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-16 tracking-tighter">Precision Engineering</h2>
              <div className="grid gap-12">
                {[
                  { icon: Sparkles, title: "Neural Ray-Tracing", desc: "Physically accurate light behavior on gold, silver, and platinum." },
                  { icon: Maximize, title: "4K Master Exports", desc: "Lossless quality for high-end print catalogs and large-scale billboards." },
                  { icon: Layers, title: "Batch Orchestration", desc: "Transform your entire seasonal collection in a single automated workflow." },
                  { icon: Palette, title: "Curated Environments", desc: "Dozens of hand-crafted studio settings designed by luxury art directors." }
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.15,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="flex gap-8 group"
                  >
                    <div className="shrink-0 w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-gold-600 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500">
                      <feature.icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-serif font-bold mb-3 tracking-tighter">{feature.title}</h4>
                      <p className="text-slate-500 leading-relaxed font-light">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="absolute -inset-10 bg-gold-200/20 blur-[100px] rounded-full" />
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-3xl border border-white/40 relative z-10">
                <img 
                  src="/input_file_0.png" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-40 bg-white/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 tracking-tighter">Investment</h2>
            
            <div className="flex items-center justify-center gap-6 mb-12">
              <span className={cn("text-[10px] font-bold uppercase tracking-widest", billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-400')}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-16 h-9 bg-slate-200 rounded-full relative p-1.5 transition-colors"
              >
                <motion.div 
                  animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                  className="w-6 h-6 bg-white rounded-full shadow-lg"
                />
              </button>
              <span className={cn("text-[10px] font-bold uppercase tracking-widest", billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-400')}>
                Annual <span className="text-gold-600 ml-2">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 items-stretch">
            {[
              { 
                name: "Atelier", 
                price: 1999, 
                features: ["25 Master Images / mo", "Standard Environments", "4K Resolution", "Email Concierge"] 
              },
              { 
                name: "Maison", 
                price: 5999, 
                featured: true, 
                features: ["120 Master Images / mo", "All Luxury Environments", "Batch Orchestration", "Priority Concierge", "Custom Presets"] 
              },
              { 
                name: "Empire", 
                price: 19999, 
                features: ["Unlimited Master Images", "Custom Neural Training", "Full API Access", "Dedicated Art Director", "24/7 Concierge"] 
              }
            ].map((plan, i) => (
              <LuxuryCard 
                key={i} 
                className={cn(
                  "relative flex flex-col p-12",
                  plan.featured ? "obsidian-gradient text-white border-gold-500/30 shadow-gold-500/10 scale-105 z-10" : "bg-white/40"
                )}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 gold-gradient text-white text-[9px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full shadow-xl">
                    Most Prestigious
                  </div>
                )}
                <h3 className="text-3xl font-serif font-bold mb-4 tracking-tighter">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-12">
                  <span className="text-5xl font-bold">₹{
                    (billingCycle === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price).toLocaleString('en-IN')
                  }</span>
                  <span className={cn("text-[10px] font-bold uppercase tracking-widest", plan.featured ? "text-gold-400" : "text-slate-400")}>/mo</span>
                </div>
                <ul className="space-y-6 mb-16 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-4">
                      <CheckCircle2 size={16} className={plan.featured ? "text-gold-400" : "text-gold-500"} />
                      <span className={cn("text-sm font-light", plan.featured ? "text-slate-300" : "text-slate-600")}>{f}</span>
                    </li>
                  ))}
                </ul>
                <GoldButton 
                  variant={plan.featured ? 'primary' : 'obsidian'} 
                  className="w-full"
                >
                  Apply Now
                </GoldButton>
              </LuxuryCard>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="obsidian-gradient rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden border border-white/5"
          >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold-900/20 blur-[150px] rounded-full" />
              <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gold-900/10 blur-[150px] rounded-full" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-10 tracking-tighter leading-[0.95]">
                Redefine Your <br />
                <span className="gold-text-gradient italic">Visual Identity.</span>
              </h2>
              <p className="text-slate-400 text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                Join the world's most prestigious jewelry houses in the AI era. 
                Experience the Zentara standard today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/dashboard">
                  <GoldButton className="px-16 py-7 text-base">
                    Start Your Journey
                  </GoldButton>
                </Link>
                <GoldButton variant="outline" className="border-white/10 text-white hover:bg-white/5 px-16 py-7 text-base">
                  Contact Concierge
                </GoldButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-gold-100/30 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-8 obsidian-gradient rounded-full flex items-center justify-center text-gold-400 border border-gold-500/20">
                  <Diamond size={16} strokeWidth={1.5} />
                </div>
                <span className="text-2xl font-serif font-bold tracking-[0.2em] uppercase">Zentara</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed font-light mb-10">
                The premier AI photography studio for fine jewelry and luxury horology.
              </p>
              <div className="flex gap-8">
                {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
                  <a key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-gold-600 transition-colors">{social}</a>
                ))}
              </div>
            </div>
            
            {[
              { title: "Maison", links: ["Our Process", "Gallery", "Pricing", "API Access"] },
              { title: "Company", links: ["About Us", "Careers", "Press", "Contact Concierge"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-slate-900">{col.title}</h4>
                <ul className="space-y-6">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-500 font-light hover:text-gold-600 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-12 border-t border-gold-100/50 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">© 2024 Zentara Maison. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">System Status: Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
