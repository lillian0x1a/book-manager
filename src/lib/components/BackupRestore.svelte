<script lang="ts">
	import { books } from '$lib/stores/books';
	import { SpinnerIcon, DownloadIcon, UploadIcon, FileIcon } from '$lib/components/icons';
	import { onMount } from 'svelte';
	import Notification from './Notification.svelte';
	import ConfirmModal from './ConfirmModal.svelte';
	import type { Book, Notification as NotificationType } from '$lib/types/book';
	import { AppError, ValidationError, NetworkError } from '$lib/types/errors';
	import { validateBookData } from '$lib/utils/validation';

	let selectedFile: File | null = null;
	let isExporting = false;
	let isImporting = false;
	let showConfirmModal = false;
	let importedData: Book[] | null = null;
	let notification: NotificationType = {
		show: false,
		message: '',
		type: 'info'
	};

	// コンポーネントがマウントされたときにスクロールを無効化
	onMount(() => {
		// bodyのスクロールを無効化
		document.body.classList.add('overflow-hidden', 'fixed', 'w-full', 'h-full');
		// htmlのスクロールを無効化
		document.documentElement.classList.add('overflow-hidden', 'fixed', 'w-full', 'h-full');

		// クリーンアップ関数
		return () => {
			document.body.classList.remove('overflow-hidden', 'fixed', 'w-full', 'h-full');
			document.documentElement.classList.remove('overflow-hidden', 'fixed', 'w-full', 'h-full');
		};
	});

	function exportData(): void {
		isExporting = true;
		try {
			const data = $books;
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
			console.error('Export error:', error);
			const errorMessage =
				error instanceof AppError ? error.message : 'バックアップの作成に失敗しました';
			showNotification(errorMessage, 'error');
		} finally {
			isExporting = false;
		}
	}

	async function importData(): Promise<void> {
		if (!selectedFile) return;
		isImporting = true;

		// ファイル読み込み
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const result = e.target?.result as string;
				if (!result) {
					throw new AppError('ファイルの読み込みに失敗しました');
				}
				const data = JSON.parse(result);
				// バリデーション
				const validatedBooks = validateBookData(data);
				// 確認モーダルを表示
				importedData = validatedBooks;
				showConfirmModal = true;
			} catch (error) {
				console.error('Import error:', error);
				let errorMessage = 'JSONの解析に失敗しました。ファイルを確認してください。';
				if (error instanceof ValidationError) {
					errorMessage = error.message;
				} else if (error instanceof AppError) {
					errorMessage = error.message;
				}
				showNotification(errorMessage, 'error');
			} finally {
				isImporting = false;
			}
		};

		reader.onerror = () => {
			showNotification('ファイルの読み込み中にエラーが発生しました', 'error');
			isImporting = false;
		};

		reader.readAsText(selectedFile);
	}

	function confirmImport(): void {
		if (importedData) {
			try {
				books.importBooks(importedData);
				showNotification('インポートが成功しました！', 'success');
				selectedFile = null;
				importedData = null;
				showConfirmModal = false;
			} catch (error) {
				console.error('Import confirmation error:', error);
				const errorMessage =
					error instanceof AppError ? error.message : 'インポート中にエラーが発生しました';
				showNotification(errorMessage, 'error');
			}
		}
	}

	function cancelImport(): void {
		importedData = null;
		showConfirmModal = false;
	}

	function showNotification(message: string, type: 'info' | 'success' | 'error'): void {
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

	function handleFileChange(e: Event): void {
		const target = e.target as HTMLInputElement | null;
		selectedFile = target?.files?.[0] || null;
		if (selectedFile) importData();
	}
</script>

<svelte:head>
	<style>
		html,
		body {
			overflow: hidden !important;
			position: fixed !important;
			width: 100% !important;
			height: 100% !important;
			margin: 0 !important;
			padding: 0 !important;
			touch-action: none !important;
		}
		* {
			touch-action: none !important;
		}
	</style>
</svelte:head>

<div
	class="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8 flex items-center justify-center fixed inset-0 overflow-hidden"
>
	<div
		class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl p-6 max-w-md w-full space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]"
	>
		<div
			class="bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/30 shadow-md"
		>
			<h3 class="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">バックアップ</h3>
			<p class="text-sm text-blue-700 dark:text-blue-300 mb-5">
				現在の書籍データをJSONファイルとしてエクスポートします
			</p>
			<button
				on:click={exportData}
				disabled={isExporting}
				class="w-full py-3.5 px-4 rounded-2xl bg-blue-500/90 dark:bg-blue-600/90 backdrop-blur-sm text-white font-medium hover:bg-blue-600/90 dark:hover:bg-blue-700/90 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 flex items-center justify-center shadow-lg hover:shadow-xl"
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

		<div
			class="bg-green-100/50 dark:bg-green-900/30 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50 dark:border-green-700/30 shadow-md"
		>
			<h3 class="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">復元</h3>
			<p class="text-sm text-green-700 dark:text-green-300 mb-5">
				JSONファイルから書籍データをインポートします
			</p>

			<input
				type="file"
				accept=".json"
				on:change={handleFileChange}
				class="hidden"
				id="import-file"
				disabled={isImporting}
			/>

			<label
				for="import-file"
				class="w-full py-3.5 px-4 rounded-2xl bg-green-500/90 dark:bg-green-600/90 backdrop-blur-sm text-white font-medium hover:bg-green-600/90 dark:hover:bg-green-700/90 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl"
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
				<div
					class="mt-4 text-sm text-green-700 dark:text-green-300 flex items-center bg-green-100/50 dark:bg-green-900/30 backdrop-blur-sm rounded-xl p-3 border border-green-200/50 dark:border-green-700/30"
				>
					<FileIcon class="mr-2" />
					{selectedFile.name}
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- 確認モーダル -->
<ConfirmModal
	show={showConfirmModal}
	onConfirm={confirmImport}
	onCancel={cancelImport}
	{importedData}
	fileName={selectedFile?.name || null}
/>

<!-- 通知コンポーネント -->
<Notification {notification} />
