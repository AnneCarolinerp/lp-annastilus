# Checklist de testes

## Estrutura e navegação

- [x] `index.html` abre sem dependências de framework.
- [x] Política de privacidade abre pelo rodapé.
- [x] Página 404 possui retorno para a home.
- [x] Links internos apontam para IDs existentes.
- [x] Menu desktop está visível acima de 900 px.
- [x] Menu mobile abre e fecha.
- [x] Menu mobile fecha pela tecla Escape.
- [x] Skip link leva ao conteúdo principal.

## WhatsApp e links externos

- [x] Links do WhatsApp usam mensagem contextual.
- [x] Número ausente não leva a uma URL inválida.
- [x] Toast informa onde configurar.
- [x] Links de redes têm fallback seguro.
- [ ] Inserir número real e testar em celular.
- [ ] Inserir URLs reais das redes.

## Responsividade

- [x] Desktop: 1440 px.
- [x] Referência: 941 px.
- [x] Tablet: 768 px.
- [x] Mobile: 390 px.
- [x] Mobile pequeno: 320 px.
- [x] Cards não causam rolagem horizontal indevida.
- [x] Galeria mobile usa rolagem horizontal intencional.

## Acessibilidade

- [x] Um H1 por página.
- [x] Hierarquia de títulos coerente.
- [x] Foco visível.
- [x] Botão de menu possui `aria-expanded` e `aria-controls`.
- [x] Imagens informativas possuem alt.
- [x] Imagem decorativa do hero usa alt vazio.
- [x] `prefers-reduced-motion` respeitado.
- [x] Áreas de toque principais acima de 44 px.
- [ ] Validar contraste em ferramenta automatizada após inserir a fonte definitiva.
- [ ] Testar com NVDA ou VoiceOver antes da publicação.

## Performance

- [x] Sem frameworks.
- [x] JavaScript carregado com `defer`.
- [x] Imagens em AVIF e WebP.
- [x] Dimensões de imagens definidas.
- [x] Lazy loading abaixo da dobra.
- [x] Hero com prioridade alta.
- [ ] Substituir recortes da prancha por fotos originais em alta resolução.
- [ ] Executar Lighthouse no domínio de produção.

## SEO

- [x] Titles e descriptions.
- [x] Canonical provisório com domínio `.example`.
- [x] Open Graph e Twitter Cards.
- [x] JSON-LD.
- [x] `robots.txt` e `sitemap.xml`.
- [ ] Trocar domínio provisório pelo domínio real.
- [ ] Atualizar imagem social final.
- [ ] Enviar sitemap ao Google Search Console.

## Conteúdo e negócio

- [ ] Confirmar frete grátis e valor mínimo.
- [ ] Confirmar parcelamento.
- [ ] Confirmar política de troca.
- [ ] Confirmar preços e disponibilidade.
- [ ] Inserir depoimentos reais autorizados.
- [ ] Revisar política de privacidade.
