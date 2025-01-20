
# Teste Técnico Teddy Finance

Api que tem o objetivo de encurtar URLs.


### 📋 Pré-requisitos

O Sistema foi desenvolvido com a última versão estável do [Nodejs](https://nodejs.org/en), além de usar os bancos de dados [Postgresql](https://www.postgresql.org/) e [Redis](https://redis.io/).


### 🔧 Instalação

Primeiramente, clone o repositório do projeto:

```
git clone https://github.com/edersonrdg/teddy-finance
cd teddy-finance
```

Com o projeto aberto. Crie um arquivo ".env" e adicione as variáveis necessárias. (Exemplo no .env.example, Não é necessário caso use Docker Compose)
```
DATABASE_URL=
JWT_SECRET=
REDIS_URL=
```

Por fim, caso não utilize [Docker Compose](), execute os seguintes comandos:

```
# instale todas as dependências
npm install

# inicie a api
npm run start:dev

# em outro terminal, rode as migrations que gera as tabelas do sistema
npm run migrate
```

## ⚓️ Docker e Docker Compose
Para executar os serviços do docker, basta executar o seguinte comando:

```
npm run up
```

Todas as variáveis de ambientes, dependências e comandos serão transcritos automaticamente.

## ⚙️ Executando os testes

```
npm test
```

### 🔩 Análise de métricas.

O Projeto conta com rotas para análise de métricas. Incluindo métricas específicas como contagem de redirecionamentos realizados.

<img src="https://i.ibb.co/QpSD1DT/Captura-de-tela-de-2025-01-19-21-52-34.png" width="700" />


Serviços de métricas disponíveis:

```
# Dados de métricas gerados pelo prometheus. 
http://localhost:3000/metrics

# Interface do prometheus com seleção de métrica e visualização de valores.
http://localhost:9090

# Interface do grafana (Imagem acima).
http://localhost:3001

```

### ⌨️ Documentação

A Documentação completa da API está disponível na rota: docs.

```
http:localhost:3000/docs
```

## 📦 Melhorias

- Validar URLs de origem: Garantir que urls de origem não causem vulnerabilidades durante o redirecionamento.
- Criar mais estatísticas para métricas: Além da contagem de clicks, informações de localização e identidade dos usuários que executam.
- Permitir edição de URL encurtada: Usuário deve conseguir editar uma url encurtada e adicionar uma de sua preferência, contando que não seja existente.
- Controle de usuários e Dashboard Administrativo: Adição de níveis de permissão, incluindo perfil administrativo para ter acesso a um dashboard administrativo para visualizar estatísticas.

## 🛠️ Construído com


- [NestJS](https://nestjs.com/) - Framework NodeJS.
- [Prisma ORM](https://www.prisma.io/?via=start&gad_source=1&gclid=Cj0KCQiA4rK8BhD7ARIsAFe5LXJq5NaiFwOeFc15zjCARMFxaYujLkQSj5UrHEoyGZ4wz_CcmAOcTMUaArW8EALw_wcB) - ORM de banco de dados. 
- [Postgresql](https://www.postgresql.org/) - Banco de dados relacional.
- [Redis](https://redis.io/) - Banco de dados não relacional.
- [Prometheus](https://prometheus.io/) - Ferramenta para monitoramento de eventos e métricas.
- [Winston](https://github.com/winstonjs/winston/tree/2.x) - Biblioteca de controle de logs.
- [Swagger](https://swagger.io/) - Ferramenta para desenvolvimento de Documentação.
- [Grafana](https://grafana.com/) - Aplicação de monitoramento de métricas usando ferramentas de visualização como gráficos e tabelas.

## 📌 Versão

Foi utilizado [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) para controle de versão. As releases disponíveis são:

- [0.1.0](https://github.com/edersonrdg/teddy-finance/tree/release/0.1.0) - Cadastro e Autorização.
- [0.2.0](https://github.com/edersonrdg/teddy-finance/tree/release/0.2.0) - Serviço de encurtador de URLs.
- [0.3.0](https://github.com/edersonrdg/teddy-finance/tree/release/0.3.0) - CRUD de URLs, com autorização e monitoramento de métricas.

## Autor

<a href="https://github.com/edersonrdg">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/60035985?s=460&u=3f67302dcc7cc3e33a51c71ad77fba31d6d2f6e1&v=4" width="100px;" alt=""/>
 <br />
 </a>

Feito por Ederson rodrigo, Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-edersonsl-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/edersonsl/)](https://www.linkedin.com/in/edersonsl/)
[![Gmail Badge](https://img.shields.io/badge/-edersonrodrigo31@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:edersonrodrigo31@gmail.com)](mailto:edersonrodrigo31@gmail.com)

## License

MIT
