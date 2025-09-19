# 🚀 Indicium Backend - Sistema de Gestão de Filmes

## 📋 Descrição

Backend robusto e escalável para sistema de gestão de filmes, desenvolvido com arquitetura limpa, TypeScript e Node.js. O sistema inclui autenticação JWT, gestão de usuários, catálogo de filmes, sistema de storage com Cloudflare R2, envio de e-mails via Resend, e sistema de cron para notificações automáticas.

## 🛠️ Tecnologias Utilizadas

### **Core Technologies**

- **Node.js** (>=20.x) - Runtime JavaScript
- **TypeScript** (^5.8.3) - Linguagem de programação tipada
- **Express.js** (^5.1.0) - Framework web
- **Prisma** (^6.10.1) - ORM moderno para banco de dados

### **Banco de Dados**

- **PostgreSQL** - Banco de dados principal
- **Prisma Client** - Cliente ORM gerado automaticamente
- **Migrations** - Sistema de migrações automáticas

### **Autenticação & Segurança**

- **JWT** (^9.0.2) - JSON Web Tokens para autenticação
- **bcrypt** - Criptografia de senhas
- **Helmet** (^8.1.0) - Middleware de segurança
- **CORS** (^2.8.5) - Cross-Origin Resource Sharing

### **Validação & Transformação**

- **class-validator** (^0.14.2) - Validação de DTOs
- **class-transformer** (^0.5.1) - Transformação de objetos
- **Decorators customizados** - Sistema de validação personalizado

### **Storage & Upload**

- **Cloudflare R2** - Storage compatível com S3
- **AWS SDK S3** (^3.835.0) - Cliente para Cloudflare R2
- **Multer** (^2.0.1) - Middleware para upload de arquivos

### **E-mail & Notificações**

- **Resend** (^6.0.1) - Serviço de envio de e-mails
- **Node-Cron** (^4.2.1) - Sistema de agendamento de tarefas
- **Templates HTML** - E-mails responsivos e estilizados

### **Documentação & API**

- **Swagger/OpenAPI** (^6.2.8) - Documentação da API
- **Swagger UI** (^5.0.1) - Interface visual da documentação

### **Testes**

- **Jest** (^29.7.0) - Framework de testes
- **Supertest** (^7.0.0) - Testes de integração HTTP
- **TS-Jest** (^29.1.2) - Suporte TypeScript para Jest

### **Desenvolvimento & Qualidade**

- **ESLint** (^9.29.0) - Linter de código
- **Prettier** (^3.6.1) - Formatador de código
- **ts-node** (^10.9.2) - Execução TypeScript em desenvolvimento

### **Containerização**

- **Docker** - Containerização da aplicação
- **Node.js 22-slim** - Imagem base otimizada

## 🏗️ Arquitetura do Projeto

```
src/
├── _core/                    # Funcionalidades principais
│   ├── auth/                # Autenticação e autorização
│   ├── middlewares/         # Middlewares globais
│   └── swagger.ts          # Configuração da documentação
├── _common/                 # Utilitários compartilhados
│   ├── decorators/         # Decorators de validação
│   ├── dtos/               # Data Transfer Objects
│   ├── enums/              # Enumerações
│   ├── exceptions/         # Tratamento de erros
│   └── utils/              # Funções utilitárias
├── _init/                   # Inicialização do sistema
├── users/                   # Módulo de usuários
├── movies/                  # Módulo de filmes
├── storage/                 # Módulo de storage
├── integrations/            # Integrações externas
│   ├── cron/               # Sistema de cron jobs
│   ├── smtpEmail/          # Serviço de e-mail
│   └── s3-digitalOcean/    # Integração Cloudflare R2
└── types/                   # Definições de tipos TypeScript
```

## 🚀 Como Rodar o Projeto

### **Pré-requisitos**

- Node.js >= 20.x
- PostgreSQL
- Conta no Cloudflare R2 (para storage)
- Conta no Resend (para e-mails)

### **1. Clone o Repositório**

```bash
git clone <repository-url>
cd indicium-back
```

### **2. Instale as Dependências**

```bash
npm install
```

### **3. Configure as Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# JWT
JWT_SECRET="your-jwt-secret-key"
JWT_REFRESH_SECRET="your-jwt-refresh-secret-key"

# Cloudflare R2
CLOUDFLARE_R2_BUCKET="your-bucket-name"
CLOUDFLARE_R2_ENDPOINT="https://account_id.r2.cloudflarestorage.com"
CLOUDFLARE_R2_ACCESS_KEY_ID="your-access-key"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="your-secret-key"
CLOUDFLARE_R2_PUBLIC_URL="https://your-cdn-domain.com"

# Resend (E-mail)
RESEND_API_KEY="your-resend-api-key"
RESEND_EMAIL_SENDER="noreply@yourdomain.com"

# Server
PORT=8080
NODE_ENV=development
```

### **4. Configure o Banco de Dados**

```bash
# Gere o cliente Prisma
npm run generate:postgres

