# 🏥 Indicium Healthcare - Sistema de Monitoramento de Saúde

## 📋 Descrição

Backend robusto e escalável para sistema de monitoramento de saúde, desenvolvido com arquitetura limpa, TypeScript e Node.js. O sistema inclui autenticação JWT, gestão de usuários e monitoramento de dados de SRAG (Síndrome Respiratória Aguda Grave) com métricas e visualizações em tempo real.

## 🛠️ Deploy
- **API** - Feito pelo Render (https://render.com) - URL: https://indicium-back-updated.onrender.com
- **Banco de Dados** - Feito pelo Neom (https://neon.com) 
**Os arquivos .csv com os dados eram muito superiores ao limite aceitável de tamanho no Neon. Portanto foi feito só do ano de 2019 e 2020. Não foi possível popular o banco de dados até 2025.**

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
- **Índices otimizados** para consultas de dados de saúde

### **Autenticação & Segurança**

- **JWT** (^9.0.2) - JSON Web Tokens para autenticação
- **bcrypt** - Criptografia de senhas
- **Helmet** (^8.1.0) - Middleware de segurança
- **CORS** (^2.8.5) - Cross-Origin Resource Sharing

### **Validação & Transformação**

- **class-validator** (^0.14.2) - Validação de DTOs
- **class-transformer** (^0.5.1) - Transformação de objetos
- **Decorators customizados** - Sistema de validação personalizado
- **20+ tipos de validação** (email, UUID, URL, data, etc.)

### **Documentação & API**

- **Swagger/OpenAPI** (^6.2.8) - Documentação da API
- **Swagger UI** (^5.0.1) - Interface visual da documentação
- **Documentação completa** para todos os endpoints

### **Processamento de Dados**

- **fast-csv** (^5.0.5) - Processamento de arquivos CSV
- **xlsx** (^0.18.5) - Manipulação de planilhas
- **Batch processing** para ingestão de dados

### **Desenvolvimento & Qualidade**

- **ESLint** (^9.29.0) - Linter de código
- **Prettier** (^3.6.1) - Formatador de código
- **ts-node** (^10.9.2) - Execução TypeScript em desenvolvimento

## 🏗️ Arquitetura do Projeto

```
src/
├── _core/                    # Funcionalidades principais
│   ├── auth/                # Autenticação e autorização
│   ├── middlewares/         # Middlewares globais
│   ├── prisma.pg.ts        # Configuração do Prisma
│   └── swagger.ts          # Configuração da documentação
├── _common/                 # Utilitários compartilhados
│   ├── decorators/         # 20+ decorators de validação
│   ├── dtos/               # Data Transfer Objects
│   ├── enums/              # Enumerações
│   ├── exceptions/         # Tratamento de erros
│   └── utils/              # Funções utilitárias
├── _init/                   # Inicialização do sistema
├── users/                   # Módulo de usuários
│   ├── dtos/               # DTOs de usuários
│   ├── services/           # Services de usuários
│   ├── enum/               # Tipos de usuário
├── srag/                    # Módulo SRAG (Monitoramento de Saúde)
│   ├── dtos/               # DTOs para métricas e gráficos
│   ├── services/           # Services de análise de dados
│   ├── enum/               # Enums médicos
├── types/                   # Definições de tipos TypeScript
└── public/                  # Arquivos estáticos
```

## 🚀 Como Rodar o Projeto

### **Pré-requisitos**

- Node.js >= 20.x
- PostgreSQL >= 13
- pnpm (recomendado) ou npm

### **1. Clone o Repositório**

```bash
git clone <repository-url>
cd indicium-back
```

### **2. Instale as Dependências**

```bash
# Com pnpm (recomendado)
pnpm install

# Ou com npm
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
pnpm generate

# Execute as migrações
pnpm migrate:dev
```

### **5. Execute o Projeto**

#### **Desenvolvimento**

```bash
pnpm dev
```

#### **Produção**

```bash
pnpm build
pnpm start
```

## 📚 Funcionalidades do Sistema

### **🔐 Autenticação & Usuários**

- **Registro de usuários** com validação rigorosa de dados
- **Login seguro** com JWT e refresh tokens
- **Autenticação** via middleware JWT em todas as rotas protegidas
- **Gestão de perfis** com upload de imagens
- **Tipos de usuário** (superAdmin, users)
- **Soft delete** para preservação de dados
- **Middleware de validação** automática

### **🏥 Monitoramento de Saúde (SRAG)**

- **Dashboard de métricas** em tempo real:
  - Taxa de aumento de casos de SRAG
  - Taxa de mortalidade por SRAG
  - Taxa de ocupação de UTI
  - Taxa de vacinação da população

- **Visualização gráfica** com filtros:
  - Agrupamento temporal (diário, mensal, anual)
  - Agrupamento geográfico (estado, cidade)
  - Filtros por período e região
  - Dados de casos, óbitos, UTI e vacinações

- **Listagem de casos** com:
  - Paginação completa
  - Filtros avançados (data, região, evolução, UTI, vacinação)
  - Ordenação por data de início dos sintomas
  - Busca otimizada com índices

- **Ingestão de dados**:
  - Processamento automático de arquivos CSV
  - Importação em lotes para performance
  - Validação e tratamento de erros
  - Suporte a dados do OpenDataSUS

### **🔍 Validação & DTOs**

- **Sistema de decorators** personalizado com 20+ tipos:
  - `@IsEmailPropertyDecorator` - Validação de email
  - `@IsUUIDPropertyDecorator` - Validação de UUID
  - `@IsDateStringPropertyDecorator` - Validação de datas
  - `@IsEnumPropertyDecorator` - Validação de enums
  - E muitos outros...

- **Validação automática** de entrada de dados
- **Transformação de objetos** com class-transformer
- **Mensagens de erro** personalizadas e em português

### **📖 Documentação da API**

- **Swagger/OpenAPI 3.0** completo e atualizado
- **Interface visual** disponível em `/docs`
- **Autenticação Bearer** configurada
- **Exemplos de uso** para todos os endpoints
- **Ordenação inteligente** de operações
- **Documentação de schemas** completa

### **🛡️ Segurança**

- **Helmet** para headers de segurança
- **CORS** configurado adequadamente
- **Validação de entrada** rigorosa em todos os endpoints
- **Sanitização de dados** automática
- **Rate limiting** (configurável)
- **Tratamento de erros** padronizado

## 🌐 Endpoints da API

### **Autenticação**

- `POST /api/v1/auth/register` - Registro de usuário
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh-token` - Renovação de token

### **Usuários**

- `GET /api/v1/users` - Listar usuários
- `GET /api/v1/users/:id` - Buscar usuário por ID
- `PUT /api/v1/users/:id` - Atualizar usuário
- `DELETE /api/v1/users/:id` - Deletar usuário (soft delete)

### **SRAG - Monitoramento de Saúde**

- `GET /api/v1/srag/health` - Health check do módulo
- `GET /api/v1/srag/metrics` - Obter métricas de SRAG
  - Query params: `region`, `period`
- `GET /api/v1/srag/chart` - Dados para gráficos
  - Query params: `period`, `region`, `startDate`, `endDate`, `groupBy`
- `GET /api/v1/srag/list` - Listar casos com filtros
  - Query params: `page`, `itemsPerPage`, `sgUf`, `coMunRes`, `startDate`, `endDate`, `evolucao`, `uti`, `vacinaCov`

## 📊 Banco de Dados

### **Modelos Principais**

- **Users** - Usuários do sistema
  - Campos: uuid, name, email, password, type, profileImage, refreshToken
  - Índices: type, createdAt, deletedAt

- **SRAG** - Dados de monitoramento de saúde
  - Campos: identificadores, datas, geografia, demografia, evolução clínica, vacinação
  - Índices: dtSinPri, sgUf+dtSinPri, coMunRes+dtSinPri, evolucao, uti

### **Índices Otimizados**

- Índices compostos para consultas frequentes
- Índices em campos de data para agregações temporais
- Índices geográficos para filtros por região
- Suporte a soft delete com índices adequados

## 🔧 Configurações Avançadas

### **Logs**

- Logs estruturados com emojis para melhor visualização
- Diferentes níveis de log (info, error, debug)
- Logs de inicialização e bootstrap da aplicação

### **Path Mapping**

```typescript
"@/*": ["src/*"]
"@/core/*": ["src/_core/*"]
"@/common/*": ["src/_common/*"]
"@/users/*": ["src/users/*"]
"@/srag/*": ["src/srag/*"]
```

### **Validação Customizada**

Sistema de decorators personalizado que combina:

- Validação de tipos
- Documentação Swagger
- Mensagens de erro em português
- Configuração flexível por campo

## 🚀 Deploy

### **Variáveis de Produção**

- Configure `NODE_ENV=production`
- Use `DATABASE_URL` de produção com SSL
- Configure secrets seguros para JWT
- Configure CORS adequadamente para produção

## 📈 Monitoramento e Métricas

### **Métricas de SRAG Disponíveis**

1. **Taxa de Aumento de Casos**
   - Comparação entre períodos
   - Cálculo percentual de crescimento

2. **Taxa de Mortalidade**
   - Percentual de óbitos por total de casos
   - Filtros por região e período

3. **Taxa de Ocupação de UTI**
   - Percentual de casos que necessitaram UTI
   - Indicador de gravidade

4. **Taxa de Vacinação**
   - Percentual de casos vacinados
   - Análise de efetividade

### **Filtros e Agregações**

- **Temporal**: Diário, mensal, anual
- **Geográfico**: Por estado ou município
- **Clínico**: Por evolução, UTI, vacinação
- **Demográfico**: Por sexo, faixa etária

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                    # Executa em modo desenvolvimento

# Build e Deploy
pnpm build                  # Compila TypeScript
pnpm start                  # Executa versão compilada

# Banco de Dados
pnpm generate               # Gera cliente Prisma
pnpm migrate:dev            # Migrações de desenvolvimento
pnpm migrate:prod           # Migrações de produção

# Testes
pnpm test                   # Executa todos os testes
pnpm test:watch             # Modo watch
pnpm test:coverage          # Com cobertura
pnpm test:ci                # Para CI/CD
```

## 📝 Licença

Este projeto é privado e pertence à **Indicium Healthcare**.

## 👨‍💻 Equipe

**Thiago Cainelli** - Desenvolvedor Backend Full-Stack

---
