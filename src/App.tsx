import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-luxury-beige/80 backdrop-blur-md border-b border-gold-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gold-500/20">
              <Diamond size={24} />
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight">Zentara</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['How it Works', 'Gallery', 'Features', 'Pricing'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium text-slate-600 hover:text-gold-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <GoldButton variant="secondary" className="px-6 py-2.5 text-sm">
              Get Started
            </GoldButton>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gold-100 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {['How it Works', 'Gallery', 'Features', 'Pricing'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-lg font-medium text-slate-600"
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
      <section className="pt-40 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100/50 border border-gold-200 text-gold-700 text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles size={14} />
              The Future of Jewelry Photography
            </div>
            <h1 className="text-6xl md:text-7xl font-serif font-bold leading-[1.1] mb-8">
              Studio-Quality <br />
              <span className="gold-text-gradient">Jewelry Images.</span> <br />
              Generated in Seconds.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
              Turn ordinary product photos into luxury studio shots using AI. 
              Eliminate expensive photoshoots and get professional results instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <GoldButton className="px-10 py-5 text-lg">
                Generate Your First Image
              </GoldButton>
              <GoldButton variant="outline" className="px-10 py-5 text-lg">
                See Demo
              </GoldButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <BeforeAfterSlider 
              beforeImage="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000"
              afterImage="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000"
              className="aspect-[4/5] md:aspect-square"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl border border-gold-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i+10}`} 
                      className="w-10 h-10 rounded-full border-2 border-white"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex text-gold-500">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-xs font-bold text-slate-900 mt-1">Trusted by 500+ Brands</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white border-y border-gold-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-400 font-bold text-xs uppercase tracking-[0.3em] mb-12">
            Empowering the World's Finest Jewelers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
            {['VOGUE', 'TIFFANY', 'CARTIER', 'BULGARI', 'PANDORA'].map(brand => (
              <span key={brand} className="text-3xl font-serif font-black tracking-tighter">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Three Steps to Perfection</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Our AI understands the physics of light on precious metals and gemstones, 
              delivering results that were previously only possible in a high-end studio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Upload, title: "Upload", desc: "Snap a photo with your phone on any background and upload it to our platform." },
              { icon: Palette, title: "Choose Style", desc: "Select from our curated library of luxury backgrounds and lighting environments." },
              { icon: Download, title: "Download", desc: "Get your high-resolution, studio-quality image in seconds, ready for sales." }
            ].map((step, i) => (
              <LuxuryCard key={i} delay={i * 0.1} className="text-center group">
                <div className="w-16 h-16 bg-gold-50 rounded-2xl flex items-center justify-center text-gold-500 mx-auto mb-8 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-500">
                  <step.icon size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </LuxuryCard>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section id="gallery" className="py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">The AI Advantage</h2>
              <p className="text-slate-400 max-w-xl text-lg">
                See the dramatic difference Zentara makes across various jewelry types.
              </p>
            </div>
            <GoldButton variant="primary">View Full Gallery</GoldButton>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              { 
                before: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
                after: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800",
                label: "Diamond Rings"
              },
              { 
                before: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
                after: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800",
                label: "Luxury Watches"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <BeforeAfterSlider 
                  beforeImage={item.before}
                  afterImage={item.after}
                  className="aspect-video"
                />
                <p className="text-gold-400 font-bold tracking-widest uppercase text-xs">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-square rounded-3xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl" />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">Crafted for Excellence</h2>
              <div className="grid gap-8">
                {[
                  { icon: Sparkles, title: "AI Lighting Enhancement", desc: "Our engine simulates ray-tracing to create perfect reflections on metal surfaces." },
                  { icon: Maximize, title: "High-Resolution Export", desc: "Download in 4K resolution, perfect for high-end print catalogs and large displays." },
                  { icon: Layers, title: "Batch Processing", desc: "Upload your entire collection and process hundreds of images in a single click." },
                  { icon: Palette, title: "Multiple Style Presets", desc: "From minimalist white to dramatic dark marble, choose the mood that fits your brand." }
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="shrink-0 w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center text-gold-600">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Simple, Transparent Pricing</h2>
            
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={cn("text-sm font-bold", billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-400')}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-14 h-8 bg-slate-200 rounded-full relative p-1 transition-colors"
              >
                <motion.div 
                  animate={{ x: billingCycle === 'monthly' ? 0 : 24 }}
                  className="w-6 h-6 bg-white rounded-full shadow-md"
                />
              </button>
              <span className={cn("text-sm font-bold", billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-400')}>
                Yearly <span className="text-gold-600 ml-1">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: 49, features: ["20 Images / month", "Standard Backgrounds", "720p Resolution", "Email Support"] },
              { name: "Professional", price: 149, featured: true, features: ["100 Images / month", "All Luxury Backgrounds", "4K Resolution", "Batch Processing", "Priority Support"] },
              { name: "Enterprise", price: 499, features: ["Unlimited Images", "Custom AI Training", "API Access", "Dedicated Account Manager", "24/7 Support"] }
            ].map((plan, i) => (
              <LuxuryCard 
                key={i} 
                className={cn(
                  "relative flex flex-col",
                  plan.featured && "border-gold-500 shadow-2xl scale-105 z-10"
                )}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-serif font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-bold">${billingCycle === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price}</span>
                  <span className="text-slate-400">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-600">
                      <CheckCircle2 size={18} className="text-gold-500" />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <GoldButton 
                  variant={plan.featured ? 'primary' : 'outline'} 
                  className="w-full"
                >
                  Get Started
                </GoldButton>
              </LuxuryCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 gold-gradient opacity-5" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
                Stop Spending <span className="text-gold-400">$20,000</span> <br />
                on Photoshoots
              </h2>
              <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
                Join 500+ luxury brands already using Zentara to scale their visual content.
              </p>
              <GoldButton className="px-12 py-6 text-xl">
                Start Creating Luxury Images
              </GoldButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gold-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-white">
                  <Diamond size={18} />
                </div>
                <span className="text-xl font-serif font-bold">Zentara</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                The world's first AI photography studio dedicated exclusively to fine jewelry and luxury accessories.
              </p>
            </div>
            
            {[
              { title: "Product", links: ["How it Works", "Gallery", "Pricing", "API"] },
              { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold text-xs uppercase tracking-widest mb-6">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-500 hover:text-gold-600 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-10 border-t border-gold-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-400">© 2024 Zentara. All rights reserved.</p>
            <div className="flex gap-6">
              {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-xs text-slate-400 hover:text-gold-600 transition-colors">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
