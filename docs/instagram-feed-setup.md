# Feed automático do Instagram — configuração única

A implementação usa a **Instagram API with Instagram Login** para uma conta profissional e mantém o token fora do frontend.

## 1. Meta for Developers

1. Crie ou abra o app da AnnaStilus no Meta for Developers.
2. Adicione/configure **Instagram > API setup with Instagram business login**.
3. Autorize a conta profissional `@annastilus`.
4. Para este feed de leitura, solicite/use `instagram_business_basic`.
5. No painel da API do Instagram, use **Generate token** ao lado da conta autorizada.
6. O token gerado pelo próprio App Dashboard nesse fluxo já é de **longa duração (60 dias)**; cadastre esse valor diretamente no GitHub Secret descrito abaixo.

A integração consulta `GET /me?fields=user_id,username` e depois
`GET /<IG_ID>/media` solicitando apenas os campos necessários para os cards.

## 2. GitHub Actions Secrets

Em **Settings > Secrets and variables > Actions > New repository secret**, crie:

### `INSTAGRAM_ACCESS_TOKEN`

Token de longa duração da conta profissional `@annastilus`.

### `ANNASTILUS_AUTOMATION_TOKEN`

Fine-grained Personal Access Token do GitHub, restrito **somente** ao repositório da AnnaStilus, com:

- **Contents: Read and write** — para o commit do JSON disparar a atualização do GitHub Pages;
- **Secrets: Read and write** — para substituir `INSTAGRAM_ACCESS_TOKEN` pelo token renovado sem gravá-lo em arquivo público.

Não coloque nenhum dos dois valores no código.

## 3. Execução

O workflow `.github/workflows/update-instagram.yml`:

- busca o feed a cada hora;
- pode ser executado manualmente em **Actions > Atualizar feed do Instagram > Run workflow**;
- renova o token duas vezes por mês;
- só substitui `data/instagram-feed.json` após uma consulta válida;
- mantém o último JSON válido quando a Meta falha.

No primeiro teste manual, deixe `refresh_token` desmarcado. Depois que o token longo estiver confirmado,
você pode executar novamente com `refresh_token` marcado para validar a rotação automática.

## 4. Campo de crédito do desenvolvedor

No `index.html`, procure por `data-developer-name` e substitua somente:

`[nome do desenvolvedor]`

Não existe link fictício no campo.
