# Inventário de componentes

## Estruturais

| Componente | Arquivo principal | Observação |
|---|---|---|
| Container | `assets/css/base.css` | largura máxima e margens fluidas |
| Cabeçalho | `index.html`, `pages.css` | sticky no desktop e mobile |
| Menu mobile | `menu.js` | ARIA, Escape e fechamento por link |
| Rodapé | `index.html`, `pages.css` | responsivo em quatro níveis |
| Seção padrão | `base.css` | espaçamento fluido |

## Interface

| Componente | Variações | Estados |
|---|---|---|
| Botão | sólido, contorno, produto | hover, foco, configuração ausente |
| Marca | cabeçalho, rodapé | link para início |
| Título de seção | padrão, compacto | decoradores laterais |
| Toast | mensagem técnica | exibe e oculta automaticamente |
| WhatsApp flutuante | circular | hover e foco |

## Conteúdo

| Componente | Conteúdo |
|---|---|
| Hero | H1, parágrafo, dois CTAs, benefícios e imagem |
| Sobre | texto, ilustração e imagem |
| Diferencial | ícone SVG, título e descrição |
| Produto | imagem responsiva, nome, preço e CTA |
| Depoimento | avatar, estrelas, texto e identificação |
| Instagram | título, perfil e sete imagens |
| CTA final | imagem, texto e WhatsApp |

## Imagens

Todas as imagens de conteúdo usam `picture`, AVIF, WebP, dimensões explícitas e carregamento preguiçoso abaixo da dobra. A imagem do hero usa `fetchpriority="high"`.
