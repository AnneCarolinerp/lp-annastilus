# Feed automático do Instagram — configuração única

O site está preparado para usar a **Instagram API with Instagram Login** em uma conta profissional e nunca envia o token ao navegador.

## 1. Preparar a conta na Meta

1. A conta `@annastilus` precisa ser **Instagram Business ou Creator**.
2. No Meta for Developers, crie/abra o app da AnnaStilus.
3. Configure **Instagram > API setup with Instagram business login**.
4. Autorize a conta profissional `@annastilus`.
5. Para leitura do perfil/feed, conceda a permissão necessária de acesso básico da API (`instagram_business_basic`).
6. Gere o token da conta e use um **token de longa duração**.

A integração valida primeiro a conta em `/me`, exige que o usuário retornado seja `annastilus` e só depois consulta `/<IG_USER_ID>/media`.

## 2. GitHub Actions Secrets

No repositório, abra:

**Settings > Secrets and variables > Actions > New repository secret**

Crie exatamente estes dois secrets:

### `INSTAGRAM_ACCESS_TOKEN`

Token de longa duração da conta profissional `@annastilus`.

### `ANNASTILUS_AUTOMATION_TOKEN`

Fine-grained Personal Access Token do GitHub restrito **somente** ao repositório da AnnaStilus.

Permissões mínimas do repositório:

- **Contents: Read and write** — permite ao workflow commitar `data/instagram-feed.json` e fazer o push que publica a mudança no GitHub Pages;
- **Secrets: Read and write** (permissão `write` na API) — permite substituir `INSTAGRAM_ACCESS_TOKEN` pelo token renovado.

Nunca coloque nenhum desses valores no HTML, JavaScript, JSON ou arquivo versionado.

## 3. Como funciona

O workflow `.github/workflows/update-instagram.yml`:

1. roda a cada hora;
2. lê `INSTAGRAM_ACCESS_TOKEN` apenas dentro do GitHub Actions;
3. consulta os 7 posts mais recentes de `@annastilus`;
4. grava somente os dados públicos necessários em `data/instagram-feed.json`;
5. faz commit/push apenas quando o JSON mudou;
6. duas vezes por mês renova o token longo e salva o novo valor diretamente no Secret;
7. se a Meta/API falhar, o script termina com erro **antes de substituir o JSON válido anterior**.

No navegador, `assets/js/instagram-feed.js` lê apenas o JSON público. Se ele estiver vazio, inválido ou indisponível, as imagens locais que já existem no HTML permanecem como fallback e a seção não quebra.

## 4. Primeiro teste

Depois de criar os dois Secrets:

1. abra **Actions** no GitHub;
2. escolha **Atualizar feed do Instagram**;
3. clique em **Run workflow**;
4. no primeiro teste, deixe **refresh_token** desmarcado;
5. confirme que o job **update-feed** terminou verde;
6. confira se `data/instagram-feed.json` recebeu `generatedAt` e até 7 itens em `posts`;
7. abra o site publicado e force uma atualização da página;
8. depois, execute novamente marcando **refresh_token** para validar a renovação automática do token.

## 5. Comportamento visual

- título e `@annastilus` permanecem inalterados;
- o `@annastilus` abre o perfil;
- os cards carregados pelo JSON abrem a publicação específica;
- imagens/reels usam a imagem ou thumbnail retornada pela API;
- a grade mantém as proporções atuais e `object-fit: cover`;
- a ordem é do post mais recente para o mais antigo.

## 6. Crédito do desenvolvedor

O rodapé usa duas linhas. O nome `Carol Rodrigues` possui a classe `.footer-developer__name` e o sublinhado aparece apenas em `:hover`/`:focus-visible`.
