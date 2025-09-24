# 🚀 Indicium Healthcare

## 📋 Descrição

Backend robusto e escalável para sistema de gestão de filmes, desenvolvido com arquitetura limpa, TypeScript e Node.js. O sistema inclui autenticação JWT, gestão de usuários.

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
└── types/                   # Definições de tipos TypeScript
```

## 🚀 Como Rodar o Projeto

### **Pré-requisitos**

- Node.js >= 20.x
- PostgreSQL

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

## 📊 Banco de Dados

### **Modelos Principais**

- **Users** - Usuários do sistema

### **Índices**

- Otimizados para consultas frequentes
- Índices em campos de data e tipo
- Suporte a soft delete

## 🔧 Configurações Avançadas

### **Logs**

- Logs estruturados com emojis para melhor visualização
- Diferentes níveis de log (info, error, debug)

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

## 📝 Licença

Este projeto é privado e pertence à Indicium.

## 👨‍💻 Autor

**Thiago Cainelli** - Desenvolvedor Backend

---
