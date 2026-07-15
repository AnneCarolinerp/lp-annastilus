# Análise do design — AnnaStilus

## 1. Páginas identificadas

O material visual fornecido apresenta uma única página comercial completa:

1. `index.html` — página inicial, com navegação por âncoras.

Foram acrescentadas duas páginas técnicas necessárias para publicação:

2. `politica-de-privacidade.html` — modelo editável, com campos que precisam ser validados.
3. `404.html` — página de erro.

Não foram criadas páginas de catálogo, produto, checkout ou contato porque elas não aparecem no design.

## 2. Seções da página inicial

1. Barra superior de benefícios e atendimento.
2. Cabeçalho com logotipo, menu e CTA do WhatsApp.
3. Hero com chamada principal, dois botões, três benefícios e imagem editorial.
4. Bloco “Sobre a AnnaStilus”.
5. Faixa com quatro diferenciais.
6. Grade de quatro modelos em destaque.
7. Bloco de depoimentos.
8. Galeria de inspirações do Instagram.
9. CTA final com imagem e botão de WhatsApp.
10. Rodapé com navegação, informações, redes e formas de pagamento.
11. Botão flutuante do WhatsApp.

## 3. Componentes reutilizáveis

- `.container`
- `.button`, com variações sólida, contorno e produto
- `.brand`
- `.section-heading`
- cards de produto
- cards de depoimento
- itens de benefícios
- galeria responsiva
- toast de configuração
- links configuráveis de WhatsApp e redes sociais
- componente `picture` com AVIF, WebP e fallback

## 4. Cabeçalho e variações

- Cabeçalho principal: fixo durante o scroll, fundo translúcido, logotipo, menu horizontal e CTA.
- Cabeçalho mobile: logotipo, botão hamburguer e painel de navegação.
- Cabeçalho simples: usado na política de privacidade.

## 5. Rodapé e variações

- Rodapé principal em quatro colunas no desktop.
- Reorganização para três, duas e uma coluna conforme a largura.
- Rodapé simples para a página legal.

## 6. Menus

- Desktop: links para `#colecao`, `#categorias`, `#novidades` e `#sobre`.
- Mobile: menu expansível com suporte a teclado e tecla Escape.

## 7. Botões

- CTA verde sólido, formato de cápsula.
- Botão secundário com borda marrom.
- Botão compacto em cards de produto.
- Botão flutuante circular do WhatsApp.

Estados implementados: normal, hover, foco visível e indisponibilidade de configuração.

## 8. Cards

- Produto: imagem, nome, preço e CTA.
- Depoimento: avatar, estrelas, texto e identificação.
- Diferenciais: ícone, título e descrição.

## 9. Formulários

Não há formulário no design. Nenhum formulário foi inventado.

## 10. Modais

Não há modal no design. Para configurações ausentes, foi usado um toast discreto, que só aparece quando o usuário tenta abrir um link ainda não configurado.

## 11. Carrosséis

Não há carrossel no desktop. No mobile, a galeria do Instagram usa rolagem horizontal nativa com `scroll-snap`, sem dependências.

## 12. Accordions

Não identificados.

## 13. Abas

Não identificadas.

## 14. Elementos interativos

- Menu mobile.
- Links internos com rolagem suave.
- Links configuráveis do WhatsApp.
- Links configuráveis de redes sociais.
- Animações discretas de entrada.
- Hover nos cards e imagens.

## 15. Cores identificadas

| Token | Valor aproximado | Uso |
|---|---:|---|
| Fundo principal | `#fffaf7` | página |
| Superfície | `#fffdfb` | cards |
| Rosa-bege claro | `#f8eee8` | faixas e blocos |
| Texto principal | `#2e211c` | títulos e corpo |
| Texto secundário | `#665750` | descrições |
| Marrom | `#8f684c` | detalhes, ícones e barra superior |
| Marrom escuro | `#694b37` | marca e títulos auxiliares |
| Verde | `#536f35` | CTAs |
| Verde escuro | `#3f5728` | hover |
| Borda | `#decfc4` | cards e divisores |
| Dourado | `#d99a2b` | estrelas |

Os valores foram estimados visualmente a partir da prancha fornecida.

## 16. Tipografia identificada

- Títulos e marca: serifada editorial semelhante a Cormorant Garamond/Georgia.
- Corpo e interface: sans-serif neutra semelhante a Inter.

Como arquivos de fonte não foram fornecidos, o projeto usa:

- `Georgia, "Times New Roman", serif` para títulos.
- `Inter, system-ui, "Segoe UI", sans-serif` para corpo.

A substituição é documentada e não depende de serviço externo.

## 17. Escala aproximada de espaçamentos

Base modular aproximada:

- 4 px
- 8 px
- 12 px
- 16 px
- 24 px
- 32 px
- 48 px
- 64 px
- 88 px

Os principais containers usam margens fluidas com `clamp()`.

## 18. Breakpoints

- até 420 px: celular pequeno
- até 680 px: celular
- até 900 px: tablet e navegação mobile
- até 1100 px: notebook compacto
- acima de 1100 px: desktop

## 19. Imagens necessárias

- Hero principal.
- Foto da seção sobre.
- Quatro fotos de produto.
- Sete imagens da galeria do Instagram.
- Foto do CTA final.
- Fotos reais autorizadas para os depoimentos, caso a seção seja mantida.

As imagens atuais foram extraídas da própria prancha visual. Para produção, recomenda-se substituí-las pelos arquivos originais em alta resolução.

## 20. Pontos não completamente definidos

- Número do WhatsApp.
- URLs das redes sociais.
- Domínio definitivo.
- Políticas reais de frete, parcelamento, troca e devolução.
- Bandeiras e meios de pagamento aceitos.
- Depoimentos reais e autorização de uso de nome, imagem e perfil.
- Catálogo, estoque e preços definitivos.
- Fotos originais em alta resolução.
- Fonte exata e respectivos arquivos licenciados.
- Destino dos itens “Categorias”, “Perguntas frequentes” e “Trocas e devoluções”.

Essas pendências foram marcadas no código, na documentação ou na configuração, sem inventar dados empresariais.
