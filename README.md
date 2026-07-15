# AnnaStilus — site estático

Projeto em HTML5, CSS3 e JavaScript puro, desenvolvido a partir da prancha visual fornecida.

## Páginas

- `index.html`
- `politica-de-privacidade.html`
- `404.html`

## Abrir localmente

O site pode ser aberto diretamente pelo `index.html`, mas um servidor local evita restrições de navegador.

Com Node.js:

```bash
npm run serve
```

Ou com Python:

```bash
python -m http.server 4173
```

Depois, abra `http://localhost:4173`.

## Configuração obrigatória

Edite `assets/js/config.js`:

```js
window.ANNASTILUS_CONFIG = Object.freeze({
  whatsappNumber: '5585999999999',
  instagramUrl: 'https://www.instagram.com/SEU_PERFIL/',
  facebookUrl: '',
  pinterestUrl: '',
  siteUrl: 'https://seu-dominio.com.br/'
});
```

O WhatsApp deve conter somente números, incluindo DDI e DDD.

Também substitua `https://annastilus.example/` nos HTMLs, no `robots.txt` e no `sitemap.xml`.

## Imagens

Os arquivos atuais foram extraídos da prancha visual. Para gerar novamente:

```bash
npm install
npm run images
```

Ajuste os recortes em `scripts/image-specs.json`.

## Publicação

O projeto é compatível com hospedagem estática convencional:

- cPanel/FTP;
- Netlify;
- Vercel como site estático;
- GitHub Pages;
- Cloudflare Pages;
- Amazon S3/CloudFront.

Envie todo o conteúdo da pasta para a raiz pública da hospedagem.

### cPanel

1. Compacte o conteúdo do projeto.
2. Abra o Gerenciador de Arquivos.
3. Entre em `public_html`.
4. Envie e extraia os arquivos.
5. Confirme que `index.html` está diretamente em `public_html`.
6. Configure a página 404 no painel da hospedagem, se necessário.

## SEO

Antes de publicar:

1. Troque o domínio provisório.
2. Atualize canonical, Open Graph e JSON-LD.
3. Atualize o `sitemap.xml`.
4. Publique uma imagem social em alta resolução.
5. Cadastre o domínio no Google Search Console.

## Privacidade

A política de privacidade é um modelo e contém campos de validação. Revise conforme o fluxo real de pedidos, pagamento, entrega, atendimento e ferramentas instaladas.

## Estrutura

```text
/
├── index.html
├── politica-de-privacidade.html
├── 404.html
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── fonts/
├── docs/
├── scripts/
├── package.json
├── robots.txt
├── sitemap.xml
├── manifest.webmanifest
└── favicon.svg
```

## Documentação

- `docs/design-analysis.md`
- `docs/component-inventory.md`
- `docs/image-guide.md`
- `docs/content-guide.md`
- `docs/testing-checklist.md`
- `docs/visual-validation.md`
- `assets/images/image-manifest.json`
