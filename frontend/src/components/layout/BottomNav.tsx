// src/components/layout/BottomNav.tsx
import { Link, useLocation } from 'react-router-dom';
import { PenTool, Compass, User } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/practice', icon: PenTool, label: t('practice') },
    { path: '/explore', icon: Compass, label: t('explore') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-2' : ''}`} />
                <span className={`text-xs ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}