import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { VaultItem } from '@/components/VaultItem';
import { AddVaultDialog } from '@/components/AddVaultDialog';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileVaultGrid } from '@/components/mobile/MobileVaultGrid';
import { Footer } from '@/components/Footer';
import { Plus, Search, Shield, Lock, Zap, User, LogOut, Globe, Key, FileText, Star } from 'lucide-react';

// Dashboard principal do CyberVault - Matheus Fernandes
// Sistema completo de gerenciamento com interface cyberpunk responsiva

// Tipo para os dados do cofre
interface DadosCofre {
  id: string;
  title: string;
  website_url?: string;
  username?: string;
  encrypted_password?: string;
  notes?: string;
  category: string;
  is_favorite: boolean;
  created_at: string;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [cofres, setCofres] = useState<DadosCofre[]>([]);
  const [cofresFiltrados, setCofresFiltrados] = useState<DadosCofre[]>([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('all');
  const [carregandoDados, setCarregandoDados] = useState(true);
  const [mostrarDialogAdicionar, setMostrarDialogAdicionar] = useState(false);

  // Minhas categorias personalizadas - pensei bem nessa organização
  const categorias = [
    { value: 'all', label: 'Todos', icon: Globe },
    { value: 'general', label: 'Geral', icon: Key },
    { value: 'social', label: 'Social', icon: User },
    { value: 'work', label: 'Trabalho', icon: FileText },
    { value: 'financial', label: 'Financeiro', icon: Shield },
  ];

  useEffect(() => {
    if (user) {
      buscarCofres();
    }
  }, [user]);

  useEffect(() => {
    filtrarCofres();
  }, [cofres, termoBusca, categoriaAtiva]);

  const buscarCofres = async () => {
    try {
      const { data, error } = await supabase
        .from('vaults')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCofres(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao carregar seus dados.',
      });
    } finally {
      setCarregandoDados(false);
    }
  };

  // Sistema de filtros que desenvolvi - funciona muito bem
  const filtrarCofres = () => {
    let cofresTemp = cofres;

    if (termoBusca) {
      cofresTemp = cofresTemp.filter(cofre =>
        cofre.title.toLowerCase().includes(termoBusca.toLowerCase()) ||
        cofre.website_url?.toLowerCase().includes(termoBusca.toLowerCase()) ||
        cofre.username?.toLowerCase().includes(termoBusca.toLowerCase())
      );
    }

    if (categoriaAtiva !== 'all') {
      cofresTemp = cofresTemp.filter(cofre => cofre.category === categoriaAtiva);
    }

    setCofresFiltrados(cofresTemp);
  };

  const handleCofreAdicionado = () => {
    buscarCofres();
    setMostrarDialogAdicionar(false);
  };

  const handleCofreAtualizado = () => {
    buscarCofres();
  };

  const handleCofreRemovido = () => {
    buscarCofres();
  };

  // Separando favoritos dos demais - organização é tudo
  const cofresFavoritos = cofresFiltrados.filter(c => c.is_favorite);
  const cofresRegulares = cofresFiltrados.filter(c => !c.is_favorite);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader />
      
      {/* Desktop Header */}
      <header className="hidden lg:block border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center neon-glow">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">CyberVault</h1>
                <p className="text-xs text-muted-foreground">Sistema Seguro</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-primary" />
                <span className="text-foreground">{user?.email}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="cyber-border"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-0 lg:px-4 pt-16 lg:pt-8 pb-8">
        {/* Controls Desktop */}
        <div className="hidden lg:flex flex-col gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar senhas..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="pl-10 cyber-border"
              />
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categorias.map((categoria) => {
              const Icon = categoria.icon;
              return (
                <Button
                  key={categoria.value}
                  variant={categoriaAtiva === categoria.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoriaAtiva(categoria.value)}
                  className="cyber-border"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {categoria.label}
                </Button>
              );
            })}
          </div>

          <Button 
            onClick={() => setMostrarDialogAdicionar(true)}
            className="neon-glow animate-glow-pulse w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Entrada
          </Button>
        </div>

        {/* Controls Mobile */}
        <div className="lg:hidden px-4 mb-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar no cofre..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="pl-10 cyber-border bg-card/50"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categorias.map((categoria) => {
                const Icon = categoria.icon;
                return (
                  <Button
                    key={categoria.value}
                    variant={categoriaAtiva === categoria.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategoriaAtiva(categoria.value)}
                    className="cyber-border whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {categoria.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Desktop */}
        <div className="hidden lg:grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="cyber-border bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Total de Senhas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{cofres.length}</p>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                Favoritas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-accent">{cofresFavoritos.length}</p>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Categorias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{new Set(cofres.map(c => c.category)).size}</p>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-destructive" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="default" className="bg-primary text-primary-foreground">
                Ativo
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Listagem dos Cofres */}
        {carregandoDados ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando dados seguros...</p>
          </div>
        ) : cofresFiltrados.length === 0 ? (
          <div className="px-4 lg:px-0">
            <Card className="cyber-border bg-card/50">
              <CardContent className="text-center py-12">
                <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma entrada encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  {termoBusca || categoriaAtiva !== 'all' 
                    ? 'Tente ajustar os filtros de busca.'
                    : 'Comece adicionando sua primeira entrada segura.'
                  }
                </p>
                {!termoBusca && categoriaAtiva === 'all' && (
                  <Button onClick={() => setMostrarDialogAdicionar(true)} className="neon-glow">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Primeira Entrada
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Desktop Grid */}
            <div className="hidden lg:block">
              <div className="space-y-6">
                {cofresFavoritos.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-accent" />
                      Favoritas
                    </h2>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {cofresFavoritos.map((cofre) => (
                        <VaultItem
                          key={cofre.id}
                          vault={cofre}
                          onUpdated={handleCofreAtualizado}
                          onDeleted={handleCofreRemovido}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {cofresRegulares.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      Todas as Entradas
                    </h2>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {cofresRegulares.map((cofre) => (
                        <VaultItem
                          key={cofre.id}
                          vault={cofre}
                          onUpdated={handleCofreAtualizado}
                          onDeleted={handleCofreRemovido}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Grid */}
            <MobileVaultGrid 
              vaults={cofresFiltrados}
              onUpdated={handleCofreAtualizado}
              onDeleted={handleCofreRemovido}
            />
          </>
        )}

        {/* Floating Add Button - Mobile */}
        <div className="lg:hidden fixed bottom-6 right-6 z-30">
          <Button 
            onClick={() => setMostrarDialogAdicionar(true)}
            size="lg"
            className="w-14 h-14 rounded-full neon-glow animate-glow-pulse shadow-2xl"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </main>

      <Footer />

      <AddVaultDialog
        open={mostrarDialogAdicionar}
        onOpenChange={setMostrarDialogAdicionar}
        onVaultAdded={handleCofreAdicionado}
      />
    </div>
  );
}