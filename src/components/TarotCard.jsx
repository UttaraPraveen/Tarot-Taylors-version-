import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Star, Sparkles } from 'lucide-react';

const CardBackGraphic = () => (
  <svg viewBox="0 0 200 320" className="w-full h-full text-[#d4af37] fill-none stroke-current" style={{ strokeWidth: 1 }}>
    {/* Outer border & frame */}
    <rect x="6" y="6" width="188" height="308" rx="8" className="stroke-[1.5] opacity-95" />
    <rect x="10" y="10" width="180" height="300" rx="6" className="stroke-[0.5] opacity-40" />
    <rect x="14" y="14" width="172" height="292" rx="5" className="stroke-[1] opacity-75" />
    
    {/* Corner Ornaments */}
    <path d="M 6 24 L 24 6 M 6 296 L 24 314 M 194 24 L 176 6 M 194 296 L 176 314" className="stroke-[1.5] opacity-90" />
    
    {/* Inner Sacred Geometry & Circles */}
    <circle cx="100" cy="160" r="50" className="stroke-[0.8] stroke-dashed opacity-50" strokeDasharray="4,3" />
    <circle cx="100" cy="160" r="40" className="stroke-[1.2] opacity-80" />
    <circle cx="100" cy="160" r="32" className="stroke-[0.5] opacity-40" />

    {/* Sunburst Rays */}
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 22.5 * Math.PI) / 180;
      const x1 = 100 + Math.cos(angle) * 40;
      const y1 = 160 + Math.sin(angle) * 40;
      const x2 = 100 + Math.cos(angle) * 58;
      const y2 = 160 + Math.sin(angle) * 58;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-[0.7] opacity-60" />;
    })}

    {/* Center Crescent Moon */}
    <path d="M 94 148 A 12 12 0 1 0 106 168 A 9 9 0 1 1 94 148" fill="#d4af37" className="opacity-90" />
    
    {/* Floating Stars */}
    <polygon points="100,128 102.5,133 108,133 103.5,136.5 105,142 100,138.5 95,142 96.5,136.5 92,133 97.5,133" fill="#d4af37" className="opacity-90" />
    <polygon points="100,186 102.5,191 108,191 103.5,194.5 105,200 100,196.5 95,200 96.5,194.5 92,191 97.5,191" fill="#d4af37" className="opacity-90" />
    
    {/* Dot grid accents */}
    <circle cx="32" cy="32" r="2.5" fill="#d4af37" className="opacity-80" />
    <circle cx="168" cy="32" r="2.5" fill="#d4af37" className="opacity-80" />
    <circle cx="32" cy="288" r="2.5" fill="#d4af37" className="opacity-80" />
    <circle cx="168" cy="288" r="2.5" fill="#d4af37" className="opacity-80" />

    {/* Swiftie Sacred Number "13" */}
    <text x="100" y="165" fill="#030712" className="font-bold stroke-none" style={{ fontFamily: 'Cinzel, serif', fontSize: '13px', fontWeight: 'bold' }} textAnchor="middle">
      13
    </text>
  </svg>
);

