'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
  dark: boolean;
  toggleDark: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const storedDark = localStorage.getItem('dark');
    const storedFontSize = localStorage.getItem('fontSize');
    if (storedDark) setDark(storedDark === 'true');
    if (storedFontSize) setFontSize(Number(storedFontSize));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('dark', String(dark));
  }, [dark]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', String(fontSize));
  }, [fontSize]);

  const toggleDark = () => setDark(d => !d);
  const increaseFontSize = () => setFontSize(f => Math.min(f + 2, 24));
  const decreaseFontSize = () => setFontSize(f => Math.max(f - 2, 12));

  return (
    <ThemeContext.Provider value={{ dark, toggleDark, fontSize, increaseFontSize, decreaseFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
