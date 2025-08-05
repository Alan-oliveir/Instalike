# Instalike Frontend

Interface moderna e responsiva para o Instalike, inspirada no Instagram.

## 🎨 Características do Design

- **Design Moderno**: Interface limpa e minimalista inspirada no Instagram
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Suaves**: Transições e animações fluidas para melhor UX
- **Tema Claro**: Design clean com cores suaves e gradientes modernos

## ⚡ Funcionalidades

### 📸 Upload de Imagens
- **Drag & Drop**: Arraste imagens diretamente para a área de upload
- **Validação**: Verifica tipo e tamanho dos arquivos
- **Preview**: Visualização do arquivo selecionado
- **Formulário Completo**: Campos para descrição e texto alternativo

### 🤖 IA Integrada
- **Descrições Automáticas**: Botão para gerar descrições usando Google Gemini
- **Feedback Visual**: Indicadores de carregamento e status
- **Fallback**: Tratamento de erros da API de IA

### 📱 Feed Interativo
- **Timeline**: Visualização cronológica dos posts
- **Likes**: Sistema de curtidas com animação
- **Auto-refresh**: Atualização automática do feed
- **Estados Vazios**: Telas para quando não há posts

### 🔍 Busca Inteligente
- **Busca em Tempo Real**: Pesquisa nas descrições e textos alternativos
- **Debounce**: Otimização para evitar muitas requisições
- **Filtros Visuais**: Highlight dos resultados encontrados

### ⌨️ Atalhos de Teclado
- **Ctrl/Cmd + K**: Abrir modal de upload
- **Escape**: Fechar modal
- **R**: Atualizar feed

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica moderna
- **CSS3**: Flexbox, Grid, animations, custom properties
- **JavaScript ES6+**: Classes, async/await, fetch API
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia Inter

## 📁 Estrutura dos Arquivos

```
frontend/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos principais
└── js/
    ├── api.js          # Serviços de API
    ├── upload.js       # Funcionalidade de upload
    ├── feed.js         # Gerenciamento do feed
    └── app.js          # Aplicação principal
```

## 🚀 Como Usar

1. **Certifique-se que o backend está rodando**:
   ```bash
   npm run dev
   ```

2. **Acesse o frontend**:
   - Abra: http://localhost:4000
   - O frontend é servido pelo mesmo servidor Express

3. **Funcionalidades Disponíveis**:
   - Visualizar posts existentes
   - Fazer upload de novas imagens
   - Gerar descrições com IA
   - Buscar posts
   - Curtir posts

## 📱 Responsividade

### Desktop (1200px+)
- Layout completo com sidebar
- Imagens em alta resolução
- Todas as funcionalidades disponíveis

### Tablet (768px - 1199px)
- Layout adaptado para toque
- Barra de busca oculta em telas menores
- Botões otimizados para toque

### Mobile (< 768px)
- Interface otimizada para mobile
- Gestos de toque
- Modal fullscreen
- Navegação simplificada

## 🎯 Componentes Principais

### Modal de Upload
- Interface intuitiva para upload
- Drag & drop functionality
- Validação de arquivos
- Formulário com preview

### Feed de Posts
- Cards responsivos
- Sistema de likes
- Geração de descrições IA
- Auto-refresh

### Sistema de Notificações
- Toasts para feedback
- Animações suaves
- Diferentes tipos (success, error, info)

### Barra de Busca
- Pesquisa em tempo real
- Highlight de resultados
- Filtros dinâmicos

## 🔧 Personalização

### Cores e Tema
As principais variáveis CSS podem ser encontradas no início do `style.css`:

```css
:root {
  --primary-gradient: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
  --text-primary: #262626;
  --text-secondary: #8e8e8e;
  --background: #fafafa;
  --surface: #ffffff;
  --border: #dbdbdb;
}
```

### Animações
Todas as animações podem ser customizadas modificando os `@keyframes` no CSS.

## 🐛 Troubleshooting

### Problemas Comuns

1. **Imagens não carregam**:
   - Verifique se o backend está rodando
   - Confirme que a pasta `uploads/` tem as imagens

2. **Upload não funciona**:
   - Verifique a conexão com o backend
   - Confirme que o arquivo é uma imagem válida

3. **IA não gera descrições**:
   - Verifique se a API Key do Gemini está configurada
   - Confirme que há conexão com internet

4. **Feed não atualiza**:
   - Pressione F5 para reload completo
   - Verifique console para erros de API

## 🔄 Auto-refresh

O frontend atualiza automaticamente:
- **A cada 30 segundos** (quando ativo)
- **Ao voltar para a aba** (após ausência)
- **Após uploads bem-sucedidos**
- **Ao pressionar 'R'**

## 🎓 Desenvolvimento

### 🤖 Criado com GitHub Copilot
Este frontend foi **inteiramente desenvolvido com o auxílio do GitHub Copilot**, demonstrando o potencial da IA para acelerar o desenvolvimento web:

#### ✨ **O que o Copilot ajudou a criar:**
- **Interface completa**: HTML semântico e estruturado
- **CSS moderno**: Flexbox, Grid, animações e responsividade
- **JavaScript avançado**: Classes ES6+, async/await, fetch API
- **UX profissional**: Drag & drop, toasts, modais, atalhos
- **Integração perfeita**: Comunicação com backend existente

#### 🚀 **Metodologia utilizada:**
1. **Análise do backend**: Compreensão das APIs disponíveis
2. **Design inspirado**: Interface baseada no Instagram
3. **Desenvolvimento iterativo**: Componentes criados progressivamente
4. **Integração contínua**: Testes e ajustes em tempo real
5. **Otimização**: Performance e acessibilidade

#### 📊 **Resultados alcançados:**
- **100% responsivo**: Desktop, tablet e mobile
- **Performance otimizada**: Carregamento rápido e fluido
- **Código limpo**: Estrutura organizada e manutenível
- **Funcionalidades completas**: Upload, IA, busca, likes
- **Experiência moderna**: Interface profissional e intuitiva

### 🎯 **Integração Backend-Frontend**
O Copilot foi fundamental para criar uma **integração perfeita** entre o backend (desenvolvido na Imersão Alura) e o frontend, utilizando:

- **APIs REST existentes**: Aproveitamento total das rotas
- **Upload de arquivos**: Compatibilidade com Multer
- **IA Gemini**: Integração com serviço de descrições
- **MongoDB**: Visualização dos dados existentes

## 🔗 Recursos Utilizados

- **[GitHub Copilot](https://github.com/features/copilot)**: Assistente de IA para desenvolvimento
- **[Alura](https://www.alura.com.br/)**: Imersão Dev Backend (backend)
- **[Font Awesome](https://fontawesome.com/)**: Biblioteca de ícones
- **[Google Fonts](https://fonts.google.com/)**: Tipografia Inter
