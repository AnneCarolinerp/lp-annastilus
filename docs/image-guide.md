# Guia de imagens

## Estado atual

Os arquivos atuais foram recortados da prancha visual fornecida. Eles servem para reproduzir o layout, mas não substituem fotografias originais em alta resolução. Quando as fotos originais forem disponibilizadas, mantenha os mesmos nomes de saída e execute `npm run images`.

## Estrutura

```text
assets/images/
├── originals/
├── desktop/
├── tablet/
├── mobile/
├── icons/
├── logos/
├── backgrounds/
└── illustrations/
```

## Inventário

| Arquivo-base | Página / seção | Função | Exibição aproximada | Exportação | Proporção | Formato | Peso recomendado | Alt | Foco | Corte seguro |
|---|---|---|---:|---:|---:|---|---:|---|---|---|
| `hero-home` | Home / Hero | imagem editorial principal | 50% da largura, 500 px de altura | 920×850 | 1.08:1 | AVIF/WebP | 180 KB | decorativa no layout atual | mulher e bolsa | laterais e parte superior, sem remover bolsa |
| `about-home` | Home / Sobre | atendimento/boutique | 53% × 250 px | 900×520 | 1.73:1 | AVIF/WebP | 140 KB | atendimento personalizado em boutique | rosto | bordas laterais |
| `product-rasteira` | Home / Produtos | foto de produto | card 1 | 700×430 | 1.63:1 | AVIF/WebP | 90 KB | rasteira bege trançada | produto | fundo periférico |
| `product-sandalia` | Home / Produtos | foto de produto | card 2 | 700×430 | 1.63:1 | AVIF/WebP | 90 KB | sandália dourada de tiras finas | produto | fundo periférico |
| `product-scarpin` | Home / Produtos | foto de produto | card 3 | 700×430 | 1.63:1 | AVIF/WebP | 90 KB | scarpin clássico nude | produto | cortina e piso periféricos |
| `product-tenis` | Home / Produtos | foto de produto | card 4 | 700×430 | 1.63:1 | AVIF/WebP | 90 KB | tênis branco minimalista | produto | fundo periférico |
| `instagram-01` a `07` | Home / Instagram | galeria | miniaturas 7 colunas | 480×380 | 1.26:1 | AVIF/WebP | 55 KB cada | descrição individual no HTML | assunto central | bordas |
| `cta-home` | Home / CTA final | reforço de produto | 48% × 140 px | 900×310 | 2.90:1 | AVIF/WebP | 110 KB | sandália em composição de produto | calçado | fundo à direita |

## Variações

Cada arquivo-base possui:

- `desktop`: telas acima de 1023 px.
- `tablet`: telas intermediárias.
- `mobile`: celular, com recorte adaptado.

Padrão de nome:

```text
hero-home-desktop.avif
hero-home-desktop.webp
hero-home-tablet.avif
hero-home-tablet.webp
hero-home-mobile.avif
hero-home-mobile.webp
```

## Processamento

1. Instale Node.js 18 ou superior.
2. Execute `npm install`.
3. Coloque a imagem de origem em `assets/images/originals/`.
4. Ajuste `scripts/image-specs.json`.
5. Execute `npm run images`.

O script gera AVIF, WebP e atualiza `assets/images/image-manifest.json`.
