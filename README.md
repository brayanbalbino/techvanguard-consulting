# TechVanguard Consulting

> **Transformação Digital e Soluções Tecnológicas sob Medida**

Aplicação web de uma empresa fictícia de consultoria em Tecnologias de Informação, desenvolvida como atividade prática em dupla (BD - Bezerra). Integra front-end, autenticação, base de dados e controlo de acesso.

**Aplicação publicada:** _https://techvanguard-consulting.vercel.app/_

**Video Teste da Aplicação:** _https://youtu.be/XK5qIeaL5y0_

## Funcionalidades

**Página inicial:** apresentação da empresa, logótipo, serviços e os dois sócios com currículo resumido.

**Área do cliente**
- Criar conta, iniciar e encerrar sessão
- Consultar os serviços disponíveis
- Submeter e consultar os próprios pedidos de orçamento

**Área administrativa (`/admin`)**
- Acesso exclusivo a utilizadores com papel `admin`
- CRUD completo de serviços (criar, consultar, atualizar, eliminar)
- Consulta de clientes e de pedidos de orçamento (com alteração de estado)
- Registo de acessos com data e hora

## Serviços da empresa

1. Consultoria em Arquitetura de Software & Cloud
2. Desenvolvimento de Aplicações Web e Mobile
3. Auditoria de Cibersegurança e Conformidade
4. Transformação Digital & Automação de Processos

## Tecnologias

| Camada          | Tecnologia                                              |
|-----------------|---------------------------------------------------------|
| Front-end       | HTML, CSS e JavaScript (módulos ES, sem framework)      |
| Autenticação    | Firebase Authentication (e-mail e senha)                |
| Base de dados   | Cloud Firestore                                         |
| Alojamento      | Vercel (site estático, sem etapa de build)              |
| Código          | GitHub                                                  |

## Estrutura do projeto

```
techvanguard-consulting/
├── index.html              Página inicial (empresa, serviços, sócios)
├── login.html              Início de sessão
├── registo.html            Criação de conta
├── cliente/
│   ├── servicos.html       Serviços disponíveis (requer login)
│   └── pedidos.html        Pedidos de orçamento do cliente
├── admin/
│   ├── index.html          Painel
│   ├── servicos.html       CRUD de serviços
│   ├── clientes.html       Lista de clientes
│   ├── pedidos.html        Pedidos de orçamento
│   └── acessos.html        Registo de acessos
├── js/
│   ├── firebase-config.js  Configuração do projeto Firebase (editar)
│   ├── firebase.js         Inicialização do Firebase
│   ├── sessao.js           Sessão, proteção de rotas, registo de acessos
│   ├── ui.js               Cabeçalho, menus, formatação, avisos
│   └── servicos-padrao.js  Serviços iniciais
├── css/style.css
├── assets/logo.svg
├── docs/modelo-bd.md       Modelo da base de dados
├── docs/capturas/          Capturas de ecrã
├── firestore.rules         Regras de segurança do Firestore
├── vercel.json             Rota /admin
└── firebase.json
```

## Modelo da base de dados

Quatro coleções: `usuarios`, `servicos`, `pedidos` e `acessos`. Diagrama e descrição em [docs/modelo-bd.md](docs/modelo-bd.md).

## Instalação e execução, passo a passo

### 1. Criar o projeto no Firebase
1. Acesse o [console do Firebase](https://console.firebase.google.com) e clique em **Adicionar projeto**.
2. Em **Authentication > Método de login**, ative **E-mail/senha**.
3. Em **Firestore Database**, clique em **Criar banco de dados** (modo produção) e escolha uma região.
4. Em **Configurações do projeto > Seus apps**, adicione um app **Web** (`</>`) e copie o objeto `firebaseConfig`.

### 2. Configurar o código
1. Clone o repositório e abra a pasta no VS Code.
2. Cole os valores copiados em `js/firebase-config.js`.
3. No console, abra **Firestore Database > Regras**, cole o conteúdo de `firestore.rules` e clique em **Publicar**.

> A configuração do app Web do Firebase identifica o projeto e não é um segredo. A proteção dos dados vem das regras do Firestore. **Nunca** versione chaves de conta de serviço (service account) nem ficheiros `.env`. O `.gitignore` já bloqueia esses nomes.

### 3. Executar localmente
Os módulos JavaScript exigem um servidor HTTP (não funciona abrindo o ficheiro com duplo clique). Use uma destas opções na pasta do projeto:

- Extensão **Live Server** do VS Code (botão *Go Live*), ou
- `python -m http.server 5500` e acesse `http://localhost:5500`

### 4. Criar o primeiro administrador
1. Em `/registo.html`, crie uma conta normalmente.
2. No console do Firebase, abra **Firestore Database > `usuarios` > documento da conta** e altere o campo `papel` de `cliente` para `admin`.
3. Saia e entre de novo. O menu passa a mostrar **Administração**.
4. Em **Administração > Serviços**, clique em **Carregar serviços iniciais**.

O papel `admin` só pode ser definido pelo console. As regras impedem que um cliente altere o próprio papel.

### 5. Publicar no Vercel
1. Envie o código para o GitHub.
2. No [Vercel](https://vercel.com), clique em **Add New > Project** e importe o repositório.
3. Em **Framework Preset**, escolha **Other**. Deixe o comando de build vazio e o diretório de saída como a raiz.
4. Depois do deploy, copie o domínio gerado (por exemplo `meu-projeto.vercel.app`).
5. No Firebase, abra **Authentication > Configurações > Domínios autorizados** e adicione esse domínio. Sem isso, o login falha no site publicado.
6. Cole o link no topo deste README.

## Segurança

- **Senhas:** o Firebase Authentication guarda apenas o hash (scrypt). A aplicação nunca vê nem guarda senhas, por isso bcrypt/Argon2 não se aplicam a esta solução.
- **Validação de credenciais:** feita pelo Firebase Authentication; as mensagens de erro não revelam se o e-mail existe.
- **Rotas administrativas:** `js/sessao.js` redireciona quem não é admin. A proteção real está em `firestore.rules`, que recusa leitura e escrita de dados administrativos a quem não tem papel `admin`, mesmo que alguém chame o banco diretamente.
- **Papéis:** o cadastro público só cria `cliente`; promover a `admin` é manual.
- **XSS:** todo texto vindo do banco é escapado antes de ir para a página.
- **Log de acessos:** início de sessão, encerramento e criação de conta, com data e hora do servidor. O encerramento só é registado quando se clica em *Sair*.

## Capturas de ecrã

Guardar em `docs/capturas/` e listar aqui:

- [ ] Página inicial
- [ ] Criar conta e entrar
- [ ] Serviços (cliente)
- [ ] Pedido de orçamento
- [ ] Painel admin
- [ ] CRUD de serviços
- [ ] Clientes e pedidos
- [ ] Registo de acessos

## Autores

- Brayan Balabino (CEO e Arquiteto de Soluções)
- Jacqueline Tavares (CTO e Especialista em Desenvolvimento Front-End)
