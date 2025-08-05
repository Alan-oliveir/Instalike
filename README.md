# Instalike Backend

Uma API backend para aplicação de compartilhamento de imagens inspirada no Instagram, desenvolvida em Node.js com Express e MongoDB.

## 📋 Descrição

O Instalike Backend é uma aplicação robusta que fornece todas as funcionalidades necessárias para uma plataforma de compartilhamento de imagens. A aplicação permite upload de imagens, geração automática de descrições usando inteligência artificial (Google Gemini), e gerenciamento completo de posts.

## 🚀 Funcionalidades

- **📸 Upload de Imagens**: Sistema de upload com Multer e armazenamento local
- **🤖 IA Integrada**: Geração automática de descrições usando Google Gemini AI
- **📝 CRUD de Posts**: Operações completas de Create, Read, Update para posts
- **🗄️ Banco de Dados**: Integração com MongoDB Atlas
- **📁 Servidor de Arquivos**: Servir imagens estáticas via Express
- **🔄 Auto-reload**: Desenvolvimento com hot-reload usando `--watch`
- **🎨 Frontend Moderno**: Interface responsiva inspirada no Instagram
- **📱 Mobile-First**: Design adaptativo para todos os dispositivos

## 🤝 Stack Tecnológica

### 🎓 Backend (Alura) + 🤖 Frontend (GitHub Copilot)
Este projeto demonstra a **sinergia perfeita** entre aprendizado estruturado e desenvolvimento assistido por IA:

- **Backend robusto**: Desenvolvido seguindo as melhores práticas da Imersão Alura
- **Frontend moderno**: Criado com agilidade e qualidade usando GitHub Copilot
- **Integração fluida**: APIs e interface trabalhando em harmonia
- **Resultado profissional**: Aplicação completa e pronta para uso

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Multer** - Middleware para upload de arquivos
- **Google Generative AI (Gemini)** - IA para geração de descrições
- **ES6 Modules** - Módulos JavaScript modernos

## 📁 Estrutura do Projeto

```
instalike-back/
├── frontend/                    # Interface web moderna
│   ├── index.html              # Página principal
│   ├── css/
│   │   └── style.css           # Estilos responsivos
│   ├── js/
│   │   ├── api.js              # Serviços de API
│   │   ├── upload.js           # Upload de imagens
│   │   ├── feed.js             # Feed de posts
│   │   └── app.js              # App principal
│   └── README.md               # Documentação do frontend
├── src/
│   ├── config/
│   │   └── dbConfig.js          # Configuração do banco de dados
│   ├── controllers/
│   │   └── postsControllers.js  # Controladores dos posts
│   ├── models/
│   │   └── postsModels.js       # Modelos de dados
│   ├── routes/
│   │   └── postsRoutes.js       # Definição das rotas
│   └── services/
│       └── geminiService.js     # Serviço de IA
├── uploads/                     # Diretório de imagens
├── server.js                    # Servidor principal
└── package.json                 # Dependências e scripts
```

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js >= 14.0.0
- npm >= 6.0.0
- Conta no MongoDB Atlas
- API Key do Google Gemini

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Alan-oliveir/Instalike.git
cd instalike-back
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto:
```env
STRING_CONNECTION=mongodb+srv://username:password@cluster.mongodb.net/
API_KEY=sua_chave_api_gemini
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:4000`

### 🎨 Acessando o Frontend

Após iniciar o servidor, você pode acessar:

- **Frontend**: http://localhost:4000
- **API Posts**: http://localhost:4000/posts
- **Imagens**: http://localhost:4000/[nome-da-imagem]

### 🖥️ Interface Web

O projeto inclui uma interface web moderna e responsiva que oferece:

- **Feed de Posts**: Visualização cronológica das imagens
- **Upload Intuitivo**: Drag & drop para envio de imagens
- **IA Integrada**: Botão para gerar descrições automáticas
- **Busca em Tempo Real**: Pesquise nas descrições e textos alternativos
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Atalhos de Teclado**: Ctrl+K para upload, R para refresh

Para mais detalhes sobre o frontend, consulte: [`frontend/README.md`](frontend/README.md)

## 📡 Endpoints da API

### Posts

- **GET** `/posts` - Lista todos os posts
- **POST** `/posts` - Cria um novo post
- **POST** `/upload` - Faz upload de uma imagem
- **PUT** `/upload/:id` - Atualiza descrição do post com IA

