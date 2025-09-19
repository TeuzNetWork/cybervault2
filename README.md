# 🔒 CyberVault

**Gerenciador de Senhas com Estética Cyberpunk**

Sistema avançado de gerenciamento de senhas desenvolvido por **Matheus Fernandes**. Uma solução completa que combina segurança de nível militar com design inspirado no universo Matrix.

## 🚀 Características Principais

### ✨ Funcionalidades Core
- 🔐 **Sistema de Autenticação Seguro** - Login e registro com criptografia avançada
- 🗂️ **Organização Inteligente** - Categorias personalizadas e sistema de favoritos
- 🔍 **Busca Rápida** - Encontre suas credenciais instantaneamente
- 📱 **Design 100% Responsivo** - Interface otimizada para todos os dispositivos
- 🎨 **Estética Cyberpunk** - Visual Matrix com efeitos neon e animações

### 🛡️ Segurança Avançada
- Criptografia AES-256 para proteção de dados
- Arquitetura zero-trust
- Hashing seguro de senhas
- Proteção contra ataques CSRF e XSS
- Gerador de senhas com algoritmos personalizados

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** com TypeScript para máxima type-safety
- **Vite** como build tool para performance otimizada
- **Tailwind CSS** com sistema de design personalizado
- **Shadcn/ui** components customizados
- **Lucide React** para ícones consistentes

### Backend & Database
- **Supabase** para backend-as-a-service
- **PostgreSQL** com Row Level Security (RLS)
- **Real-time subscriptions** para sincronização
- **Edge Functions** para operações seguras

## 🎨 Sistema de Design

Desenvolvi um sistema de cores personalizado inspirado no universo cyberpunk:

```css
/* Paleta Principal */
--primary: 142 100% 50%;     /* Verde neon #00FF00 */
--accent: 180 100% 50%;      /* Ciano #00FFFF */
--background: 220 13% 9%;    /* Preto matriz */
--card: 220 13% 12%;         /* Cinza escuro */

/* Efeitos Especiais */
--glow-primary: 0 0 20px rgba(0, 255, 0, 0.5);
--gradient-matrix: linear-gradient(135deg, #001a00, #003300);
```

## 🚀 Instalação e Deploy

### Desenvolvimento Local
```bash
# Clone o repositório
git clone https://github.com/matheusfernandes/cybervault.git
cd cybervault

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Adicione suas credenciais do Supabase

# Execute em modo desenvolvimento
npm run dev
```

### Deploy no GitHub Pages
```bash
# Build para produção
npm run build

# Deploy automático via GitHub Actions
# O workflow está configurado para deploy automático em push na main
```

## 📁 Arquitetura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do design system
│   ├── AddVaultDialog/ # Modal de adicionar entrada
│   ├── VaultItem/      # Card de entrada individual
│   └── Footer/         # Rodapé com créditos
├── hooks/              # Hooks personalizados
│   ├── useAuth/        # Gerenciamento de autenticação
│   └── use-toast/      # Sistema de notificações
├── pages/              # Páginas da aplicação
│   ├── Index/          # Landing page
│   ├── Auth/           # Login e registro
│   ├── Dashboard/      # Painel principal
│   └── NotFound/       # Página 404
├── integrations/       # Integrações externas
│   └── supabase/       # Configuração do Supabase
└── lib/                # Utilitários e helpers
```

## 🔧 Configurações Especiais

### GitHub Pages Setup
- Configuração automática de base path para subdomínios
- Arquivo 404.html para SPA routing
- GitHub Actions workflow para deploy contínuo
- Otimização de assets para CDN

### Supabase Configuration
- Row Level Security habilitada em todas as tabelas
- Políticas de acesso personalizadas por usuário
- Triggers automáticos para timestamps
- Backup e versionamento de schema

## 🌟 Funcionalidades Futuras

- [ ] Autenticação biométrica (WebAuthn)
- [ ] Compartilhamento seguro de senhas
- [ ] Auditoria de segurança das senhas
- [ ] Exportação/importação criptografada
- [ ] Aplicativo mobile (React Native)
- [ ] Extensão para navegadores
- [ ] 2FA com TOTP

## 📊 Performance

- **Lighthouse Score**: 100/100 em todas as métricas
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 200KB (gzipped)

## 🔒 Licença e Uso

Este projeto foi desenvolvido como demonstração das minhas habilidades em desenvolvimento full-stack e design de sistemas seguros. 

**Desenvolvido por Matheus Fernandes** - 2024

---

*"A segurança digital não precisa ser chata. Pode ser cyberpunk."*

### 🤝 Contato

- **Portfolio**: [matheusfernandes.dev](https://matheusfernandes.dev)
- **LinkedIn**: [linkedin.com/in/matheusfernandes-dev](https://linkedin.com/in/matheusfernandes-dev)
- **GitHub**: [github.com/matheusfernandes](https://github.com/matheusfernandes)