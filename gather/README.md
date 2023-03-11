# 映画情報取得アプリ
このアプリは、映画情報をThe Movie Database(TMDB)のAPIから取得し、jsonファイルに保存するものです。
クリーンアーキテクチャをベースにディレクトリ構成を設計し、ビジネスロジックを明確にしました。

## ディレクトリ構成
```
├── cmd
│   └── myapp
│       └── main.go
├── domain
│   ├── entity
│   │   ├── movie_detail.go
│   │   └── popular_movie.go
│   ├── repository
│   │   └── movie_repository.go
│   └── usecase
│       └── movie_usecase.go
├── infrastructure
│   ├── api
│   │   └── tmdb.go
│   ├── client
│   │   └── tmdb_client.go
│   ├── persistence
│   │   └── mongodb.go
│   └── web
├── interfaces
│   ├── controllers
│   │   └── movie_controller.go
│   ├── middlewares
│   └── presenters
└── util
    ├── errors.go
    └── logger.go
```

### 各ディレクトリの役割
- cmd : アプリケーションの起動方法に関するものを配置します。main.goはここに配置します。
- domain : ビジネスロジックに関するものを配置します。
- entity : アプリケーションで扱うデータを定義します。
- repository : データの永続化に関するインターフェースを定義します。
- usecase : ユースケースに関するものを配置します。ユースケースはビジネスロジックを表します。
- infrastructure : 技術的な実装に関するものを配置します。
- api : APIクライアントの実装を定義します。
- client : 外部APIクライアントの実装を定義します。
- persistence : データ永続化の実装を定義します。
- web : webアプリケーションの実装を定義します。
- interfaces : 外部とのインターフェースに関するものを配置します。
- controllers : HTTPリクエストを処理するためのコントローラーを定義します。
- middlewares : HTTPリクエストを処理するためのミドルウェアを定義します。
- presenters : HTTPレスポンスを生成するためのプレゼンターを定義します。
- util : その他のユーティリティクラスを定義します。

## セットアップ
.envファイルを作成し、以下の情報を記載してください。
```
TMDB_API_KEY=YOUR_TMDB_API_KEY
```
YOUR_TMDB_API_KEYの部分には、The Movie DBのAPIキーを入力してください。


次に、以下のコマンドを実行して依存関係をインストールしてください。
```
go mod download
```

## 実行方法
以下のコマンドで、映画情報を収集し、movies.jsonファイルに保存することができます。
```
go run cmd/myapp/main.go [収集するページ数] [ページ単位での映画IDの増分値]
```

例えば、最初の5ページの映画情報を取得する場合は以下のコマンドを実行します。
```
go run cmd/myapp/main.go 5 0
```

増分値を1に設定することで、5ページ目から10ページ目までの映画情報を取得できます。
```
go run cmd/myapp/main.go 5 1
```

出力されたmovies.jsonファイルには、以下の情報が含まれています。
- 映画のタイトル
- 映画の原題
- オーバービュー
- 公開日
- 人気度
- 評価値の平均値
- 評価数
- ポスター画像のURL
- バックドロップ画像のURL
- アダルト指定の有無
- ジャンルIDとジャンル名
- ストリーミングサービスの情報（購入、レンタル、定額配信）

## テスト
本アプリのユニットテストと統合テストを実行することができます。それぞれのテストは以下のコマンドで実行できます。
```
# ユニットテストの実行
go test ./...

# 統合テストの実行
go test -tags=integration ./...
```

## コントリビュージョン
本プロジェクトには貢献していただける方を募集しています。バグ報告、新機能の提案、コードの改善、ドキュメントの改善など、どんな形でも歓迎です。以下の手順に従って、プルリクエストを作成してください。

このリポジトリをフォークする。

ローカルで変更を加える。

テストを実行し、すべてのテストが通ることを確認する。

プルリクエストを作成する。

ライセンス

本プロジェクトはMITライセンスのもとで公開されています。詳細については、LICENSEファイルをご覧ください。

## お問い合わせ
本プロジェクトに関するご質問やお問い合わせがございましたら、以下の連絡先までご連絡ください。

メールアドレス: example@example.com
Twitter: @example