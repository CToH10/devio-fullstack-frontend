# devio-fullstack-front
Aplicação desenvolvida para teste técnico

## Setup

Ao clonar, é importante seguir o exemplo dado no `.env.example` e configurar suas variáveis de ambiente em um `.env` próprio.

```
api_base_url=URL_DE_API
```

Em seguida, execute o comando de instalação:

```bash
yarn || npm install || pnpm install
```

Para testar, execute:

```bash
${yarn || npm run || pnpm run} dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## Remotamente

[Aqui](https://devio-fullstack-frontend.vercel.app/) a aplicação está disponível, consumindo a [fast food API](https://github.com/CToH10/devio-fullstack-backend), também desenvolvida para teste técnico, remotamente.

## Pontos de melhoria identificados

A impressão térmica não foi implementada. Apesar de seguir documentação e procurar diversas soluções, não foi capaz implementar a impressão. Em seu lugar, foi implementado uma impressão comum; no entanto, por falta de controle sobre a impressão, ou qualidade desta, após pedir a impressão, a tela permanece estática até que o usuário mude.

No momento só é possível selecionar um dos adicionais, além dele necessariamente ser aplicado a todos os itens daquele produto. Não há filtragem de adicionais por tipo de produto, pois a API não categoriza esses adicionais.
