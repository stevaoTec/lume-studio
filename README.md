# LUME — Estúdio criativo
Site estático, em português, com identidade fornecida pelo usuário, escultura procedural e fallback Canvas 2D quando WebGL não está disponível.

Conteúdo servido em `dist/`. Não requer build ou dependências npm. Usar um servidor HTTP local para módulos ES. O arquivo `.openai/hosting.json` aponta para a pasta estática de publicação.

## Funcionalidades
Entrada animada com saída automática; navegação desktop/mobile; filtros e detalhes de estudos; acordeões de serviços; manifesto visual de 20 segundos com pausa e reinício; briefing com cópia e download local. O briefing não envia informações para um servidor e não está conectado ao Notion.

## Identidade e conteúdo
As imagens de marca foram fornecidas pelo usuário. As fotografias são referências Unsplash, não trabalhos de clientes. Ver `dist/CREDITS.txt`. Contatos comerciais reais e portfólio de clientes não foram fornecidos e não foram inventados.

## Validação executada
- Node syntax checks nos scripts.
- Navegador: abertura, filtros, modal de projeto, manifesto e pausa, geração e edição de briefing, menu mobile.
- Viewport mobile em iframe: largura de conteúdo igual à largura útil (375 px), sem overflow horizontal.
- Fallback tridimensional Canvas validado visualmente. O navegador de teste bloqueia contextos WebGL; o renderer Three.js não pôde ser verificado visualmente neste ambiente.
- Respeito a prefers-reduced-motion e pausa fora da viewport implementados.

A prancha de direção visual no Figma é complementar; o código do site é a implementação final.

## Direção 02 — Noir magnétique
Paleta neutra preto/prata, nova abertura e composição editorial, botões magnéticos em mouse, indicador de leitura e dois acabamentos da escultura (prata/obsidiana). Interações de ponteiro desativadas em toque e movimento reduzido. Menu, filtros, abertura de briefing, troca de material e pausa do 3D conferidos em navegador. Viewport útil mobile de 375 px sem overflow horizontal. WebGL segue indisponível no navegador de QA; fallback Canvas conferido.

## Direção 03 — Clareza e movimento
Nova abertura em dois painéis, apresentação escalonada de títulos/textos/imagens e transições de conteúdo por viewport. Redução de movimento respeitada. Ícones SVG substituem os caracteres pictográficos. Informações de colaboração, entregas e FAQ complementam o posicionamento sem inventar cases ou métricas.

Logo: curvas redesenhadas a partir da referência fornecida, exportadas em PNG RGBA de 2656 x 792 px. O SVG é uma reconstrução para uso digital, não o arquivo vetorial original da marca.

Validação: sintaxe Node, ausência de pictogramas Unicode no HTML/scripts, alfa do PNG confirmado, layout mobile útil de 375 px sem overflow, pausa 3D, expansão FAQ, geração de briefing e abertura de manifesto testados. Renderização WebGL permanece indisponível no navegador de QA; fallback Canvas verificado.

## Direção 04 — Identidade fiel e narrativa por rolagem
- Contornos do símbolo medidos da imagem de referência e convertidos em curvas. Letras regularizadas a partir das proporções e posições da referência; SVG de reconstrução e PNG RGBA 2568 x 748 px.
- O símbolo 3D usa os mesmos três contornos do emblema (duas formas fluidas e estrela), com extrusão e material metálico. Alternativa Canvas baseada nas mesmas curvas para navegadores sem WebGL.
- Seção de composição com fotografia, filme e interface que se montam conforme a rolagem. Animação reversível, controles por etapa e alternativa estática para movimento reduzido ou viewports muito baixos.
- Novas aplicações de serviços para marcas, produtos/histórias e experiências digitais. CTAs selecionam o serviço no briefing local, preservando nome e texto já preenchidos.

Validação: sintaxe dos módulos; símbolo Canvas verificado visualmente; progresso de rolagem completo (0,90) com todas as camadas e intermediário (0,31) com apenas fotografia e começo do filme. Mobile útil de 375 px sem overflow horizontal; controles de composição e seleção de serviço no briefing conferidos. O navegador de QA continua sem WebGL, então o renderer Three.js não foi validado visualmente neste ambiente.

## Direção 05 — Luz explorável e placas em movimento
- Ateliê de luz: iluminação guiada por ponteiro/toque ou slider acessível, com presets suave, cinema e noir e reset.
- Escultura: interpolação de movimento independente do frame time, luz móvel e exploração que separa/reúne as três partes originais do emblema.
- Rodapé com placas tipográficas dobradas pela rolagem, navegação, download da marca e repetição da abertura.