# Execute as migrações
npm run migrate:dev
```

### **5. Execute o Projeto**

#### **Desenvolvimento**

```bash
npm run dev
```

#### **Produção**

```bash
npm run build
npm start
```

#### **Docker**

```bash
docker build -t indicium-back .
docker run -p 8080:8080 indicium-back
```

## 🧪 Testes

### **Executar Todos os Testes**

```bash
npm test
```

### **Testes em Modo Watch**

```bash
npm run test:watch
```

### **Cobertura de Testes**

```bash
npm run test:coverage
```

### **Testes em CI**

```bash
npm run test:ci
```

## 📚 Funcionalidades Existentes

### **🔐 Autenticação & Usuários**

- **Registro de usuários** com validação de dados
- **Login** com JWT e refresh tokens
- **Autenticação** via middleware JWT
- **Gestão de perfis** com imagens de perfil
- **Tipos de usuário** (superAdmin, users)
- **Soft delete** para usuários

### **🎬 Gestão de Filmes**

- **CRUD completo** de filmes
- **Upload de posters** via Cloudflare R2
- **Validação de dados** com decorators customizados
- **Sistema de avaliações** e popularidade
- **Gêneros múltiplos** por filme
- **Situação do filme** (upcoming, released, canceled)
- **Metadados completos** (orçamento, receita, lucro, duração)

### **💾 Sistema de Storage**

- **Upload de arquivos** (imagens, documentos)
- **Integração Cloudflare R2** (compatível S3)
- **CDN automático** para arquivos
- **Gestão de tipos MIME**
- **Soft delete** para arquivos

### **📧 Sistema de E-mails**

- **Integração Resend** para envio de e-mails
- **Templates HTML responsivos** e estilizados
- **Sistema de cron** para notificações automáticas
- **Notificações diárias** de lançamentos de filmes

### **⏰ Sistema de Cron**

- **Agendamento automático** de tarefas
- **Notificações diárias** às 10:45 AM
- **Envio em lote** para todos os usuários
- **Logs detalhados** de execução
- **Controle via API** (start, stop, restart)

### **🔍 Validação & DTOs**

- **Sistema de decorators** para validação
- **Validação automática** de entrada de dados
- **Transformação de objetos** com class-transformer
- **Validação de tipos** (email, UUID, URL, etc.)
- **Mensagens de erro** personalizadas

### **📖 Documentação da API**

- **Swagger/OpenAPI 3.0** completo
- **Interface visual** em `/docs`
- **Autenticação Bearer** configurada
- **Exemplos de uso** para todos os endpoints
- **Ordenação inteligente** de operações

### **🛡️ Segurança**

- **Helmet** para headers de segurança
- **CORS** configurado
- **Validação de entrada** rigorosa
- **Sanitização de dados** automática
- **Rate limiting** (configurável)

## 🌐 Endpoints da API

### **Autenticação**

- `POST /api/v1/auth/register` - Registro de usuário
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh-token` - Renovação de token

### **Usuários**

- `GET /api/v1/users` - Listar usuários
- `GET /api/v1/users/:id` - Buscar usuário por ID
- `PUT /api/v1/users/:id` - Atualizar usuário
- `DELETE /api/v1/users/:id` - Deletar usuário

### **Filmes**

- `GET /api/v1/movies` - Listar filmes com filtros
- `POST /api/v1/movies` - Criar filme
- `GET /api/v1/movies/:id` - Buscar filme por ID
- `PUT /api/v1/movies/:id` - Atualizar filme
- `DELETE /api/v1/movies/:id` - Deletar filme
- `PATCH /api/v1/movies/:id/rating` - Atualizar avaliação

### **Storage**

- `POST /api/v1/storage/upload` - Upload de arquivo
- `GET /api/v1/storage/:id` - Buscar arquivo por ID
- `DELETE /api/v1/storage/:id` - Deletar arquivo

### **Cron (Controle)**

- `GET /api/v1/cron/status` - Status dos crons
- `POST /api/v1/cron/test-movie-notifications` - Testar notificações
- `POST /api/v1/cron/stop` - Parar todos os crons
- `POST /api/v1/cron/restart` - Reiniciar todos os crons

## 📊 Banco de Dados

### **Modelos Principais**

- **Users** - Usuários do sistema
- **Movies** - Catálogo de filmes
- **Storage** - Arquivos e mídia

### **Relacionamentos**

- Usuários podem criar filmes
- Filmes podem ter posters (via Storage)
- Usuários podem ter imagens de perfil (via Storage)

### **Índices**

- Otimizados para consultas frequentes
- Índices em campos de data e tipo
- Suporte a soft delete

## 🔧 Configurações Avançadas

### **Timezone**

- Configurado para `America/Sao_Paulo` (Brasil)
- Cron jobs executam no horário local

### **Logs**

- Logs estruturados com emojis para melhor visualização
- Diferentes níveis de log (info, error, debug)
- Logs de execução do cron system

## 🚀 Deploy

### **Docker**

```bash
docker build -t indicium-back .
docker run -d -p 8080:8080 --name indicium-back indicium-back
```

### **Variáveis de Produção**

- Configure `NODE_ENV=production`
- Use `DATABASE_URL` de produção
- Configure CDN e storage de produção

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é privado e pertence à Indicium.

## 👨‍💻 Autor

**Thiago Cainelli** - Desenvolvedor Backend

---
