# Adoção Cãosciente

<!-- Shields Exemplo, existem N diferentes shield em https://shields.io/ -->
![GitHub last commit](https://img.shields.io/github/last-commit/Projeto-Adocao-Caosciente/adocao-caosciente-frontend)
![GitHub language count](https://img.shields.io/github/languages/count/Projeto-Adocao-Caosciente/adocao-caosciente-frontend)
![Github repo size](https://img.shields.io/github/repo-size/Projeto-Adocao-Caosciente/adocao-caosciente-frontend)
![Github stars](https://img.shields.io/github/stars/Projeto-Adocao-Caosciente/adocao-caosciente-frontend?style=social)

![Capa do Projeto](https://i.imgur.com/3CmGKvA.png)

> Sistema de gestão de formulários de adoção de animais para ONGs de proteção animal.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter as seguintes dependências instaladas:

- Antes de começar, verifique se você possui o `NodeJs` instalado em sua máquina. Se não tiver, você pode baixar o `NodeJs` [aqui](https://nodejs.org/en/download/).

## Como executar o projeto

Siga as etapas abaixo para executar o projeto em sua máquina local:

Execute os seguintes comandos a partir da pasta raiz do projeto:

<!-- Aqui é tudo exemplo, só trocar -->

### Clone este repositório

```bash
git clone https://github.com/Projeto-Adocao-Caosciente/adocao-caosciente-frontend.git
```

Este link pode ser encontrado no botão verde acima `Code`.

### Instale as dependências

```bash
npm install
```

### Defina as variáveis de ambiente

Descrição de como definir as variáveis de ambiente

### Execute o Projeto

```bash
npm start
```

É possível executar o projeto com um mock de dados, para isso, execute o seguinte comando:

```bash
npm run start:mock
```

## Estrutura de Pastas

A estrutura de pastas do projeto foi feita em inspiração ao [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) e ao [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/).

o repositório template usado para a criação deste repositório foi o [react-clean-architecture](https://github.com/rmanguinho/clean-react), mais informações podem ser encontradas no [artigo](https://dev.to/rubemfsv/clean-architecture-applying-with-react-40h6) do criador.

```text
/
|-- data/
|   |-- http/
|   |-- model/
|   |-- services/
|-- domain/
|   |-- exceptions/
|   |-- interactors/
|   |-- mapper/
|   |-- models/
|-- factories/
|   |-- http/
|   |-- interactors/
|   |-- mappers/
|   |-- pages/
|   |-- proxies/
|   |-- services/
|   |-- validations/
|-- presentation/
|   |-- assets/
|   |-- components/
|   |-- contexts/
|   |-- hooks/
|   |-- pages/
|   |-- reducer/
|   |-- store/
|   |-- templating/
|   |-- validations/
|-- proxies/
|-- routes/
|-- utils/
|-- App.tsx
```

O arquivo `App.tsx` é o arquivo principal da aplicação, este é responsável por fazer a injeção de dependência e por fazer a navegação entre as páginas.

o repositório está dividido em 3 pastas principais: `data`, `domain` e `presentation`.

### Data

A pasta `data` é responsável por conter as implementações de infraestrutura, como por exemplo, a implementação de um cliente HTTP, Serviços, etc.

Temos a pasta `model` que representa os modelos que representa os dados que são trafegados entre as camadas (estes dados são o que o backend retorna).

Temos também a pasta `services` que é responsável por conter as implementações de serviços, como por exemplo, para o serviço da ONG, temos a implementação de um serviço de registro de ong, assim como também a edição da ong, e assim por diante.

### Domain

A pasta `domain` é responsável por conter as regras de negócio da aplicação, como por exemplo, o fluxo de registro de ong, o fluxo de edição de ong, etc.

Temos `interactors` que são responsáveis por fazer a comunicação entre a camada de `data` e `presentation`.

Temos também `models` que são responsáveis por representar os dados que serão exibidos na tela, estes são transformados por métodos da pasta `mapper` a partir dos dados que vem da camada de `data` e são enviados para a camada de `presentation`.

Por fim temos `exceptions` que são responsáveis por representar os erros que podem ocorrer na aplicação.

### Presentation

A pasta `presentation` é responsável por conter as implementações de apresentação, como por exemplo, os componentes, as páginas, os hooks, etc.

Temos a pasta `components` que representa os componentes que são reutilizados entre as páginas (Botão, Input, etc)

Temos também a pasta `pages` que representa as páginas da aplicação. (Login, Cadastro, etc)

Temos também a pasta `hooks` que representa os hooks que são reutilizados entre as páginas (notificação, requisição, autenticação, etc).

Temos também a pasta `contexts` que representa os contextos que são reutilizados entre as páginas. No momento, o único contexto existente é o de autenticação.

Temos também a pasta `assets` que representa os assets que são reutilizados entre as páginas (Imagens, etc).

Temos também a pasta `reducer` e `store` que representa o estado de cache da aplicação. Não foi levado a diante esta implementação, mas a ideia é que o estado de cache da aplicação seja gerenciado pelo redux.

Temos também a pasta `templating` que representa os templates que são reutilizados entre as páginas, por exemplo, a tela Home e a tela de Login possues templates diferentes e estas são utilizadas em suas respectivas páginas.

Por fim temos `validations` que são responsáveis por representar as validações que são feitas na aplicação. Estas que são recebidas pela camada de `domain`.

### Outras Pastas

Temos outras pastas auxiliares como `factories`, `proxies`, `routes` e `utils`.

A pasta `factories` é responsável por conter as implementações de fábricas, como por exemplo, a fábrica de páginas, a fábrica de serviços, etc. Estas fábricas são utilizadas para fazer a injeção de dependência.

A pasta `proxies` é responsável por conter as implementações de proxies, como por exemplo, o proxy de autenticação, o proxy de requisição, etc. Estes proxies são utilizados para fazer a comunicação entre a camada de `presentation` e `domain`.

A pasta `routes` é responsável por conter as implementações de rotas, como por exemplo, a rota de login, a rota de cadastro, etc. Estas rotas são utilizadas para fazer a navegação entre as páginas.

A pasta `utils` é responsável por conter as implementações de utilidades, como por exemplo, conversão de arquivo para base64, etc.

### Disposição e estilos

Todo o design system da aplicação foi feito utilizando o [Next UI](https://nextui.org/), que é um framework de componentes para React.

## Tecnologias Utilizadas

- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Como contribuir

Se você deseja contribuir para este projeto, siga as etapas abaixo:

1. Faça um fork deste repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Criar a solicitação de pull.

Como alternativa, consulte a documentação do GitHub sobre [como criar uma solicitação de pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Licença

Este projeto está sob licença. Consulte [LICENSE](LICENSE) para obter mais informações.

## Voltar ao topo

[⬆ Voltar ao topo](#Adoção-Cãosciente)
