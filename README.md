# Pokedex


#### Aplicação de listagem de pokemons consumindo a api [pokeapi](https://pokeapi.co/).

## Funcionalidades

### 1. Página Inicial (Home)
    ✅ Quando procurar por todos os pokemons exibir em tela imagem e nome dos 10 primeiros da lista 
    ✅Botão **"Carregar mais"** para buscar +10 Pokémons por vez
    ✅Quando procurar por tipo de pokemons exibir todos desta categoria
    ✅Ao clicar em um pokemon é direcionado para pagina de detalhes.
    ✅Botão para voltar para parte inical da tela

### 2. Página Detalhes
    ✅Página que exibe dados do pokemon selecinado na tela inicial mostrando:
  - Imagem
  - Nome
  - Movimentos (moves)
  - Habilidades (abilities) com descrição
  - Tipos (types)
  - Botão "Voltar" para retornar a tela inicial
### 2 . Botão Thema
    ✅Botão para alterar entre tema de claro e escuro alterando fundo de tela e cor de texto.

### Ferramentas utilizadas
    ✅Ferramenta: React.js 
    - Oferece componentização reutilizável

    ✅Estilização CSS Modules
    - Organização escopada de estilos para evitar conflitos.
    
    ✅Axios
    - Oferece tratamento de erros mais robusto (com try/catch).
    - Suporte automático a JSON e configurações simplificadas.

##  Decisões Técnicas
- Separar arquivos em `components/`, `pages/`, `services/`, `utils/` e `context/` que mantém a organização do projeto modular e escalável, facilitando manutenção e legibilidade

- Criar CSS modularizado dentro de subpastas de cada área para evitar conflito de estilos e ajuda a identificar rapidamente o arquivo relacionado a cada componente ou página

-Uso do useEffect para controle de scroll automático ao abrir uma página para melhora a experiência do usuário ao garantir que ele sempre veja o topo da página ao navegar

- Inclusão de um seletor de tipos de Pokémon para tornar a navegação mais interativa.

- Utilização de `ThemeContext` para alternância de tema e manutenção da escolha do usuário.


## Estrutura principal
```bash
pokedex/
├── public/
│   └── pokedex.svg                # Icon para navegador
│
├── src/                          # Código-fonte principal da aplicação
│   ├── assets/                   # Imagens e recursos estáticos
│
│   ├── components/               # Componentes reutilizáveis da interface
│   │   ├── Header.jsx
│   │   ├── Pagination.jsx
│   │   ├── PokemonCard.jsx
│   │   ├── SelectTypesPokemon.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── styles/               # Estilos específicos dos componentes
│   │   │   ├── header.css
│   │   │   ├── pagination.css
│   │   │   ├── pokemonCard.css
│   │   │   ├── selectTypesPokemons.css
│   │   │   └── themeToggle.css
│
│   ├── context/
│   │   └── ThemeContext.jsx      # Contexto global para tema (claro/escuro)
│
│   ├── pages/                    # Páginas principais da aplicação
│   │   ├── Home.jsx              # Página inicial (listagem de pokémons)
│   │   ├── PokemonDetail.jsx     # Página de detalhes do pokémon
│   │   └── styles/               # Estilos específicos das páginas
│   │       ├── home.css
│   │       └── pokemonDetail.css
│
│   ├── services/
│   │   └── usePokemonData.jsx    # Hook customizado para buscar dados da PokéAPI
│
│   ├── tests/
│   │   └── selectTypesPokemon.test.jsx  # Testes unitários com Jest
│
│   ├── utils/                    # Funções utilitárias
│   │   ├── pokemonDetails.js
│   │   ├── scrollToTop.js
│   │   └── urlHepers.js
│
│   ├── App.jsx                   # Componente principal com rotas
│   ├── all.css                   # Estilos globais
│   └── main.jsx                  # Ponto de entrada do React (renderização)
│
├── .eslintrc.json                # Configuração do ESLint
├── .gitignore                    # Arquivos/ pastas ignoradas pelo Git
├── README.md                     # Documentação do projeto
├── babel.config.js               # Configuração do Babel
├── eslint.config.js              # Configuração extra do ESLint
├── jest.config.js                # Configuração do Jest
├── jest.setup.js                 # Setup global para os testes
├── package-lock.json             # Lockfile do npm
├── package.json                  # Dependências e scripts do projeto
└── vite.config.js                # Configuração do Vite (build tool)

```
## Como rodar o seu projeto

### 1. Clone o repositório

```bash
git clone https://github.com/ViniciusMendesLima/pokedex.git
```

### 2. Acesse a pasta do projeto
```bash
cd pokedex
```
### 3. Instale as dependências
```bash
npm install
```
### 4. Execute o projeto
```bash
npm run dev
```
## Executando os testes
Para rodar os testes unitários:
```bash
npm test
```

## 👨‍💻 Autor
Feito com  por Vinícius Mendes Lima
[GitHub](https://github.com/ViniciusMendesLima)

## 📝 Licença
Este projeto foi desenvolvido exclusivamente para fins educacionais como parte do curso [DevQuest](https://cursos.devemdobro.com/).
