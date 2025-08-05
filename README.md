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

## 👥 Autor

**Alan Oliveira**
- GitHub: [@Alan-oliveir](https://github.com/Alan-oliveir)

---

⭐ Deixe uma estrela se este projeto te ajudou!
