[![Build Status](https://github.com/poteitoo/yumemi/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/poteitoo/yumemi/actions?query=branch%3Amain)
[![Coverage Status](https://github.com/poteitoo/yumemi/actions/workflows/vitest.yml/badge.svg?branch=main)](https://github.com/poteitoo/yumemi/actions?query=branch%3Amain)
![codecov](https://codecov.io/gh/poteitoo/yumemi/branch/main/graph/badge.svg)

## 開発環境のセットアップ

```bash
# クローン
git clone https://github.com/poteitoo/yumemi
# ディレクトリに移動
cd yumemi
# pnpmをインストールしていない場合 (optional)
npm i -g pnpm
# 依存のインストール
pnpm i
# 環境変数の設定 (RESASのAPIキーを取得する必要があります)
cp .env.template .env.local
# 開発サーバを起動する
pnpm dev
```

## スクリプト

```bash
# 開発サーバー
pnpm dev
# ビルド
pnpm build
# ビルドファイルの立ち上げ
pnpm start
# ユニットテスト＆ e2eテスト
pnpm test
# リント＆フォーマット
pnpm fix
```

## ディレクトリ構成

```
- app
  - nextjsの特殊ディレクトリ
  - pageとapiのエンドポイントを定義する
  - 全てspaで実装する
- views
  - 各ページのUI
  - 各ページのカスタムフック
- services
  - back
    - バックエンドのサービス層の記述(apiのfetcher)
  - front
    - フロントエンドのサービス層の記述(apiのfetcher)
- entities
  - Zodで型定義
- public
  - 静的アセット
- components (optional)
  - 複数ページで使いまわせるUI
- hooks (optional)
  - 複数ページで使いまわせる共通ロジックのカスタムフック
- e2e
  - e2eテストの記述
- .github
  - github actionsの設定（e2e test・unit testの実行）
...config
```

## 実装の手順

適宜issueを立てて実装していく

https://github.com/poteitoo/yumemi-spa/issues

## 内容

1. RESAS(地域経済分析システム) APIの「都道府県一覧」APIから取得する
1. APIレスポンスから都道府県一覧のチェックボックスを動的に生成する
1. 都道府県にチェックを入れると、RESAS APIから選択された都道府県の「人口構成」を取得する
1. 人口構成APIレスポンスから、X軸:年、Y軸:人口数の折れ線グラフを動的に生成して表示する
   - 「総人口」の他に「年少人口」「生産年齢人口」「老年人口」も切り替えるUIを何らかの形で用意し表示できるようにすること（同時に表示する必要はない）

## 制約

1. React/Vue.jsのいずれかを用いてSPAを構築すること（バージョンはできるだけ最新版をご使用ください）
   - Nuxt.jsやNext.jsなどの、これらを内包したフレームワークの利用も許可する
1. Google Chrome最新版で正しく動くこと
1. リンターやフォーマッターを適切に設定すること
   - リンターにはESLint、フォーマッターにはPrettierを使用すること
1. TypeScriptで記述すること
1. テストケース/テストコードを作成すること
   - テストツールは任意のものを用いてよい
1. テスト実行時にエラーが発生しないこと
1. ソースコードはGitで管理し、作成したソースコードはGitHubにアップロードすること
1. 都道府県一覧および総人口情報はRESAS APIのデータを用いること
1. グラフは Highcharts や Rechart.js などのサードパーティ製のグラフライブラリを用いて描画すること
   - ただし、グラフライブラリは上記のものに限らず、任意のものを用いてよい
1. PC/スマートフォン表示に対応すること(レスポンシブデザイン対応)
   - ただし実機でなく、Google Chromeの検証ツールで確認できればよい
1. styleは自分で記述し、UIフレームワークなどは原則使用しないこと
   - chartライブラリ内包のstyle、リセット系のCSSライブラリについては利用可
   - また、css-in-jsやcss-modules、sassなどのエコシステムの利用を妨げるものではなく、あくまでcssの記述力を測る趣旨に留まる
1. Netlify / GitHub Pages / Firebase hosting / Vercel 等のホスティングサービスにデプロイし、インターネット経由で閲覧できる状態にし、そのURLを提出時に共有すること
