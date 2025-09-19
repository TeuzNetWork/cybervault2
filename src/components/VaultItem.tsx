import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Key
} from 'lucide-react';

// Componente de item do cofre - CyberVault
// Matheus Fernandes - Interface cyberpunk personalizada

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

interface VaultItemProps {
  vault: Vault;
  onUpdated: () => void;
  onDeleted: () => void;
}

// Mapeamento de ícones por categoria - sistema próprio
const getCategoryIcon = (category: string) => {
  const icons = {
    general: Key,
    social: User,
    work: FileText,
    financial: Shield,
  };
  return icons[category as keyof typeof icons] || Globe;
};

// Mapeamento de cores por categoria - paleta cyberpunk personalizada
const getCategoryColor = (category: string) => {
  const colors = {
    general: 'bg-primary/20 text-primary',
    social: 'bg-accent/20 text-accent',
    work: 'bg-secondary/20 text-secondary-foreground',
    financial: 'bg-destructive/20 text-destructive',
  };
  return colors[category as keyof typeof colors] || 'bg-muted/20 text-muted-foreground';
};

export function VaultItem({ vault, onUpdated, onDeleted }: VaultItemProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { toast } = useToast();

  // Minha função personalizada para copiar dados
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copiado!",
        description: `${type} copiado para a área de transferência.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao copiar para área de transferência.",
      });
    }
  };

  const toggleFavorite = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('vaults')
        .update({ is_favorite: !vault.is_favorite })
        .eq('id', vault.id);

      if (error) throw error;

      toast({
        title: vault.is_favorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
        description: "Alteração salva com sucesso.",
      });
      onUpdated();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao atualizar favorito.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVault = async () => {
    if (!confirm('Tem certeza que deseja excluir esta entrada?')) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('vaults')
        .delete()
        .eq('id', vault.id);

      if (error) throw error;

      toast({
        title: "Entrada excluída",
        description: "A entrada foi removida com segurança.",
      });
      onDeleted();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao excluir entrada.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const CategoryIcon = getCategoryIcon(vault.category);

  return (
    <>
      <Card className="cyber-border bg-card/50 hover:bg-card/70 transition-all duration-300 group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <CategoryIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg line-clamp-1">{vault.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge variant="secondary" className={getCategoryColor(vault.category)}>
                    {vault.category}
                  </Badge>
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFavorite}
              disabled={isLoading}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {vault.is_favorite ? (
                <Star className="w-4 h-4 fill-accent text-accent" />
              ) : (
                <StarOff className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {vault.website_url && (
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Website</p>
                <p className="text-sm font-mono truncate">{vault.website_url}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(vault.website_url!, 'Website')}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(vault.website_url, '_blank')}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}

          {vault.username && (
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Usuário</p>
                <p className="text-sm font-mono truncate">{vault.username}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(vault.username!, 'Usuário')}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          )}

          {vault.encrypted_password && (
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Senha</p>
                <p className="text-sm font-mono truncate">
                  {showPassword ? vault.encrypted_password : '••••••••••••'}
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(vault.encrypted_password!, 'Senha')}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}

          {vault.notes && (
            <div>
              <p className="text-sm text-muted-foreground">Notas</p>
              <p className="text-sm line-clamp-2">{vault.notes}</p>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              {new Date(vault.created_at).toLocaleDateString('pt-BR')}
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditDialog(true)}
                className="cyber-border"
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={deleteVault}
                disabled={isLoading}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditVaultDialog
        vault={vault}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onVaultUpdated={onUpdated}
      />
    </>
  );
}