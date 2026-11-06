# Juventude e Organização — dashboard da pesquisa

Site estático (HTML5, CSS3 e JavaScript puros, sem frameworks e sem banco de dados)
que apresenta os resultados da pesquisa **Juventude e Organização — Pesquisa sobre hábitos e organização pessoal**
(Maratona Tech, Nível 3). Complementa o [dashboard oficial do Google Planilhas](https://docs.google.com/spreadsheets/d/1whYqW4LcgDgzs1EekeTyq0nu8CTpUgH7-rKgihAJ6vU/edit?usp=sharing), que tem link no site (início, metodologia e rodapé). Se a planilha mudar de endereço, troque o link em `index.html`.

## Como executar localmente

1. Descompacte o ZIP.
2. Abra o arquivo `index.html` no navegador (duplo clique). Não precisa de servidor nem de internet,
   exceto para as fontes do Google Fonts (sem internet, o site usa a fonte padrão do sistema).

Opcional, com servidor local: `python3 -m http.server 8000` dentro da pasta e acesse http://localhost:8000.

## Como publicar no GitHub Pages

1. Crie um repositório e envie todos os arquivos desta pasta para a raiz dele.
2. Em Settings → Pages, escolha a branch principal e a pasta `/ (root)`.
3. O site fica disponível no endereço que o GitHub mostrar.

## Organização dos arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura e textos fixos das 8 seções |
| `style.css` | Visual, responsividade e acessibilidade |
| `script.js` | Cálculo dos indicadores, gráficos, filtros, análise exploratória, teste da hipótese e conclusão |
| `data/respostas.js` | As 22 respostas exatamente como no CSV do Google Forms, mais a lista de opções de cada pergunta |

Nenhum total ou porcentagem está escrito à mão: tudo é calculado de `data/respostas.js`.
Para atualizar a pesquisa, basta trocar as respostas nesse arquivo.

## Pontos de atenção sobre os dados

- Perguntas 2, 4 e 7 são de múltipla seleção: a porcentagem usa como base o total de participantes e pode somar mais de 100%.
- O Forms gravou "Ás vezes" (P1) e "Às vezes" (P3). O site trata as duas como a mesma opção, como a planilha.
- O carimbo de data/hora foi omitido de `respostas.js` porque o site não o usa.
- Os filtros afetam a visão geral e os gráficos. A análise exploratória e o teste da hipótese usam sempre todos os participantes.
- Não há filtro por idade, pois o formulário não coletou essa informação.
