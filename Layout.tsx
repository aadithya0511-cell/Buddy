import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Home, BookOpen, BarChart3, Info, Menu, X, Sparkles } from 'lucide-react';
import { getProgress, getLevel } from '@/lib/progressStore';
import logo from '@/assets/logo.png';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/levels', label: 'Learn', icon: BookOpen },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
  { path: '/about', label: 'About', icon: Info },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const progress = getProgress();
    setXp(progress.totalXP);
  }, [location]);

  const levelInfo = getLevel(xp);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img src={logo} alt="Buddy Logo" className="w-10 h-10 rounded-xl" />
              <span className="text-xl font-bold text-gradient">Buddy</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* XP Display */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-xp/10 border border-xp/30">
                <Sparkles className="w-4 h-4 text-xp" />
                <span className="text-sm font-bold text-xp">{xp} XP</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                <span>{levelInfo.icon}</span>
                <span className="text-sm font-medium text-muted-foreground">{levelInfo.level}</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {/* XP Display Mobile */}
              <div className="flex items-center gap-3 pb-3 mb-3 border-b border-border/50">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-xp/10 border border-xp/30">
                  <Sparkles className="w-4 h-4 text-xp" />
                  <span className="text-sm font-bold text-xp">{xp} XP</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                  <span>{levelInfo.icon}</span>
                  <span className="text-sm font-medium text-muted-foreground">{levelInfo.level}</span>
                </div>
              </div>
              
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Made with 💜 for Python beginners • Buddy © 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
