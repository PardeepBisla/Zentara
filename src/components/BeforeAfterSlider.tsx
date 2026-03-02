import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  className
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-ew-resize select-none rounded-2xl shadow-2xl", className)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After Image (Base) */}
      <img 
        src={afterImage} 
        alt="After AI" 
        className="w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
      />
      
      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Before AI" 
          className="absolute inset-0 w-full h-full object-cover max-w-none grayscale brightness-90"
          style={{ width: containerRef.current?.offsetWidth || '100%' }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-lg pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border border-gold-200">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-gold-500 rounded-full" />
            <div className="w-0.5 h-4 bg-gold-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 glass-card px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-slate-600">
        Original Photo
      </div>
      <div className="absolute bottom-4 right-4 bg-gold-500 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white shadow-lg">
        Zentara
      </div>
    </div>
  );
};
