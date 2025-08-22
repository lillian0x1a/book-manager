<!-- src/lib/components/BackupRestore.svelte -->
<script lang="ts">
	import { booksStore } from '$lib/stores/books';

	let selectedFile: File | null = null; // 選択されたファイルを保持

	// エクスポート関数
	function exportData() {
		const data = $booksStore; // ストアからデータ取得
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'books_backup.json'; // ダウンロードファイル名
		a.click();
		URL.revokeObjectURL(url); // メモリリーク防止
	}

	// インポート関数
	async function importData() {
		if (!selectedFile) return;

		// ファイル読み込み
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const importedData = JSON.parse(e.target?.result as string);
				// バリデーション: Book型の配列か確認（シンプルなチェック）
				if (
					!Array.isArray(importedData) ||
					!importedData.every((b: any) => b.id && b.title && b.author)
				) {
					alert('無効なデータ形式です。Book型のJSONをインポートしてください。');
					return;
				}

				// 確認ダイアログ: 既存データを上書きするか？
				if (confirm('既存のデータを上書きしますか？（はい: 上書き, いいえ: キャンセル）')) {
					booksStore.importBooks(importedData); // ストアのimportBooksメソッドを呼び出し
					alert('インポートが成功しました！');
					selectedFile = null; // ファイル選択をリセット
				}
			} catch (error) {
				alert('JSONの解析に失敗しました。ファイルを確認してください。');
			}
		};
		reader.readAsText(selectedFile);
	}
</script>

<div class="space-y-4">
	<h2 class="text-lg font-bold">バックアップ/復元</h2>
	<div class="flex space-x-4">
		<button
			on:click={exportData}
			class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
		>
			エクスポート
		</button>
		<div class="flex items-center">
			<input
				type="file"
				accept=".json"
				on:change={(e) => {
					const target = e.target as HTMLInputElement | null;
					selectedFile = target?.files?.[0] || null;
					if (selectedFile) importData();
				}}
				class="hidden"
				id="import-file"
			/>
			<label
				for="import-file"
				class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
			>
				ファイルを選択
			</label>
		</div>
	</div>
</div>

<style>
	/* Tailwindクラスでスタイリング */
</style>
