import React, { useState, useRef, useEffect } from 'react';

interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSplit?: number;
}

export const SplitPane: React.FC<SplitPaneProps> = ({ left, right, defaultSplit = 50 }) => {
  const [split, setSplit] = useState(defaultSplit);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newSplit = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    if (newSplit > 20 && newSplit < 80) {
      setSplit(newSplit);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging]);

  return (
    <div ref={containerRef} className="flex h-full relative overflow-hidden">
      <div style={{ width: `${split}%` }} className="h-full overflow-hidden">
        {left}
      </div>
      
      <div
        className="cursor-col-resize relative"
        onMouseDown={handleMouseDown}
        style={{ 
          width: '4px',
          backgroundColor: isDragging ? '#3B82F6' : '#9CA3AF',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          if (!isDragging) {
            e.currentTarget.style.backgroundColor = '#3B82F6';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDragging) {
            e.currentTarget.style.backgroundColor = '#9CA3AF';
          }
        }}
      >
        <div 
          className="absolute inset-y-0"
          style={{ left: '-4px', right: '-4px', zIndex: 10 }}
        />
      </div>
      
      <div style={{ width: `${100 - split}%` }} className="h-full overflow-hidden">
        {right}
      </div>
    </div>
  );
};