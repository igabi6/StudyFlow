# StudyFlow

Aplicativo mobile de organização de estudos desenvolvido individualmente com React Native e Expo.

## Funcionalidades

- Visualização do progresso de tarefas.
- Cadastro de tarefas com título, matéria, prazo e descrição.
- Filtro de tarefas por todas, pendentes e concluídas.
- Tela de detalhes com passagem de parâmetro pela navegação.
- Marcação de tarefas como concluídas ou pendentes.

## Tecnologias

- React Native
- Expo
- JavaScript
- React Navigation (Native Stack)

## Como executar

```bash
npm install
npx expo start
```

## Onde estão os requisitos

- **Componentização:** `components/CardTarefa.js`, `components/Botao.js` e `components/CampoTexto.js`.
- **Props e callback:** componentes recebem propriedades; `CardTarefa` recebe `aoPressionar`.
- **useState:** estado das tarefas em `App.js`; formulário e filtro em `screens/TarefasScreen.js`.
- **useEffect:** atualização do relógio na tela inicial, com limpeza do intervalo em `screens/HomeScreen.js`.
- **Navegação:** `App.js`, com três telas e parâmetros `tarefaId`.
- **JavaScript moderno:** arrow functions, desestruturação, spread, template strings, `map`, `filter` e `find`.
- **Interface:** estilos com `StyleSheet.create` nos componentes e telas.

## Dados

O aplicativo utiliza dados locais definidos em `data/tarefas.js`. As alterações são mantidas em memória enquanto o aplicativo está em execução; não há banco de dados ou armazenamento permanente nesta versão.
