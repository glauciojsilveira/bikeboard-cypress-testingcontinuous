# GitHub Copilot / AI agent instructions for bikeboard-cypress

**Propósito:** instruções concisas para agentes de codificação (Copilot / bots) para serem produtivos rapidamente neste repositório.

## Visão geral do projeto 🔧
- App: site estático em `src/` (HTML/CSS/JS). Serve é usado para servir `src` (ver `package.json` `start`).
- Testes E2E: implementados em Cypress (`cypress/`). Configuração principal em `cypress.config.js` com **baseUrl** `http://localhost:3000`.
- Autor/contato: `author` em `package.json` é "Fernando Papito" — útil para contexto de responsabilidade.

## Como rodar localmente ✅
- Servir o site (o Cypress espera `localhost:3000`):
  - Cross-platform (quando disponível): `npx serve -s src -l 3000`
  - Windows (ambiente que respeita `PORT`): `set PORT=3000 && npm start`
- Executar testes (headless): `npm test` (invoca `cypress run` via `package.json`).
- Modo interativo / debugging: `npx cypress open` e executar o spec desejado na UI.
- Rodar um spec específico:
  - `npx cypress run --spec "cypress/e2e/ads.cy.js"`
  - Para ver o navegador: `npx cypress run --headed --spec "cypress/e2e/ads.cy.js"`

## Convenções e padrões do teste 🧩
- `baseUrl` é fixo em `cypress.config.js` como `http://localhost:3000` — mantenha isso em mente ao criar/rodar testes.
- Mocks:
  - Implementados em `cypress/support/mocks/ads.mocks.js`. A variável `ENABLE_MOCKS = true` ativa interceptações locais.
  - Intercept padrão: `cy.intercept('POST', '**/anuncios', {...}).as('createAd')`
  - Para testar contra backend real, defina `ENABLE_MOCKS = false` e garanta que a API `/anuncios` aceite o payload esperado.
- Comandos customizados:
  - Adições centralizadas: `cypress/support/commands.js` importa arquivos em `cypress/support/actions/`.
  - Use ou estenda comandos em `actions` (ex.: `gotoHomePage`, `fillAdForm`, `submitAdForm`).
- Fixtures:
  - Dados de exemplo em `cypress/fixtures/bike.js` exportam `myBike`.
  - Padrão nas specs: `import { myBike } from '../fixtures/bike'`.
- Seletores e texto:
  - Os comandos usam texto visível em Português (ex.: 'Anunciar Grátis', 'Publicar Anúncio', rótulos de formulários como 'Título do Anúncio *'). Alterar cópias do front-end quebra testes — atualize specs/commands em conjunto.

## Padrões de implementação de mocks e assertions 🧪
- Nomeie intercepts com `.as('<nome>')` e aguarde com `cy.wait('@<nome>')` quando necessário.
- Ao criar mocks de POST, replique a estrutura de resposta existente para evitar regressões (ex.: `sucesso`, `mensagem`, `anuncio: { id, titulo, ... }`).

## Debug / troubleshooting 📋
- Quando falhas ocorram sem mudanças óbvias, verificar:
  1. Se o servidor está rodando na porta 3000
  2. Se `ENABLE_MOCKS` está habilitado (para isolar o teste)
  3. Se textos locais mudaram (seletor por `label`/`contains`)
- Para ver logs do navegador, usar `npx cypress open` e inspecionar DevTools durante execução da spec.

## Boas práticas específicas do projeto 💡
- Ao adicionar novos comandos, coloque-os em `cypress/support/actions/` e exporte via `commands.js`.
- Ao alterar a API (`/anuncios`), atualize `cypress/support/mocks/ads.mocks.js` para refletir o novo payload/response.
- Ao adicionar novos cenários, reutilize `cypress/fixtures/bike.js` ou adicione fixtures novas em `cypress/fixtures/`.

## Trechos de exemplo úteis ✍️
- Mock de criação de anúncio (existe em `cypress/support/mocks/ads.mocks.js`):

```js
cy.intercept('POST', '**/anuncios', { statusCode: 201, body: { sucesso: true, anuncio: { id: 1, titulo: bikeData.title, ... } } }).as('createAd')
```

- Comando de preenchimento de formulário (existe em `cypress/support/actions/ads.actions.js`):

```js
cy.get('label').contains('Título do Anúncio *').parent().find('input').type(bikeData.title)
```

## Restrições / Limites que o agente deve respeitar ⚠️
- Não altere textos visíveis sem atualizar os testes correspondentes.
- Não assuma que o backend está disponível — verificar `ENABLE_MOCKS` ou documentar a pré-condição.
- Prefira usar comandos existentes ao escrever specs (evita duplicação de seletores e regras de timing).

---

Se alguma parte estiver incompleta ou você quiser que eu detalhe templates de PR/teste, diga qual seção quer expandir e eu atualizo as instruções. 🚀