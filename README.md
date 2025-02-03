# Jogo de Adivinhação de Palavras

Este é um jogo interativo de adivinhação de palavras desenvolvido em React. O jogador deve tentar adivinhar as letras de uma palavra oculta dentro de um número limitado de tentativas.

## Tecnologias Utilizadas
- React
- JavaScript (ES6+)
- CSS

## Funcionalidades
- Escolha aleatória de uma palavra e categoria.
- O jogador pode tentar adivinhar letras da palavra.
- O jogo indica se uma letra já foi usada.
- Contador de tentativas restantes.
- Sistema de pontuação por acertos.
- Transição entre telas: início, jogo e game over.
- Reinício do jogo após fim de tentativas.

## Como Jogar
1. Clique no botão "Iniciar Jogo".
2. Tente adivinhar a palavra digitando letras.
3. Se acertar, a letra será revelada na palavra oculta.
4. Se errar, perderá uma tentativa.
5. O jogo termina se todas as tentativas forem usadas.
6. Se acertar todas as letras, ganha pontos e uma nova palavra é sorteada.
7. É possível reiniciar o jogo ao final.

## Estrutura do Projeto
```
    └── src/
        ├── App.css
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── components/
        │   ├── Game.css
        │   ├── Game.jsx
        │   ├── GameOver.css
        │   ├── GameOver.jsx
        │   ├── StartScreen.css
        │   └── StartScreen.jsx
        └── utils/
            └── words.js

```




