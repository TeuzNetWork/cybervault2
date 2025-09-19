import { Shield, Code, Heart } from 'lucide-react';

// Footer personalizado do CyberVault - Matheus Fernandes
export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-card/30 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center neon-glow">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-primary">CyberVault</h3>
              <p className="text-xs text-muted-foreground">Sistema de Segurança Avançado</p>
            </div>
          </div>
          
          {/* Minha assinatura personalizada */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Desenvolvido com</span>
            <Heart className="w-4 h-4 text-destructive animate-pulse" />
            <span>por</span>
            <div className="flex items-center gap-1 text-primary font-semibold">
              <Code className="w-4 h-4" />
              <span>Matheus Fernandes</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 CyberVault. Todos os direitos reservados. Sistema protegido por criptografia militar.
          </p>
        </div>
      </div>
    </footer>
  );
}