import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Footer } from '@/components/Footer';
import { MobileLanding } from '@/components/mobile/MobileLanding';
import { Shield, Lock, Key, Zap, Github, Star, ArrowRight, Terminal, Globe, Eye } from 'lucide-react';

// Landing Page do CyberVault
// Matheus Fernandes - Sistema de apresentação com estética Matrix responsiva
const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <>
      {/* Mobile Version */}
      <MobileLanding />
      
      {/* Desktop Version */}
      <div className="hidden lg:block min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Matrix rain effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-matrix-rain"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center neon-glow mx-auto mb-6">
                  <Shield className="w-10 h-10 text-primary-foreground" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 glitch-text" data-text="CyberVault">
                  CyberVault
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 typing-effect">
                  Gerenciador de Senhas Ultra Seguro
                </p>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                  Proteja suas credenciais com tecnologia de criptografia militar. 
                  Interface hacker, segurança absoluta, controle total.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth')}
                  className="neon-glow animate-glow-pulse text-lg px-6 sm:px-8 py-4"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Iniciar Acesso Seguro
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="cyber-border text-lg px-6 sm:px-8 py-4"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Explorar Sistema
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 bg-card/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Recursos Avançados
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Tecnologia de ponta para máxima segurança e usabilidade
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cyber-border bg-card/50 hover:bg-card/70 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Criptografia Militar</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Algoritmos de criptografia AES-256 para proteger suas senhas com segurança de nível militar.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-card/50 hover:bg-card/70 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Key className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Gerador de Senhas</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Crie senhas ultra-seguras com algoritmos avançados. Configurável para diferentes níveis de complexidade.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-card/50 hover:bg-card/70 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Terminal className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Interface Hacker</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Design cyberpunk responsivo com animações Matrix e efeitos neon para máxima imersão.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-card/50 hover:bg-card/70 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Acesso Universal</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Sincronização em tempo real entre dispositivos. Acesse suas senhas de qualquer lugar, com segurança.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-card/50 hover:bg-card/70 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Categorização Inteligente</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Organize suas credenciais por categorias. Sistema de favoritos e busca avançada para acesso rápido.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="cyber-border bg-card/50 hover:bg-card/70 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Segurança Zero-Trust</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Arquitetura de segurança zero-trust. Seus dados são criptografados localmente antes do envio.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para Proteger Suas Senhas?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se à revolução da segurança digital. Crie sua conta e proteja suas credenciais agora.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="neon-glow animate-glow-pulse text-lg px-6 sm:px-8 py-4"
            >
              <Shield className="w-5 h-5 mr-2" />
              Criar Conta Segura
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Index;
