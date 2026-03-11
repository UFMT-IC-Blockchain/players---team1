### Documentação de Instalação do Ambiente

Para configurar o ambiente de desenvolvimento com **Node.js 24** e o **NestJS CLI**, siga os passos abaixo:

---

#### Passo 1: Instalação do NVM e Node.js

O **NVM** (Node Version Manager) permite gerenciar múltiplas versões do Node.js de forma isolada.

```bash
# Baixa e instala o nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# Carrega o nvm no terminal atual (sem precisar reiniciar o shell)
\. "$HOME/.nvm/nvm.sh"

# Instala a versão 24 do Node.js
nvm install 24

# Verifica se a instalação foi bem-sucedida
node -v # Deve retornar v24.x.x
npm -v  # Deve retornar 11.x.x

```

#### Passo 2: Instalação do NestJS CLI

Com o Node.js e o NPM configurados, instale a interface de linha de comando do NestJS globalmente:

```bash
npm install -g @nestjs/cli

```

---


#### Passo 3: Criando projeto


```bash
nest new project

```


#### Passo 4: Baixando o postgres para typescript


```bash
npm install --save @nestjs/typeorm typeorm pg

```

#### Passo 5: Configurar o postgres em app.module.ts

<img width="843" height="516" alt="image" src="https://github.com/user-attachments/assets/4e49526b-1213-4340-a95c-793ac6a50f2a" />

```bash
imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    }),
```
#### Passo 6: Verificar o app

```bash
npm run start
```
