import React from 'react';
import { useThemeStore } from '../../stores/themeStore';

export const DebugInfo: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      padding: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999,
      borderRadius: '4px'
    }}>
      <div>Dark Mode: {isDarkMode ? 'ON' : 'OFF'}</div>
      <div>HTML Classes: {document.documentElement.className || 'none'}</div>
      <div>Tailwind Test:</div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        <div style={{ width: '16px', height: '16px', backgroundColor: '#EF4444' }}></div>
        <div style={{ width: '16px', height: '16px', backgroundColor: '#10B981' }}></div>
        <div style={{ width: '16px', height: '16px', backgroundColor: '#3B82F6' }}></div>
      </div>
    </div>
  );
};