Validação: controles da iluminação, exploração e reunião do símbolo, repetição da abertura e CTA do rodapé conferidos no navegador. Layout mobile de 375 px úteis sem overflow e símbolo reposicionado para separar os controles. Sintaxe dos scripts validada. WebGL indisponível no navegador de QA; alternativa Canvas verificada visualmente.

## Direção 06 — Abertura cinematográfica
Cena escura com volume orbital, feixe de luz, frase introdutória e revelação progressiva da marca original. Sequência de 3,4 segundos + transição de 1,25 segundo; sem áudio e sem dependências. Primeira entrada por sessão, replay no rodapé, pular e Escape. Conteúdo temporariamente inert e rolagem bloqueada durante a abertura; foco devolvido ao início após replay. Movimento reduzido pula a cena.

Validação: sintaxe JavaScript, quadro desktop/mobile (390 px), saída automática, repetição e botão de pular conferidos em navegador.

## Direção 07 — LUME Films, conteúdo e hierarquia
Comparação com a referência fornecida: https://screenshot-to-silk-990.lovable.app/. Incorporados os nomes Triama, HD Studio e Centerbox e suas categorias, Pedro e Breno como fundadores, direção de arte e desenvolvimento criativo. Sem criar resultados, datas, biografias, imagens de clientes ou contatos não fornecidos.

Nova seleção de projetos com fichas navegáveis, manifesto editorial com acesso ao manifesto existente, seção dos fundadores e seis serviços integrados ao briefing. Laboratório visual separado do portfólio identificado. Abertura, símbolo 3D, composição por rolagem, Ateliê de luz, filtros, FAQ e rodapé preservados.

Validação executada: sintaxe JS, âncoras e assets locais, fichas e navegação de projetos, passagem para briefing, manifesto e novos serviços no briefing gerado. Layout mobile útil de 375 px sem overflow horizontal, fichas e fundadores conferidos visualmente. WebGL indisponível no navegador de QA; fallback Canvas conferido.

A referência ainda exibe showreel e biografias provisórios, detalhes de projetos incompletos e redes sociais apontando a #. Para completar essas partes com material real, são necessários o vídeo, os detalhes e as URLs comerciais.

## Vercel
A versão GitHub contém vercel.json com framework Other, sem build ou instalação e saída dist. Importar stevaoTec/lume-studio ou publicar seu commit main no projeto lume-studio.

## Direção 08 — Polimento restrito de motion e atmosfera
Escopo: apenas as seções adicionadas na direção 07, o destaque da frase da abertura e fumaça decorativa de fundo. Textos, navegação, serviços, interações e duração da abertura preservados.

Projetos com estudos gráficos abstratos de luz e entradas escalonadas; manifesto com revelação por linha e passagem de luz; fundadores com iniciais metálicas e profundidade. A frase da abertura ganha hierarquia e destaque luminoso na palavra luz. Fumaça procedural em Canvas de baixa resolução e frequência limitada, sem bibliotecas, pausa com a aba oculta e desativação por movimento reduzido ou economia de dados. Não captura cliques nem entra na árvore de acessibilidade.

Validação: comparação automatizada confirma o mesmo conteúdo textual, além de sintaxe JS, assets e âncoras. Ficha de HD Studio testada no celular; layouts desktop e mobile conferidos visualmente; largura útil de 375 px sem overflow horizontal. WebGL continua bloqueado pelo navegador de QA; renderer original preservado.

## Direção 09 — Conteúdo, serviços e ritmo
Textos refinados para clareza e unidade; todas as seções e os seis serviços preservados. Novo painel de formas metálicas acompanha a frente aberta ou focada no acordeão. Cada serviço tem um atalho que prepara o briefing com o preset correspondente, mantendo nome e ideia já digitados. Sem biblioteca adicional ou alteração da escultura principal.

Processo com título próprio, linha de etapas e saídas concretas de cada fase. FAQ revisado com uma resposta para quem ainda não tem uma ideia pronta. Ajustado espaçamento mobile do grid de serviços, que usava porcentagem e gerava uma lacuna excessiva.

Validação: sintaxe de finish.js e editorial.js, integridade de assets/âncoras/IDs e todos os presets. No navegador: troca do foco visual para sites e desenvolvimento criativo, CTAs com seleção correta, preservação de nome/ideia ao trocar para direção de arte, nova resposta do FAQ e largura útil mobile de 375 px sem overflow horizontal. Layouts desktop e mobile conferidos. Movimento reduzido implementado para os novos efeitos. WebGL segue indisponível no ambiente de QA; a escultura original e seu fallback foram preservados.
