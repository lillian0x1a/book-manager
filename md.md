# 蔵書管理Webアプリ 仕様書

## 1. 概要

- **プロジェクト名**: 蔵書管理システム (Book Manager)
- **目的**: 個人の蔵書をWebアプリで管理する
- **開発環境**: Windows, Bun
- **使用技術**: Svelte, SvelteKit, Tailwind CSS
- **対象ユーザー**: 個人の書籍コレクションを管理したい人

## 2. システム要件

- **クライアント環境**: 現代のWebブラウザ（Chrome, Firefox, Safari, Edge）
- **サーバー環境**: SvelteKitの開発サーバー（将来的にはVercel/Netlify等にデプロイ予定）

## 3. 機能要件

### 3.1 書籍管理機能

| 機能     | 詳細                                               |
| -------- | -------------------------------------------------- |
| 書籍追加 | タイトル、著者（必須）、ISBN、出版日（任意）を入力 |
| 書籍一覧 | カード形式で全書籍を表示                           |
| 状態管理 | 「利用可能」「貸出中」の状態を切り替え             |
| 書籍削除 | 一覧から書籍を削除                                 |

### 3.2 UI/UX要件

- **デザイン**: モダンでシンプルなUI
- **カラーテーマ**: ライトモードベース
- **レスポンシブ**: モバイル/タブレット/PC対応
- **操作性**: 直感的な操作と視覚的フィードバック

## 4. 技術仕様

### 4.1 アーキテクチャ

```
┌─────────────────┐
│   SvelteKit     │
├─────────────────┤
│   Components    │
│   ├── AddBookForm │
│   ├── BookList   │
│   └── Layout     │
├─────────────────┤
│   Stores        │
│   └── books     │
├─────────────────┤
│   Tailwind CSS  │
└─────────────────┘
```

### 4.2 ディレクトリ構造

```
book-manager/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── AddBookForm.svelte
│   │   │   └── BookList.svelte
│   │   ├── stores/
│   │   │   └── books.ts
│   │   └── types/
│   │       └── book.ts
│   ├── routes/
│   │   ├── +layout.svelte
│   │   └── +page.svelte
│   ├── app.css
│   └── app.html
├── static/
├── tailwind.config.js
├── postcss.config.js
├── svelte.config.js
├── vite.config.ts
└── package.json
```

### 4.3 データモデル

```typescript
interface Book {
	id: string; // UUID
	title: string; // 書籍タイトル（必須）
	author: string; // 著者（必須）
	isbn?: string; // ISBN（任意）
	publishedDate?: string; // 出版日（任意）
	status: 'available' | 'borrowed'; // 状態
}
```

### 4.4 主要コンポーネント

#### AddBookForm.svelte

- **役割**: 書籍追加フォーム
- **状態**: title, author, isbn, publishedDate
- **イベント**: フォーム送信時にbooksStore.addBook()を呼び出し
- **UI**:
  - 入力フィールド（タイトル、著者、ISBN、出版日）
  - 追加ボタン

#### BookList.svelte

- **役割**: 書籍一覧表示
- **データ**: $booksStoreを購読
- **イベント**:
  - 貸出/返却ボタン: booksStore.updateStatus()
  - 削除ボタン: booksStore.removeBook()
- **UI**:
  - カード形式で書籍を表示
  - 状態に応じた色分け（利用可能:緑、貸出中:赤）

#### books.ts (Store)

- **役割**: 書籍データの状態管理
- **メソッド**:
  - `subscribe`: ストアの変更を購読
  - `addBook`: 新規書籍を追加
  - `removeBook`: 書籍を削除
  - `updateStatus`: 状態を更新

## 5. 開発経緯と課題

### 5.1 技術選定

- **Svelte**: リアクティブなUIを簡単に構築可能
- **SvelteKit**: フルスタックフレームワークとして採用
- **Tailwind CSS**: ユーティリティファーストのCSSフレームワーク

### 5.2 開発環境

- **OS**: Windows
- **パッケージマネージャ**: Bun
- **エディタ**: VS Code（推奨）
- **ブラウザ**: Chrome（開発）

## 6. 今後の拡張案

### 6.1 機能拡張

1. **検索機能**: 書籍タイトルや著者での検索
2. **ソート機能**: タイトル、著者、出版日でのソート
3. **フィルタ機能**: 状態（利用可能/貸出中）でのフィルタ
4. **貸出履歴**: 誰にいつ貸出したかの履歴管理
5. **データ永続化**: IndexedDBやlocalStorageへの保存
6. **バックアップ/復元**: データのエクスポート/インポート
7. **自動入力**: ISBNを入力するとタイトル、著者、出版日を自動で入力

### 6.2 UI/UX改善

1. **ダークモード/ライトモード切り替え**
2. **アニメーション**: 状態変化時のトランジション
3. **削除確認**: 削除前の確認ダイアログ
4. **編集機能**: 書籍情報の編集
5. **詳細表示**: 書籍の詳細情報をモーダルで表示

### 6.3 技術的改善

1. **バックエンド連携**: データベース（SQLite, PostgreSQL）との連携
2. **ユーザー認証**: 複数ユーザーでの利用
3. **PWA対応**: オフラインでの利用
4. **テスト**: ユニットテスト、E2Eテストの導入

## 7. まとめ

- 現時点で基本的な蔵書管理機能を実装済み
- シンプルでモダンなUIを実現
- 拡張性を考慮した設計
- 今後の機能追加に向けた土台が完成
