import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Hook personalizado para gerenciar autenticação do CyberVault
// Desenvolvido por Matheus Fernandes

// Definindo os tipos para o contexto de auth
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, nomeCompleto: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuarioAtual, setUsuarioAtual] = useState<User | null>(null);
  const [sessaoAtiva, setSessaoAtiva] = useState<Session | null>(null);
  const [carregando, setCarregando] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Configurando o listener de mudanças de auth - sempre faço isso primeiro
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (evento, sessao) => {
        setSessaoAtiva(sessao);
        setUsuarioAtual(sessao?.user ?? null);
        setCarregando(false);
        
        // Só mostra toast de boas-vindas em logins frescos, não na restauração de sessão
        // Aprendi isso da forma difícil depois de ficar aparecendo toda hora
        if (evento === 'SIGNED_IN' && !sessao?.user?.last_sign_in_at) {
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo ao CyberVault",
          });
        }
      }
    );

    // Depois verifico se já tem sessão ativa
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessaoAtiva(session);
      setUsuarioAtual(session?.user ?? null);
      setCarregando(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const registrarUsuario = async (email: string, password: string, nomeCompleto: string) => {
    const urlRedirecionamento = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: urlRedirecionamento,
        data: {
          full_name: nomeCompleto, // Mantendo o padrão do supabase
        }
      }
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: error.message,
      });
    } else {
      toast({
        title: "Cadastro realizado!",
        description: "Verifique seu email para confirmar a conta.",
      });
    }

    return { error };
  };

  const fazerLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: error.message,
      });
    } else {
      // Toast de boas-vindas imediato no login bem-sucedido
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao CyberVault",
      });
    }

    return { error };
  };

  const deslogar = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com segurança.",
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user: usuarioAtual,
      session: sessaoAtiva,
      loading: carregando,
      signUp: registrarUsuario,
      signIn: fazerLogin,
      signOut: deslogar,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto de auth - sempre uso esse padrão
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (contexto === undefined) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider');
  }
  return contexto;
}