### Exemplos de Uso

#### Listar Posts
```bash
GET http://localhost:4000/posts
```

#### Upload de Imagem
```bash
POST http://localhost:4000/upload
Content-Type: multipart/form-data

imagem: [arquivo]
descricao: "Descrição opcional"
alt: "Texto alternativo"
```

#### Atualizar com IA
```bash
PUT http://localhost:4000/upload/67414584746b6cadcac5b9d7
Content-Type: application/json

{
  "alt": "Texto alternativo atualizado"
}
```

## 🗄️ Estrutura do Banco de Dados

### Collection: posts
```javascript
{
  _id: ObjectId,
  descricao: String,
  imgUrl: String,
  alt: String
}
```

## 🤖 Integração com IA

O projeto utiliza o Google Gemini AI para gerar descrições automáticas das imagens. Quando uma imagem é enviada via PUT para `/upload/:id`, o sistema:

1. Lê a imagem do sistema de arquivos
2. Converte para base64
3. Envia para o Gemini AI
4. Recebe a descrição em português
5. Atualiza o post no banco de dados

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor com auto-reload
- `npm test` - (Ainda não implementado)

## 📝 Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `STRING_CONNECTION` | String de conexão do MongoDB Atlas |
| `API_KEY` | Chave da API do Google Gemini |

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## 🎓 Créditos e Agradecimentos

### 🚀 Alura - Imersão Dev Backend
O backend deste projeto foi desenvolvido durante a **Imersão Dev Backend da Alura**, um curso intensivo focado em desenvolvimento de APIs Node.js. A imersão cobriu:

- Desenvolvimento de APIs RESTful com Express.js
- Integração com MongoDB Atlas
- Upload de arquivos com Multer
- Integração com Google Gemini AI
- Boas práticas de desenvolvimento backend

**Agradecimentos especiais à equipe da Alura** pelo excelente conteúdo e metodologia de ensino que tornaram possível a criação deste projeto.

🔗 **Saiba mais**: [Alura - Cursos de Tecnologia](https://www.alura.com.br/)

### 🤖 GitHub Copilot
O **frontend moderno e responsivo** foi desenvolvido com o auxílio do **GitHub Copilot**, demonstrando o poder da IA para acelerar o desenvolvimento de interfaces:

- Interface completa inspirada no Instagram
- Código JavaScript ES6+ otimizado
- CSS responsivo e moderno
- Integração perfeita com o backend existente
- Funcionalidades avançadas (drag & drop, busca em tempo real, etc.)

O Copilot ajudou a criar uma experiência de usuário profissional em tempo recorde, mantendo as melhores práticas de desenvolvimento.

## �️ Processo de Desenvolvimento

### 📚 Backend - Imersão Alura
O desenvolvimento do backend seguiu a metodologia da **Imersão Dev Backend da Alura**:

1. **Estruturação do projeto**: Organização MVC com Express.js
2. **Banco de dados**: Configuração e integração com MongoDB Atlas
3. **APIs RESTful**: Desenvolvimento de endpoints para CRUD
4. **Upload de arquivos**: Implementação com Multer
5. **Integração IA**: Conexão com Google Gemini para descrições automáticas
6. **Boas práticas**: Estrutura de código limpa e manutenível

### 🤖 Frontend - GitHub Copilot
O frontend foi criado como uma **extensão natural do backend**, utilizando o poder do GitHub Copilot:

1. **Análise técnica**: Estudo das APIs e estruturas existentes
2. **Design system**: Criação de interface inspirada no Instagram
3. **Desenvolvimento iterativo**: Construção progressiva de componentes
4. **Integração fluida**: Conexão perfeita com backend Alura
5. **Otimização**: Performance, responsividade e acessibilidade
6. **Documentação**: README detalhado para manutenção

### 🔄 Sinergia Backend + Frontend
A combinação do **aprendizado estruturado da Alura** com a **agilidade do GitHub Copilot** resultou em:

- **API robusta** e **interface moderna**
- **Código de qualidade** em ambas as camadas
- **Integração perfeita** entre tecnologias
- **Experiência completa** para o usuário final
- **Projeto profissional** pronto para produção

## �👥 Autor

**Alan Oliveira**
- GitHub: [@Alan-oliveir](https://github.com/Alan-oliveir)

---

⭐ Deixe uma estrela se este projeto te ajudou!
