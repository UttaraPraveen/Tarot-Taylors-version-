import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, HelpCircle, Heart } from 'lucide-react';
import { tarotDeck } from './data/tarotDeck';
import StarryBackground from './components/StarryBackground';
import TarotCard from './components/TarotCard';

const MysticalEmblem = () => (
  <motion.div
    animate={{ 
      rotate: 360,
      y: [0, -10, 0]
    }}
    transition={{
      rotate: { duration: 160, repeat: Infinity, ease: "linear" },
      y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    }}
    className="w-36 h-36 md:w-44 md:h-44 my-6 relative flex items-center justify-center pointer-events-none z-10"
  >
    <svg viewBox="0 0 100 100" className="w-full h-full text-[#d4af37] opacity-80 fill-none stroke-current" style={{ strokeWidth: 0.6 }}>
      <circle cx="50" cy="50" r="48" className="stroke-[0.8]" />
      <circle cx="50" cy="50" r="45" className="stroke-[0.3] stroke-dashed" strokeDasharray="3,2" />
      <circle cx="50" cy="50" r="38" className="stroke-[0.6]" />
      <circle cx="50" cy="50" r="36" className="stroke-[0.2]" />
      <circle cx="50" cy="50" r="26" className="stroke-[0.5]" />
      
      {/* Central compass / ray lines */}
      <line x1="50" y1="2" x2="50" y2="98" className="stroke-[0.3]" />
      <line x1="2" y1="50" x2="98" y2="50" className="stroke-[0.3]" />
      <line x1="16" y1="16" x2="84" y2="84" className="stroke-[0.2]" strokeDasharray="1,2" />
      <line x1="16" y1="84" x2="84" y2="16" className="stroke-[0.2]" strokeDasharray="1,2" />
      
      {/* Crescent moon in center */}
      <path d="M 46 41 A 8 8 0 1 0 56 59 A 6 6 0 1 1 46 41" fill="#d4af37" className="stroke-none" />
      
      {/* Small stars orbiting */}
      <polygon points="50,14 51.5,17 55,17 52,19.5 53,23 50,20.5 47,23 48,19.5 45,17 48.5,17" fill="#d4af37" className="stroke-none" />
      <polygon points="50,86 51.5,89 55,89 52,91.5 53,95 50,92.5 47,95 48,91.5 45,89 48.5,89" fill="#d4af37" className="stroke-none" />
      <polygon points="14,50 15.5,53 19,53 16,55.5 17,59 14,56.5 11,59 12,55.5 9,53 12.5,53" fill="#d4af37" className="stroke-none" />
      <polygon points="86,50 87.5,53 91,53 88,55.5 89,59 86,56.5 83,59 84,55.5 81,53 84.5,53" fill="#d4af37" className="stroke-none" />
    </svg>
  </motion.div>
);

function App() {
  const [gameState, setGameState] = useState('landing'); // 'landing' | 'reading'
  const [drawnCards, setDrawnCards] = useState([]);
  const [dealId, setDealId] = useState('');
  const [isDealt, setIsDealt] = useState(false);

  const shuffleAndDraw = () => {
    // Shuffle and pick 6 unique cards
    const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 6);
    
    // Set cards data
    setDrawnCards(selected);
    // Create new deal identifier to reset card flips and animations
    setDealId(Date.now().toString());
    setGameState('reading');
    setIsDealt(false);
  };

  useEffect(() => {
    if (gameState === 'reading') {
      // Trigger card dealing step animations sequentially
      const timer = setTimeout(() => {
        setIsDealt(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [gameState, dealId]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Interactive starfield canvas */}
      <StarryBackground />

      {/* Main Header / Navigation */}
      <header className="w-full py-6 px-8 flex justify-between items-center z-20 border-b border-[#d4af37]/10 bg-black/10 backdrop-blur-sm">
        <div 
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setGameState('landing')}
        >
          <Sparkles className="w-5 h-5 text-[#d4af37]" />
          <span className="font-cinzel text-lg md:text-xl font-black tracking-widest text-[#d4af37]">
            Swiftie Tarot
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <span className="font-cinzel tracking-widest text-[10px] uppercase border border-[#d4af37]/20 px-2 py-1 rounded">
            Taylor's Version
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center py-8 z-10">
        <AnimatePresence mode="wait">
          {gameState === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center max-w-xl px-6"
            >
              <MysticalEmblem />
              
              <h1 className="text-4xl md:text-6xl font-black mb-3 select-none leading-tight font-cinzel">
                <span className="bg-gradient-to-b from-[#fef9c3] via-[#d4af37] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  Swiftie Tarot
                </span>
              </h1>
              
              <p className="font-cinzel text-xs md:text-sm tracking-[0.25em] text-[#d4af37] mb-8 font-semibold uppercase">
                The cards know something you don't.
              </p>
              
              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8 max-w-md font-inter">
                Step into a starry space where fate and melodic frequencies meet. Shuffle the mystical deck to reveal six cards mapping to Taylor's eras, song configurations, and custom fortunes.
              </p>

              <button 
                onClick={shuffleAndDraw} 
                className="gold-btn flex items-center gap-3 active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-gray-900 fill-current" />
                Shuffle Deck
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Instructions Banner */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-6 md:mb-10 px-6 max-w-lg"
              >
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-[#d4af37] mb-2 tracking-widest">
                  Your Celestial Spread
                </h2>
                <p className="text-xs md:text-sm text-gray-400 flex items-center justify-center gap-1.5 font-light">
                  <HelpCircle className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  Tap each card to flip and reveal its era, song reading, and lucky number.
                </p>
              </motion.div>

              {/* Cards Spread Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 max-w-[95%] xl:max-w-7xl mx-auto px-4 justify-items-center items-center py-4 w-full">
                {drawnCards.map((card, idx) => (
                  <TarotCard
                    key={`${card.id}-${dealId}`}
                    card={card}
                    index={idx}
                    isDealt={isDealt}
                  />
                ))}
              </div>

              {/* Control Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, type: "spring", stiffness: 100 }}
                className="mt-12 mb-6 flex flex-col md:flex-row items-center gap-4 z-20"
              >
                <button 
                  onClick={shuffleAndDraw} 
                  className="gold-btn flex items-center gap-2 active:scale-95 text-sm md:text-base py-3 px-8"
                >
                  <RefreshCw className="w-4 h-4 text-gray-900" />
                  Draw Again
                </button>
                
                <button
                  onClick={() => setGameState('landing')}
                  className="px-6 py-2 rounded-full border border-gray-600 hover:border-[#d4af37] hover:text-[#d4af37] text-xs uppercase tracking-widest text-gray-400 font-cinzel transition-all"
                >
                  Return Home
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-[#d4af37]/10 bg-black/10 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-2 text-[10px] md:text-xs text-gray-500 font-light font-inter">
        <div className="flex items-center gap-1.5">
          <span>Made for Swifties with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
          <span>· Swiftie Tarot © {new Date().getFullYear()}</span>
        </div>
        <p className="max-w-md px-6 text-[9px] text-gray-600 tracking-wider">
          Disclaimer: This is a fan-made, original tarot exploration system inspired by musical eras. It contains no copyrighted lyrics or artwork and has no official association with Taylor Swift.
        </p>
      </footer>
    </div>
  );
}

export default App;
