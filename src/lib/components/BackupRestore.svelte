<!-- src/lib/components/BackupRestore.svelte -->
<script lang="ts">
	import { booksStore } from '$lib/stores/books';
	// SVGアイコンコンポーネントをインポート
	import SyncIcon from '$lib/components/icons/SyncIcon.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import DownloadIcon from '$lib/components/icons/DownloadIcon.svelte';
	import UploadIcon from '$lib/components/icons/UploadIcon.svelte';
	import FileIcon from '$lib/components/icons/FileIcon.svelte';
	import CheckIcon from '$lib/components/icons/CheckIcon.svelte';
	import XIcon from '$lib/components/icons/XIcon.svelte';
	import InfoIcon from '$lib/components/icons/InfoIcon.svelte';

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
			<SyncIcon class="text-purple-600" />
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
					<SpinnerIcon class="mr-2 text-white" />
					エクスポート中...
				{:else}
					<DownloadIcon class="mr-2" />
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
					<SpinnerIcon class="mr-2 text-white" />
					インポート中...
				{:else}
					<UploadIcon class="mr-2" />
					ファイルを選択してインポート
				{/if}
			</label>
			{#if selectedFile && !isImporting}
				<div class="mt-3 text-sm text-green-700 flex items-center">
					<FileIcon class="mr-1.5" />
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
				<CheckIcon class="mr-2" />
			{:else if notification.type === 'error'}
				<XIcon class="mr-2" />
			{:else}
				<InfoIcon class="mr-2" />
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
