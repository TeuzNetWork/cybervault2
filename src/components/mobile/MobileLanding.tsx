import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Lock, 
  Key, 
  Terminal, 
  Globe, 
  Star, 
  ArrowRight, 
  Zap,
  Eye
} from 'lucide-react';

// Landing page mobile personalizada - CyberVault
// Matheus Fernandes - Design otimizado para touch
export function MobileLanding() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Lock,
      title: 'Criptografia Militar',
      description: 'AES-256 para máxima proteção dos seus dados',
      color: 'from-primary/20 to-accent/20'
    },
    {
      icon: Key,
      title: 'Gerador de Senhas',
      description: 'Algoritmos avançados para senhas ultra-seguras',
      color: 'from-accent/20 to-primary/20'
    },
    {
      icon: Terminal,
      title: 'Interface Hacker',
      description: 'Design cyberpunk responsivo e imersivo',
      color: 'from-primary/30 to-secondary/20'
    },
    {
      icon: Globe,
      title: 'Acesso Universal',
      description: 'Sincronização segura entre dispositivos',
      color: 'from-secondary/20 to-accent/20'
    },
    {
      icon: Star,
      title: 'Organização Smart',
      description: 'Categorias e favoritos para acesso rápido',
      color: 'from-accent/30 to-primary/20'
    },
    {
      icon: Shield,
      title: 'Segurança Zero-Trust',
      description: 'Criptografia local antes do upload',
      color: 'from-destructive/20 to-primary/20'
    }
  ];

  return (
    <div className="lg:hidden min-h-screen bg-background relative overflow-hidden">
      {/* Matrix Rain Effect Mobile */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-matrix-rain"
            style={{
              left: `${8.33 * (i + 1)}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random()}s`
            }}
          />
        ))}
      </div>

      {/* Hero Mobile */}
      <section className="relative z-10 px-4 pt-20 pb-12 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center neon-glow mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4 glitch-text" data-text="CyberVault">
            CyberVault
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6 typing-effect">
            Gerenciador Ultra Seguro
          </p>
          
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-8">
            Proteja suas credenciais com tecnologia de criptografia militar. Interface cyberpunk, segurança absoluta.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          <Button 
            size="lg" 
            onClick={() => navigate('/auth')}
            className="neon-glow animate-glow-pulse w-full max-w-xs"
          >
            <Zap className="w-5 h-5 mr-2" />
            Iniciar Acesso Seguro
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.getElementById('mobile-features')?.scrollIntoView({ behavior: 'smooth' })}
            className="cyber-border w-full max-w-xs"
          >
            <Eye className="w-5 h-5 mr-2" />
            Explorar Sistema
          </Button>
        </div>
      </section>

      {/* Features Mobile */}
      <section id="mobile-features" className="px-4 py-12 bg-card/20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Recursos Avançados
          </h2>
          <p className="text-sm text-muted-foreground">
            Tecnologia de ponta para máxima segurança
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="cyber-border bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center neon-glow shrink-0`}>
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Mobile */}
      <section className="px-4 py-12 bg-gradient-to-br from-primary/5 to-accent/5 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Pronto para Proteger Suas Senhas?
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
          Junte-se à revolução da segurança digital. Crie sua conta e proteja suas credenciais agora.
        </p>
        
        <Button 
          size="lg" 
          onClick={() => navigate('/auth')}
          className="neon-glow animate-glow-pulse w-full max-w-xs"
        >
          <Shield className="w-5 h-5 mr-2" />
          Criar Conta Segura
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        {/* Sistema Info Mobile */}
        <div className="mt-12 pt-8 border-t border-primary/20 text-center space-y-2">
          <div className="text-xs text-muted-foreground font-mono">
            CYBERVAULT SYSTEM v1.0
          </div>
          <div className="text-xs text-primary font-mono">
            DESENVOLVIDO POR MATHEUS FERNANDES
          </div>
          <div className="text-xs text-accent font-mono">
            SEGURANÇA MILITAR ATIVA
          </div>
        </div>
      </section>
    </div>
  );
}