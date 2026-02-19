'use client';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { dark, toggleDark, increaseFontSize, decreaseFontSize } = useTheme();
  const { token, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
        📖 Estudo Bíblico
      </Link>
      <div className="flex items-center gap-3">
        <button onClick={decreaseFontSize} title="Diminuir fonte" className="px-2 py-1 rounded border dark:border-gray-600 text-sm">A-</button>
        <button onClick={increaseFontSize} title="Aumentar fonte" className="px-2 py-1 rounded border dark:border-gray-600 text-sm">A+</button>
        <button onClick={toggleDark} title="Alternar modo noturno" className="px-2 py-1 rounded border dark:border-gray-600 text-sm">
          {dark ? '☀️' : '🌙'}
        </button>
        {token ? (
          <button onClick={logout} className="px-3 py-1 rounded bg-red-500 text-white text-sm">Sair</button>
        ) : (
          <Link href="/auth" className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Entrar</Link>
        )}
      </div>
    </nav>
  );
}
