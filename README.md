# BikeBoard — Cypress Test Continuos Git Hub Action Guide by Glaucio 
- Este projeto é um teste automatizado E2E em Cypress rodando em pipeline - Continuos Testing

Este repositório contém um site estático em `src/` e testes E2E implementados com Cypress em `cypress/`.

## Visão geral rápida
- App estático: `src/` (serve para servir localmente)
- Testes E2E: `cypress/e2e/*.cy.js`
- BaseUrl Cypress: configurado em `cypress.config.js` como `http://localhost:3000`
- Dependências principais: `serve` (runtime), `cypress` (devDependency; v15.4.0 declarada em `package.json`).

## Pré-requisitos
- Node.js 16+ (recomendado)
- npm ou yarn
- Portas livres (usa 3000 por padrão)

## Instalação
```bash
npm install
# ou
# yarn
```

## Servir a aplicação (local)
O Cypress espera o site em `http://localhost:3000` (veja `cypress.config.js`).
- Cross-platform (quando disponível):
  npx serve -s src -l 3000
- Windows (cmd/powershell):
  set PORT=3000 && npm start

Sugestão para CI/local: usar `start-server-and-test` ou scripts que iniciem o servidor e executem os testes.

## Rodando os testes
- Headless (padrão):
  npm test
  (usa `cypress run` conforme `package.json`)

- Modo interativo / debug: 
  npx cypress open
  selecione o spec desejado na UI do Cypress

- Rodar um spec específico:
  npx cypress run --spec "cypress/e2e/ads.cy.js"

- Rodar em modo visível (headed):
  npx cypress run --headed --spec "cypress/e2e/ads.cy.js"

- Forçar configuração via CLI (ex.):
  npx cypress run --config video=true

## Screenshots e Vídeos
- Screenshots de falhas: por padrão o Cypress tira screenshots quando um teste falha.
- Diretórios padrão:
  - Screenshots: `cypress/screenshots/`
  - Vídeos: `cypress/videos/`

- Fazer screenshot manualmente em um teste:
```js
cy.screenshot('nome-da-screenshot')
```
- Habilitar/desabilitar vídeo via CLI:
```bash
npx cypress run --config video=false
```

## Geração de relatórios (ex.: Mochawesome)
O repositório não possui um gerador de relatório instalado por padrão. Para gerar relatórios HTML/JSON usando Mochawesome (exemplo recomendado):

1) Instale as dependências:
```bash
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```

2) Execute os testes com o reporter e gere o relatório:
```bash
# gera JSONs com mochawesome
npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports,overwrite=false,html=false,json=true

# mescla e gera HTML
npx mochawesome-merge cypress/reports/*.json > cypress/reports/report.json
npx marge cypress/reports/report.json -o cypress/reports/html
```

Sugestão: adicione um script npm que rode tudo junto (ex.: `test:report`).

## Boas práticas e convenções deste projeto
- Mocks de API usados para isolar testes: `cypress/support/mocks/ads.mocks.js` (variável `ENABLE_MOCKS = true`).
- Comandos customizados estão em `cypress/support/actions/*.js` e são importados por `cypress/support/commands.js`.
  - Exemplos de comandos: `gotoHomePage`, `fillAdForm`, `submitAdForm`.
- Fixtures de exemplo: `cypress/fixtures/bike.js` (exporta `myBike`).
- Seletores e textos usam Português; ao alterar cópia do front, atualize os testes correspondentes.

## Dicas para CI
- Inicie o servidor (p.ex. `npx serve -s src -l 3000`) antes de executar `npx cypress run`.
- Para pipelines, prefira `start-server-and-test` para ligar o servidor e rodar testes num único comando.
- Armazene os diretórios `cypress/screenshots` e `cypress/videos` como artefatos do job para análise de falhas.

## Troubleshooting rápido
- Erros de `baseUrl`: confirme que o servidor está rodando na porta 3000
- Falhas por textos/seletores: verifique se os textos em Português foram alterados
- Isolar falhas: desative mocks (`ENABLE_MOCKS = false`) para testar contra backend real

## Arquivos chave
- `package.json` (scripts, dependências)
- `cypress.config.js` (baseUrl, configuração E2E)
- `cypress/e2e/ads.cy.js` (exemplo de spec)
- `cypress/support/mocks/ads.mocks.js` (mocks)
- `cypress/support/actions/ads.actions.js` (comandos customizados)
- `cypress/fixtures/bike.js` (dados de exemplo)

