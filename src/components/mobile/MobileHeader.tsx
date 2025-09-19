import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Shield, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

// Header mobile personalizado - CyberVault
// Matheus Fernandes - Design cyberpunk responsivo
export function MobileHeader() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Header Principal Mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center neon-glow">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold text-primary glitch-text" data-text="CyberVault">
              CyberVault
            </h1>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMenuOpen(!menuOpen)}
            className="cyber-border"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        
        {/* Efeito Matrix no header */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-matrix-rain"
              style={{
                left: `${12.5 * (i + 1)}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            />
          ))}
        </div>
      </header>

      {/* Menu Lateral Mobile */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
        menuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Menu Slide */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-card/95 backdrop-blur-md border-l border-primary/20 cyber-border transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 space-y-6">
            {/* User Info */}
            {user && (
              <div className="border-b border-primary/20 pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center neon-glow">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Agente</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-accent font-mono">
                  STATUS: CONECTADO
                </div>
              </div>
            )}

            {/* Menu Actions */}
            <div className="space-y-4">
              <Button
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
                variant="outline"
                className="w-full cyber-border text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Desconectar Sistema
              </Button>
            </div>
            
            {/* Sistema Info */}
            <div className="mt-8 text-center space-y-2">
              <div className="text-xs text-muted-foreground font-mono">
                CYBERVAULT v1.0
              </div>
              <div className="text-xs text-primary font-mono">
                SISTEMA SEGURO ATIVO
              </div>
            </div>
          </div>
          
          {/* Efeito Matrix no menu */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-matrix-rain"
                style={{
                  left: `${6.67 * i}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}