const TarotCard = ({ card, index, isDealt }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  // Generate random sparkles on flip
  const sparklesList = Array.from({ length: 14 }).map((_, i) => {
    const angle = (i * 25.7 + Math.random() * 12) * (Math.PI / 180);
    const distance = 50 + Math.random() * 80;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: Math.random() * 12 + 6,
      delay: Math.random() * 0.1,
      duration: 0.6 + Math.random() * 0.5
    };
  });

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1500);
    }
  };

  // Card slide-in animation variants based on its index
  const dealVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      scale: 0.8,
      rotate: (index - 2.5) * 5 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: index * 0.15 + 0.3
      }
    }
  };

  return (
    <motion.div
      variants={dealVariants}
      initial="hidden"
      animate={isDealt ? "visible" : "hidden"}
      className="perspective-1000 w-full max-w-[280px] aspect-[10/16] relative cursor-pointer"
      onClick={handleFlip}
    >
      <motion.div
        className="w-full h-full preserve-3d relative rounded-2xl transition-shadow duration-500 card-glow"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{
          boxShadow: isFlipped 
            ? `0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px ${card.theme.primary}50` 
            : '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 10px rgba(212, 175, 55, 0.15)'
        }}
      >
        {/* CARD BACK (Face Down) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-[#0d1527] border-2 border-[#d4af37] p-2 flex flex-col justify-between overflow-hidden">
          {/* Subtle gold inner vignette border */}
          <div className="absolute inset-2 border border-[#d4af37] opacity-20 pointer-events-none rounded-xl"></div>
          
          <div className="w-full h-full relative">
            <CardBackGraphic />
          </div>
        </div>

        {/* CARD FACE (Face Up, Revealed) */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl p-4 flex flex-col justify-between overflow-hidden"
          style={{ 
            transform: 'rotateY(180deg)',
            backgroundColor: '#0d1527',
            border: `2px solid ${card.theme.primary}`
          }}
        >
          {/* Elegant gold corner accents inside the border */}
          <div className="absolute inset-1.5 border border-dashed opacity-30 rounded-xl" style={{ borderColor: card.theme.primary }}></div>
          
          {/* Header with Era Badge */}
          <div className="w-full flex flex-col items-center z-10">
            <div 
              className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border"
              style={{ 
                background: `${card.theme.gradient}`,
                borderColor: card.theme.primary,
                color: card.theme.badgeText,
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {card.era}
            </div>
            
            {/* Card Name */}
            <h3 className="mt-3.5 text-lg font-black tracking-widest text-center uppercase" style={{ color: card.theme.primary }}>
              {card.name}
            </h3>

            {/* Glowing divider */}
            <div className="flex items-center gap-1.5 my-2.5 w-full justify-center opacity-60">
              <div className="h-[1px] w-10" style={{ background: `linear-gradient(to right, transparent, ${card.theme.primary})` }}></div>
              <Star className="w-3.5 h-3.5" style={{ fill: card.theme.primary, color: card.theme.primary }} />
              <div className="h-[1px] w-10" style={{ background: `linear-gradient(to left, transparent, ${card.theme.primary})` }}></div>
            </div>
          </div>

          {/* Body content with song & inspirational reading */}
          <div className="flex-1 flex flex-col justify-center items-center px-1 z-10 my-2">
            <div className="flex items-center gap-2 mb-3 bg-[#030712]/50 px-3 py-1.5 rounded-lg border border-amber-500/10">
              <Music className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-cinzel text-[11px] tracking-wider font-semibold text-gray-200">
                {card.song}
              </span>
            </div>

            <p className="text-xs md:text-sm italic text-gray-200 text-center leading-relaxed font-light px-2 line-clamp-6">
              "{card.reading}"
            </p>
          </div>

          {/* Footer with Lucky Number */}
          <div className="w-full flex flex-col items-center z-10 pt-2 border-t border-amber-500/10">
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
              Lucky Number
            </span>
            <div 
              className="font-cinzel text-xl font-extrabold mt-0.5"
              style={{ color: card.theme.primary, textShadow: `0 0 8px ${card.theme.primary}50` }}
            >
              {card.luckyNumber}
            </div>
          </div>

          {/* Decorative Corner Filigrees (SVGs in corners for elegance) */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l opacity-40" style={{ borderColor: card.theme.primary }}></div>
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r opacity-40" style={{ borderColor: card.theme.primary }}></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l opacity-40" style={{ borderColor: card.theme.primary }}></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r opacity-40" style={{ borderColor: card.theme.primary }}></div>
        </div>
      </motion.div>

      {/* Sparkle burst upon reveal */}
      {showSparkles && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          {sparklesList.map((sp) => (
            <motion.div
              key={sp.id}
              className="absolute"
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: sp.x,
                y: sp.y,
                scale: [0, 1.3, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: sp.duration,
                delay: sp.delay,
                ease: "easeOut"
              }}
              style={{ width: sp.size, height: sp.size }}
            >
              <Sparkles className="w-full h-full" style={{ color: card.theme.primary, filter: `drop-shadow(0 0 6px ${card.theme.primary})` }} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TarotCard;
