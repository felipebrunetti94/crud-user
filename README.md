# Este é um CRUD de Beneficiários bancários

## Sobre o projeto

Este é um crud de Beneficiários bancários, onde você pode adcionar, apagar, e editar beneficiários.

## Como rodar

- Rodar os scripts para popular o banco com beneficiários aleatórios.

```bash
    cd mongo
    npm run seed
    sudo chmod +x ./init.sh
    ./init
```

- Subir o a api

```bash
    npm run start
```

- Subir o client

```bash
    npm start
```

## Testes

O teste possui testes em jest para rodar utilizar, ambos client quanto api

```bash
   npm run test
```

## Tecnologias utilizadas

- React
- Express
- Mongoose

## Sobre a arquitetura

O projeto está dividido em camadas:

- /app: Use Cases
- /infra: gateways e conexões externas
- /domain: regras de negócio
