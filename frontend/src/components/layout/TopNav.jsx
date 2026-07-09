import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LogOut, MessageSquare, BarChart2, Hash, Zap, Sparkles, User, Menu, X, LayoutDashboard } from 'lucide-react';
import { cn } from '../../utils/cn';

export const TopNav = () => {
  const { logout, user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Shortlist', path: '/shortlist', icon: Zap },
    { name: 'Clusters', path: '/clusters', icon: Hash },
    { name: 'Trend', path: '/trend', icon: BarChart2 },
    { name: 'Submit', path: '/submit', icon: MessageSquare },
    { name: 'AI Summary', path: '/summary', icon: Sparkles },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-3 py-4">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex min-h-16 items-center justify-between overflow-hidden rounded-full border border-white/20 bg-white/[0.075] px-4 shadow-glass backdrop-blur-2xl sm:px-5">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="flex items-center gap-5">
            <div className="flex flex-shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-frost shadow-[0_10px_35px_rgba(37,99,235,0.26)]">
                <img src="/traige-logo.png" alt="Traige logo" className="h-12 w-12 object-cover object-center" />
              </div>
              <span className="font-display text-lg font-bold tracking-wide text-white">
                TRAIGE
              </span>
            </div>
            
            <div className="hidden items-center rounded-full border border-white/10 bg-black/15 p-1 md:flex gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => cn(
                    "flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300",
                    isActive 
                      ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_12px_30px_rgba(37,99,235,0.2)]" 
                      : "text-textMuted hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon size={16} />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <NavLink
              to="/profile"
              className={({ isActive }) => cn(
                "hidden max-w-[190px] items-center gap-2 truncate rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-sm font-medium transition-all sm:flex",
                isActive ? "text-cyan-200 shadow-[0_0_30px_rgba(98,230,255,0.13)]" : "text-textMuted hover:text-white"
              )}
            >
              <User size={16} />
              <span className="truncate">{user?.name || user?.email || 'Profile'}</span>
            </NavLink>
            <button
              onClick={logout}
              className="hidden rounded-full border border-white/10 bg-white/[0.055] p-2.5 text-textMuted transition-all hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-300 sm:flex"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
            
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-full border border-white/10 bg-white/[0.055] p-2 text-textMuted transition-colors hover:text-white md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/15 bg-background/80 p-3 shadow-glass backdrop-blur-2xl md:hidden">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-colors",
                  isActive 
                    ? "bg-white/12 text-white" 
                    : "text-textMuted hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon size={16} />
                {item.name}
              </NavLink>
            ))}
            <NavLink
              to="/profile"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-colors",
                isActive ? "bg-white/12 text-white" : "text-textMuted hover:bg-white/10 hover:text-white"
              )}
            >
              <User size={16} />
              Profile
            </NavLink>
            <button
              onClick={() => { logout(); setMobileOpen(false); }}
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-rose-300 transition-colors hover:bg-rose-500/10"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
