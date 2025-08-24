<!-- src/lib/components/BackupRestore.svelte -->
<script lang="ts">
	import { booksStore } from '$lib/stores/books';
	let selectedFile: File | null = null;
	let isExporting = false;
	let isImporting = false;

	function exportData() {
		isExporting = true;
		try {
			const data = $booksStore;
			const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'books_backup.json';
			a.click();
			URL.revokeObjectURL(url);

			// エクスポート成功フィードバック
			showNotification('バックアップが正常に作成されました', 'success');
		} catch (error) {
			showNotification('バックアップの作成に失敗しました', 'error');
		} finally {
			isExporting = false;
		}
	}

	async function importData() {
		if (!selectedFile) return;

		isImporting = true;
		// ファイル読み込み
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const importedData = JSON.parse(e.target?.result as string);
				// バリデーション
				if (
					!Array.isArray(importedData) ||
					!importedData.every((b: any) => b.id && b.title && b.author)
				) {
					showNotification('無効なデータ形式です。Book型のJSONをインポートしてください。', 'error');
					return;
				}
				// 確認ダイアログ
				if (confirm('既存のデータを上書きしますか？（はい: 上書き, いいえ: キャンセル）')) {
					booksStore.importBooks(importedData);
					showNotification('インポートが成功しました！', 'success');
					selectedFile = null;
				}
			} catch (error) {
				showNotification('JSONの解析に失敗しました。ファイルを確認してください。', 'error');
			} finally {
				isImporting = false;
			}
		};
		reader.readAsText(selectedFile);
	}

	let notification = {
		show: false,
		message: '',
		type: 'info' // 'info', 'success', 'error'
	};

	function showNotification(message: string, type: 'info' | 'success' | 'error') {
		notification = {
			show: true,
			message,
			type
		};

		// 3秒後に通知を非表示
		setTimeout(() => {
			notification.show = false;
		}, 3000);
	}
</script>

<div class="bg-white rounded-2xl shadow-sm p-6 max-w-md mx-auto">
	<div class="flex items-center mb-4">
		<div class="bg-purple-100 p-2 rounded-lg mr-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 text-purple-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
				/>
			</svg>
		</div>
		<h2 class="text-xl font-medium text-gray-900">データ管理</h2>
	</div>

	<div class="space-y-5">
		<div class="bg-blue-50 rounded-xl p-5 border border-blue-100">
			<h3 class="text-lg font-medium text-blue-800 mb-3">バックアップ</h3>
			<p class="text-sm text-blue-600 mb-4">
				現在の書籍データをJSONファイルとしてエクスポートします
			</p>
			<button
				on:click={exportData}
				disabled={isExporting}
				class="w-full py-3 px-4 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center justify-center"
			>
				{#if isExporting}
					<svg
						class="animate-spin h-5 w-5 mr-2 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					エクスポート中...
				{:else}
					<svg
						class="w-5 h-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
						></path>
					</svg>
					データをエクスポート
				{/if}
			</button>
		</div>

		<div class="bg-green-50 rounded-xl p-5 border border-green-100">
			<h3 class="text-lg font-medium text-green-800 mb-3">復元</h3>
			<p class="text-sm text-green-600 mb-4">JSONファイルから書籍データをインポートします</p>

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
				disabled={isImporting}
			/>

			<label
				for="import-file"
				class="w-full py-3 px-4 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer"
			>
				{#if isImporting}
					<svg
						class="animate-spin h-5 w-5 mr-2 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					インポート中...
				{:else}
					<svg
						class="w-5 h-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
						></path>
					</svg>
					ファイルを選択してインポート
				{/if}
			</label>

			{#if selectedFile && !isImporting}
				<div class="mt-3 text-sm text-green-700 flex items-center">
					<svg
						class="w-4 h-4 mr-1.5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						></path>
					</svg>
					{selectedFile.name}
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- 通知コンポーネント -->
{#if notification.show}
	<div
		class="fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg transform transition-transform duration-300 animate-fade-in-up"
		class:bg-blue-500={notification.type === 'info'}
		class:bg-green-500={notification.type === 'success'}
		class:bg-red-500={notification.type === 'error'}
	>
		<div class="flex items-center text-white">
			{#if notification.type === 'success'}
				<svg
					class="w-5 h-5 mr-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
					></path>
				</svg>
			{:else if notification.type === 'error'}
				<svg
					class="w-5 h-5 mr-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				</svg>
			{:else}
				<svg
					class="w-5 h-5 mr-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
			{/if}
			<span>{notification.message}</span>
		</div>
	</div>
{/if}

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fadeInUp 0.3s ease-out forwards;
	}
</style>
