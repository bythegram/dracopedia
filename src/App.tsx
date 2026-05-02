/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Coins, 
  Library, 
  BookOpen, 
  Compass, 
  Backpack, 
  MessageSquare,
  ArrowLeft,
  Star,
  Skull,
  Wind,
  Shield,
  X
} from 'lucide-react';

import { DRAGONS, Dragon } from './data/dragons';
import { PHRASES, BABY_CARE, PACKING_LIST, PackingItem } from './data/lore';
import { Rarity } from './data/types';

export default function App() {
  const [view, setView] = useState<'grid' | 'detail' | 'lore'>('grid');
  const [selectedDragon, setSelectedDragon] = useState<Dragon | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRarity, setActiveRarity] = useState<Rarity | 'All'>('All');
  const [selectedPackingItem, setSelectedPackingItem] = useState<PackingItem | null>(null);
  const closePackingItemModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!selectedPackingItem) {
      return;
    }

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
    closePackingItemModalButtonRef.current?.focus();

    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPackingItem(null);
      }

      if (event.key === 'Tab') {
        const modal = closePackingItemModalButtonRef.current?.closest('[role="dialog"]');
        if (!modal) {
          return;
        }

        const focusableElements = Array.from(
          modal.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        ).filter((element) => !element.hasAttribute('disabled'));

        if (focusableElements.length === 0) {
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        } else if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      window.removeEventListener('keydown', handleEscape);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [selectedPackingItem]);

  const filteredDragons = useMemo(() => {
    return DRAGONS.filter(dragon => {
      const matchesSearch = dragon.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           dragon.species.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRarity = activeRarity === 'All' || dragon.rarity === activeRarity;
      return matchesSearch && matchesRarity;
    });
  }, [searchQuery, activeRarity]);

  const handleSelectDragon = (dragon: Dragon) => {
    setSelectedDragon(dragon);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const Navbar = () => (
    <nav aria-label="Primary" className="sticky top-0 z-50 w-full border-b border-codex-border bg-codex-surface px-8 h-16 flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => setView('grid')}
          aria-label="Go to catalog"
        >
          <div className="w-8 h-8 rounded-full border border-codex-accent flex items-center justify-center transition-all group-hover:scale-110">
            <div className="w-0.5 h-4 bg-codex-accent rotate-45"></div>
          </div>
          <div>
            <h1 className="text-mono tracking-[0.2em] text-[11px] font-bold uppercase leading-none">Draconic Archive • Vol. IV</h1>
          </div>
        </button>

        <div className="flex items-center gap-8 font-sans text-[11px] uppercase tracking-[0.2em]">
          <button 
            type="button"
            onClick={() => setView('grid')}
            className={`transition-all hover:text-codex-accent ${view === 'grid' || view === 'detail' ? 'text-codex-accent border-b border-codex-accent pb-1' : 'opacity-50'}`}
            aria-current={view === 'grid' || view === 'detail' ? 'page' : undefined}
          >
            Catalog
          </button>
          <button 
            type="button"
            onClick={() => setView('lore')}
            className={`transition-all hover:text-codex-accent ${view === 'lore' ? 'text-codex-accent border-b border-codex-accent pb-1' : 'opacity-50'}`}
            aria-current={view === 'lore' ? 'page' : undefined}
          >
            Handbook
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-codex-bg text-[#d4d4d8] selection:bg-codex-accent/20">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:px-4 focus:py-2 focus:rounded-full focus:bg-codex-accent focus:text-black focus:font-bold"
      >
        Skip to main content
      </a>
      <Navbar />

      <main id="main-content" className="max-w-7xl mx-auto px-8 py-12">
        <AnimatePresence mode="wait">
          {view === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              {/* Hero Intro */}
              <div className="max-w-2xl border-l-2 border-codex-accent pl-8 py-4">
                <p className="text-mono text-[9px] mb-2 opacity-50">Archive Sector 01 / Species Identification</p>
                <h2 className="heading-serif text-7xl font-extralight tracking-tight text-[#f5f5f5] mb-6">
                  Catalogue of <br/><span className="italic font-light text-codex-accent">Primordial Guardians</span>
                </h2>
                <p className="text-codex-muted text-lg leading-relaxed font-serif italic">
                  An exhaustive record of biological and mystical draconic entities, verified by the Elder Council. 
                  Access level: Master Chronicler restricted.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-y border-codex-border py-8">
                <div className="relative w-full md:w-96">
                  <label htmlFor="dragon-search" className="sr-only">Search dragons by name or species</label>
                  <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-codex-muted" size={14} />
                  <input 
                    id="dragon-search"
                    type="text" 
                    placeholder="Search by name or species..."
                    className="w-full pl-12 pr-4 py-2.5 bg-codex-card border border-codex-border rounded-full text-xs focus:outline-none focus:border-codex-accent transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-3" role="group" aria-label="Filter dragons by rarity">
                  {['All', ...Object.values(Rarity)].map((rarity) => (
                    <button
                      key={rarity}
                      type="button"
                      onClick={() => setActiveRarity(rarity as any)}
                      className={`text-mono text-[9px] px-4 py-1.5 border rounded-full transition-all tracking-widest ${
                        activeRarity === rarity 
                          ? 'border-codex-accent text-codex-accent bg-codex-accent/5 shadow-[0_0_15px_rgba(197,160,89,0.1)]' 
                          : 'border-white/10 opacity-40 hover:opacity-100 hover:border-codex-muted'
                      }`}
                      aria-pressed={activeRarity === rarity}
                    >
                      {rarity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dragon Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                {filteredDragons.map((dragon, idx) => (
                  <motion.button
                    key={dragon.id}
                    type="button"
                    layoutId={`dragon-card-${dragon.id}`}
                    className="codex-card text-left w-full flex flex-col group cursor-pointer overflow-hidden rounded-2xl bg-white/[0.02]"
                    onClick={() => handleSelectDragon(dragon)}
                    aria-label={`Open study case for ${dragon.name}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="aspect-[4/5] overflow-hidden border-b border-codex-border relative">
                      <img 
                        src={dragon.image} 
                        alt={dragon.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-codex-bg to-transparent opacity-60" />
                      <div className="absolute top-4 left-4 bg-codex-accent text-black px-3 py-1 rounded-full text-[9px] font-sans font-bold uppercase tracking-widest">
                        {dragon.rarity}
                      </div>
                    </div>
                    <div className="p-8 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-mono text-[8px] opacity-40">Entry: {idx.toString().padStart(3, '0')}</p>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div key={i} className={`w-4 h-0.5 ${i < dragon.powerLevel ? 'bg-codex-accent' : 'bg-white/10'}`} />
                            ))}
                          </div>
                        </div>
                        <h3 className="heading-serif text-3xl font-light mb-1">{dragon.name}</h3>
                        <p className="text-codex-accent text-[10px] uppercase font-sans tracking-[0.2em] font-bold opacity-60">{dragon.species}</p>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 text-[10px] uppercase font-sans tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">
                          <MapPin size={10} className="text-codex-accent" />
                          <span>{dragon.habitat.split('and')[0]}</span>
                        </div>
                        <span className="text-mono text-[9px] group-hover:text-codex-accent transition-colors">Study Case →</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {filteredDragons.length === 0 && (
                <div className="text-center py-24 border border-dashed border-codex-border rounded-3xl bg-white/[0.01]">
                  <p className="heading-serif text-3xl font-light opacity-30 italic tracking-wide">No sightings recorded for this criteria.</p>
                </div>
              )}
            </motion.div>
          )}

          {view === 'detail' && selectedDragon && (
            <motion.div
              key={`detail-${selectedDragon.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16 relative"
            >
              {/* Background decorative texture */}
              <div className="absolute inset-0 opacity-10 pointer-events-none -z-10">
                <div className="decorative-circle top-20 right-20 w-96 h-96"></div>
                <div className="decorative-circle top-24 right-24 w-88 h-88 opacity-50"></div>
              </div>

              <button 
                type="button"
                onClick={() => setView('grid')}
                className="flex items-center gap-3 text-mono text-[10px] hover:text-codex-accent transition-all group mb-8 border border-white/10 px-4 py-2 rounded-full bg-white/[0.02]"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                Return to catalog
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Visual Section */}
                <div className="space-y-8">
                  <motion.div 
                    layoutId={`dragon-card-${selectedDragon.id}`}
                    className="aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-codex-card p-2 shadow-2xl shadow-black"
                  >
                    <img 
                      src={selectedDragon.image} 
                      alt={selectedDragon.name}
                      className="w-full h-full object-cover rounded-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>

                  <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-6">
                    <span className="text-mono text-[9px] opacity-40">Morphological Data</span>
                    <ul className="space-y-4 font-sans text-xs">
                       <li className="flex justify-between border-b border-white/5 pb-3">
                         <span className="opacity-60">Classification</span>
                         <span className="text-codex-accent font-bold tracking-widest">{selectedDragon.rarity}</span>
                       </li>
                       <li className="flex justify-between border-b border-white/5 pb-3">
                         <span className="opacity-60">Containment Difficulty</span>
                         <span className="text-codex-accent font-bold tracking-widest">{selectedDragon.difficulty}</span>
                       </li>
                       <li className="flex justify-between border-b border-white/5 pb-3">
                         <span className="opacity-60">Power Level</span>
                         <div className="flex gap-1">
                           {Array.from({ length: 5 }).map((_, i) => (
                             <div key={i} className={`w-6 h-1 rounded-full ${i < selectedDragon.powerLevel ? 'bg-codex-accent' : 'bg-white/10'}`} />
                           ))}
                         </div>
                       </li>
                    </ul>
                  </div>
                </div>

                {/* Lore Section */}
                <div className="space-y-12 py-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-[2px] w-12 bg-codex-accent" />
                      <span className="text-mono text-[10px] opacity-60">Monograph • Archive Ref: {selectedDragon.id.toUpperCase()}</span>
                    </div>
                    <h2 className="text-7xl font-extralight tracking-tight text-[#f5f5f5] leading-[0.9]">
                      {selectedDragon.name.split(' ').slice(0, -1).join(' ')} <br/>
                      <span className="italic font-light text-codex-accent">{selectedDragon.name.split(' ').slice(-1)}</span>
                    </h2>
                    <p className="text-[#e2bc74] text-sm uppercase tracking-[0.2em] font-bold opacity-60">{selectedDragon.title}</p>
                    
                    <p className="text-lg leading-relaxed font-serif italic text-codex-ink opacity-80 pt-6">
                      "&nbsp;{selectedDragon.description}&nbsp;"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 border-y border-white/10">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-mono text-[8px] opacity-40">Primary Habitat</p>
                        <p className="text-sm font-medium flex items-center gap-3"><MapPin size={12} className="text-codex-accent" /> {selectedDragon.habitat}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-mono text-[8px] opacity-40">Metaphysical Ability</p>
                        <p className="text-sm font-medium flex items-center gap-3"><Sparkles size={12} className="text-codex-accent" /> {selectedDragon.power}</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-mono text-[8px] opacity-40">Behavioral Matrix</p>
                        <p className="text-sm font-medium flex items-center gap-3"><Skull size={12} className="text-codex-accent" /> {selectedDragon.personality}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-mono text-[8px] opacity-40">Ritual Treasure</p>
                        <p className="text-sm font-medium flex items-center gap-3"><Coins size={12} className="text-codex-accent" /> {selectedDragon.treasure}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-mono text-[10px] opacity-50 flex items-center gap-3">
                       <Library size={12} />
                       Historical Documentation
                    </h4>
                    <p className="text-codex-ink/70 leading-relaxed font-serif text-lg italic border-l border-codex-accent/30 pl-8">
                      {selectedDragon.history}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-mono text-[10px] opacity-50 flex items-center gap-3">
                      <BookOpen size={12} />
                      Keeper's Field Notes
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
                        <div className="flex items-center gap-3 text-codex-accent">
                          <MapPin size={14} />
                          <p className="text-mono text-[9px] tracking-[0.2em] uppercase">Egg-Laying Grounds</p>
                        </div>
                        <p className="text-sm leading-relaxed text-codex-ink/75">{selectedDragon.nestingGrounds}</p>
                      </article>
                      <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
                        <div className="flex items-center gap-3 text-codex-accent">
                          <Compass size={14} />
                          <p className="text-mono text-[9px] tracking-[0.2em] uppercase">Nest Finder</p>
                        </div>
                        <p className="text-sm leading-relaxed text-codex-ink/75">{selectedDragon.nestingGuide}</p>
                      </article>
                      <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
                        <div className="flex items-center gap-3 text-codex-accent">
                          <Wind size={14} />
                          <p className="text-mono text-[9px] tracking-[0.2em] uppercase">Hunter-Proof Hideout</p>
                        </div>
                        <p className="text-sm leading-relaxed text-codex-ink/75">{selectedDragon.hideout}</p>
                      </article>
                      <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
                        <div className="flex items-center gap-3 text-codex-accent">
                          <Coins size={14} />
                          <p className="text-mono text-[9px] tracking-[0.2em] uppercase">Diet</p>
                        </div>
                        <p className="text-sm leading-relaxed text-codex-ink/75">{selectedDragon.diet}</p>
                        <p className="text-xs leading-relaxed text-codex-muted">{selectedDragon.feeding}</p>
                      </article>
                    </div>
                    <article className="rounded-3xl border border-codex-accent/20 bg-codex-accent/5 p-6 space-y-3">
                      <div className="flex items-center gap-3 text-codex-accent">
                        <Star size={14} />
                        <p className="text-mono text-[9px] tracking-[0.2em] uppercase">Favorite Thing To Do</p>
                      </div>
                      <p className="text-sm leading-relaxed text-codex-ink/80">{selectedDragon.favoriteActivity}</p>
                    </article>
                  </div>

                  <div className="flex justify-between items-center bg-white/[0.02] p-8 rounded-3xl border border-white/10">
                    <div className="space-y-1">
                      <p className="text-mono text-[8px] opacity-40">Egg Specification</p>
                      <p className="font-sans font-bold text-codex-accent text-sm tracking-widest">{selectedDragon.egg.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'lore' && (
            <motion.div
              key="lore"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-16"
            >
              <div className="max-w-3xl space-y-4">
                <p className="text-mono text-[10px] border border-codex-accent/20 px-3 py-1 rounded-full w-fit">Operations Manual</p>
                <h2 className="heading-serif text-7xl font-extralight tracking-tight">Survival & <br/><span className="italic font-light text-codex-accent">Field Operations</span></h2>
                <p className="text-codex-muted text-lg font-serif italic max-w-xl">
                  Crucial data for field researchers. Failure to adhere to these protocols may result in biological expiration.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Language Phrases */}
                <section className="p-10 border border-white/10 bg-white/[0.02] rounded-3xl space-y-8">
                  <div className="flex items-center gap-3 text-codex-accent">
                    <MessageSquare size={20} />
                    <h3 className="heading-serif text-3xl">Draconic Lexicon</h3>
                  </div>
                  <div className="space-y-2">
                    {PHRASES.map((p, i) => (
                      <div key={i} className="p-4 flex items-center justify-between border-b border-white/5 hover:bg-white/[0.02] transition-colors rounded-lg group">
                        <span className="font-mono text-[12px] font-bold text-codex-accent tracking-widest">{p.phrase}</span>
                        <span className="text-[12px] opacity-50 font-sans uppercase tracking-[0.1em] group-hover:opacity-100 transition-opacity">{p.meaning}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Baby Care */}
                <section className="p-10 border border-white/10 bg-white/[0.02] rounded-3xl space-y-8">
                  <div className="flex items-center gap-3 text-codex-accent">
                    <Sparkles size={20} />
                    <h3 className="heading-serif text-3xl">Lacteal Guardianship</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {BABY_CARE.map((care, i) => (
                      <div key={i} className="p-6 border border-white/5 bg-codex-bg rounded-2xl space-y-2 group hover:border-codex-accent/30 transition-all">
                         <span className="text-mono text-[8px] opacity-40 group-hover:opacity-100 transition-opacity">{care.category} protocol</span>
                         <p className="text-sm text-white/70 italic leading-relaxed font-serif">"{care.tip}"</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Packing List */}
                <section className="p-10 border border-white/10 bg-white/[0.02] rounded-3xl space-y-8 col-span-1 lg:col-span-2">
                  <div className="flex items-center gap-3 text-codex-accent">
                    <Backpack size={20} />
                    <h3 className="heading-serif text-3xl">Necessary Expedition Gear</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PACKING_LIST.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedPackingItem(item)}
                        className="text-left flex items-center gap-5 p-6 border border-white/5 bg-codex-bg rounded-2xl group hover:border-codex-accent/50 transition-all"
                        aria-label={`Open details for ${item.item}`}
                      >
                        <div className="w-1.5 h-10 bg-codex-accent rounded-full opacity-20 group-hover:opacity-100" />
                        <div>
                           <p className="font-sans font-bold text-sm tracking-widest opacity-80 uppercase leading-tight mb-1">{item.item}</p>
                           <p className="text-mono text-[9px] opacity-40">Deployment: {item.requirement}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedPackingItem && (
            <motion.div
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm px-4 py-10 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPackingItem(null)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="packing-item-title"
                aria-describedby="packing-item-description"
                className="max-w-2xl mx-auto border border-codex-accent/30 bg-codex-card rounded-3xl p-8 md:p-10 space-y-8 shadow-2xl shadow-black/70"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-2">
                    <p className="text-mono text-[10px] uppercase tracking-[0.2em] opacity-50">Expedition Gear Dossier</p>
                    <h3 id="packing-item-title" className="heading-serif text-4xl md:text-5xl font-light leading-tight">
                      {selectedPackingItem.item}
                    </h3>
                    <p className="text-codex-accent text-[10px] uppercase tracking-[0.2em] font-bold opacity-70">
                      Recommended for: {selectedPackingItem.requirement}
                    </p>
                  </div>
                  <button
                    ref={closePackingItemModalButtonRef}
                    type="button"
                    onClick={() => setSelectedPackingItem(null)}
                    className="shrink-0 rounded-full border border-white/10 p-2 hover:border-codex-accent hover:text-codex-accent transition-colors"
                    aria-label="Close item details"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid gap-5">
                  <article id="packing-item-description" className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-2">
                    <p className="text-mono text-[9px] uppercase tracking-[0.2em] text-codex-accent/80">Where To Find It</p>
                    <p className="text-sm leading-relaxed text-codex-ink/80">{selectedPackingItem.whereToFind}</p>
                  </article>

                  <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-2">
                    <p className="text-mono text-[9px] uppercase tracking-[0.2em] text-codex-accent/80">How To Use It</p>
                    <p className="text-sm leading-relaxed text-codex-ink/80">{selectedPackingItem.howToUse}</p>
                  </article>

                  <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
                    <p className="text-mono text-[9px] uppercase tracking-[0.2em] text-codex-accent/80">Dragons That Protect It</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedPackingItem.protectedBy.map((dragonName) => (
                        <li key={dragonName} className="flex items-center gap-2 text-sm text-codex-ink/85">
                          <Shield size={13} className="text-codex-accent" />
                          <span>{dragonName}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-codex-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-50">
          <p className="text-mono text-[9px]">
            BY DECREE OF THE ELDER COUNCIL <br />
            © 2026 Archive of Winds & Ink
          </p>
          <div className="flex items-center gap-8">
            <p className="text-mono text-[9px] max-w-xs text-right">
              May the stars guide your path. Should this tome be lost, return to the Altar of Winds.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function GateItem({ name, region }: { name: string, region: string }) {
  return (
    <div className="flex items-center justify-between text-xs border-b border-codex-border/50 pb-1">
      <span className="font-serif italic font-medium">{name}</span>
      <span className="text-mono text-[8px]">{region}</span>
    </div>
  );
}
