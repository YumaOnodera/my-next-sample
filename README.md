# my-next-sample

<p align="center">
<img src="https://img.shields.io/github/issues/YumaOnodera/my-next-sample" alt="issues">
<img src="https://img.shields.io/github/forks/YumaOnodera/my-next-sample" alt="issues">
<img src="https://img.shields.io/github/stars/YumaOnodera/my-next-sample" alt="issues">
<img src="https://img.shields.io/github/license/YumaOnodera/my-next-sample" alt="issues">
</p>

## my-next-sampleについて
my-next-sampleはアプリケーションのフロントエンドを手軽に開発するためのスターターキットです。  
Next.jsをベースにaxiosやtsconfigの設定、型定義、hooksなどをサンプルとして初めから実装しています。

本ドキュメントの手順通りにいくつかの設定を済ませるだけで、面倒な設定を省いて簡単にアプリケーションの土台を作成できます。

## 実装済みの内容
- 環境変数のサンプル
- .gitignoreの設定
- Dockerコンテナの設定
- axiosの設定
- tsconfigの設定
- 型定義
- hooks作成
- ホーム、404、認証画面のコンポーネント実装

アプリケーションの開発を進める上で必要な基本的な開発環境構築はすでに済ませてあります。  
必要に応じてプログラムをカスタマイズしてください。

## Dockerコンテナ
- node:18-alpine3.15

alpineベースの軽量コンテナを使用しています。

## 環境構築
### 前提
ローカル環境に以下がインストールされていること
- docker v20.10.17以上
- docker-compose v2.10.2以上

### 手順
- リポジトリをクローン
```
git clone https://github.com/YumaOnodera/my-next-sample.git アプリ名
```

## URL
フロントエンド
```
http://localhost:3000
```

## ライセンス
[MIT license](https://opensource.org/licenses/MIT) © YumaOnodera
