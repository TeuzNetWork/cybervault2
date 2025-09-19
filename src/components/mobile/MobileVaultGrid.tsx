import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { EditVaultDialog } from '@/components/EditVaultDialog';
import { 
  Copy, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Star,
  StarOff,
  Globe,
  User,
  FileText,
  Shield,
  Key,
  ChevronRight,
  Lock
} from 'lucide-react';

// Grid de cofres mobile - CyberVault
// Matheus Fernandes - Layout otimizado para touch
interface Vault {
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

interface MobileVaultGridProps {
  vaults: Vault[];
  onUpdated: () => void;
  onDeleted: () => void;
}

const getCategoryIcon = (category: string) => {
  const icons = {
    general: Key,
    social: User,
    work: FileText,
    financial: Shield,
  };
  return icons[category as keyof typeof icons] || Globe;
};

const getCategoryColor = (category: string) => {
  const colors = {
    general: 'bg-primary/20 text-primary border-primary/30',
    social: 'bg-accent/20 text-accent border-accent/30',
    work: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
    financial: 'bg-destructive/20 text-destructive border-destructive/30',
  };
  return colors[category as keyof typeof colors] || 'bg-muted/20 text-muted-foreground border-muted/30';
};

export function MobileVaultGrid({ vaults, onUpdated, onDeleted }: MobileVaultGridProps) {
  const [expandedVault, setExpandedVault] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
  const [editingVault, setEditingVault] = useState<Vault | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "✓ Copiado!",
        description: `${type} copiado com sucesso.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro de Sistema",
        description: "Falha ao copiar dados.",
      });
    }
  };

  const toggleFavorite = async (vault: Vault) => {
    try {
      const { error } = await supabase
        .from('vaults')
        .update({ is_favorite: !vault.is_favorite })
        .eq('id', vault.id);

      if (error) throw error;
      onUpdated();
      
      toast({
        title: vault.is_favorite ? "★ Favorito Removido" : "⭐ Favorito Adicionado",
        description: "Status atualizado com sucesso.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro de Sistema",
        description: "Falha ao atualizar favorito.",
      });
    }
  };

  const deleteVault = async (vault: Vault) => {
    if (!confirm(`🗑️ Excluir "${vault.title}"?\n\nEsta ação é irreversível.`)) return;

    try {
      const { error } = await supabase
        .from('vaults')
        .delete()
        .eq('id', vault.id);

      if (error) throw error;
      onDeleted();
      
      toast({
        title: "🗑️ Entrada Excluída",
        description: "Dados removidos do sistema.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro de Sistema",
        description: "Falha ao excluir entrada.",
      });
    }
  };

  return (
    <>
      <div className="lg:hidden grid gap-4 px-4 pb-20">
        {vaults.map((vault) => {
          const CategoryIcon = getCategoryIcon(vault.category);
          const isExpanded = expandedVault === vault.id;
          
          return (
            <Card 
              key={vault.id}
              className="cyber-border bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 overflow-hidden"
            >
              {/* Header Compacto */}
              <CardHeader 
                className="pb-3 cursor-pointer"
                onClick={() => setExpandedVault(isExpanded ? null : vault.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg flex items-center justify-center neon-glow">
                      <CategoryIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate text-primary">
                        {vault.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getCategoryColor(vault.category)} mt-1`}
                      >
                        {vault.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {vault.is_favorite && (
                      <Star className="w-4 h-4 fill-accent text-accent" />
                    )}
                    <ChevronRight 
                      className={`w-4 h-4 text-muted-foreground transition-transform ${
                        isExpanded ? 'rotate-90' : ''
                      }`} 
                    />
                  </div>
                </div>
              </CardHeader>

              {/* Conteúdo Expansível */}
              {isExpanded && (
                <CardContent className="pt-0 space-y-4 animate-fade-in">
                  {vault.website_url && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-mono">WEBSITE</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono flex-1 truncate bg-secondary/20 px-3 py-2 rounded-md">
                          {vault.website_url}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(vault.website_url!, 'Website')}
                          className="cyber-border p-2"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(vault.website_url, '_blank')}
                          className="cyber-border p-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {vault.username && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-mono">USUÁRIO</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono flex-1 truncate bg-secondary/20 px-3 py-2 rounded-md">
                          {vault.username}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(vault.username!, 'Usuário')}
                          className="cyber-border p-2"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {vault.encrypted_password && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-mono">SENHA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono flex-1 truncate bg-secondary/20 px-3 py-2 rounded-md">
                          {showPassword[vault.id] ? vault.encrypted_password : '••••••••••••'}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword({
                            ...showPassword,
                            [vault.id]: !showPassword[vault.id]
                          })}
                          className="cyber-border p-2"
                        >
                          {showPassword[vault.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(vault.encrypted_password!, 'Senha')}
                          className="cyber-border p-2"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {vault.notes && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-mono">NOTAS</span>
                      </div>
                      <div className="text-sm bg-secondary/20 px-3 py-2 rounded-md">
                        {vault.notes}
                      </div>
                    </div>
                  )}

                  {/* Actions Mobile */}
                  <div className="flex justify-between items-center pt-4 border-t border-primary/20">
                    <span className="text-xs text-muted-foreground font-mono">
                      {new Date(vault.created_at).toLocaleDateString('pt-BR')}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(vault)}
                        className="cyber-border p-2"
                      >
                        {vault.is_favorite ? (
                          <Star className="w-4 h-4 fill-accent text-accent" />
                        ) : (
                          <StarOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingVault(vault)}
                        className="cyber-border p-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteVault(vault)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {editingVault && (
        <EditVaultDialog
          vault={editingVault}
          open={!!editingVault}
          onOpenChange={() => setEditingVault(null)}
          onVaultUpdated={onUpdated}
        />
      )}
    </>
  );
}