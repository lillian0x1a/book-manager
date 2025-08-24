<script lang="ts">
	import { booksStore } from '$lib/stores/books';
	// SVGアイコンコンポーネントをインポート
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import DownloadIcon from '$lib/components/icons/DownloadIcon.svelte';
	import UploadIcon from '$lib/components/icons/UploadIcon.svelte';
	import FileIcon from '$lib/components/icons/FileIcon.svelte';
	import CheckIcon from '$lib/components/icons/CheckIcon.svelte';
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';
	import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
	import { onMount } from 'svelte';

	let selectedFile: File | null = null;
	let isExporting = false;
	let isImporting = false;
	let showConfirmModal = false;
	let importedData: any[] | null = null;

	// コンポーネントがマウントされたときにスクロールを無効化
	onMount(() => {
		// bodyのスクロールを無効化
		document.body.style.overflow = 'hidden';
		document.body.style.position = 'fixed';
		document.body.style.width = '100%';
		document.body.style.height = '100%';
		// htmlのスクロールを無効化
		document.documentElement.style.overflow = 'hidden';
		document.documentElement.style.position = 'fixed';
		document.documentElement.style.width = '100%';
		document.documentElement.style.height = '100%';
		// クリーンアップ関数
		return () => {
			document.body.style.overflow = '';
			document.body.style.position = '';
			document.body.style.width = '';
			document.body.style.height = '';
			document.documentElement.style.overflow = '';
			document.documentElement.style.position = '';
			document.documentElement.style.width = '';
			document.documentElement.style.height = '';
		};
	});

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
				const data = JSON.parse(e.target?.result as string);
				// バリデーション
				if (!Array.isArray(data) || !data.every((b: any) => b.id && b.title && b.author)) {
					showNotification('無効なデータ形式です。Book型のJSONをインポートしてください。', 'error');
					return;
				}
				// 確認モーダルを表示
				importedData = data;
				showConfirmModal = true;
			} catch (error) {
				showNotification('JSONの解析に失敗しました。ファイルを確認してください。', 'error');
			} finally {
				isImporting = false;
			}
		};
		reader.readAsText(selectedFile);
	}

	function confirmImport() {
		if (importedData) {
			booksStore.importBooks(importedData);
			showNotification('インポートが成功しました！', 'success');
			selectedFile = null;
			importedData = null;
			showConfirmModal = false;
		}
	}

	function cancelImport() {
		importedData = null;
		showConfirmModal = false;
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

	// 通知の背景色を計算
	$: notificationBgColor =
		notification.type === 'info'
			? 'bg-blue-500/80'
			: notification.type === 'success'
				? 'bg-green-500/80'
				: 'bg-red-500/80';
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
	class="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8 flex items-center justify-center fixed inset-0 overflow-hidden"
>
	<div
		class="bg-white/30 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-6 max-w-md w-full space-y-5 overflow-y-auto max-h-[calc(100vh-4rem)]"
	>
		<div class="bg-blue-100/30 backdrop-blur-sm rounded-xl p-5 border border-blue-200/30 shadow-md">
			<h3 class="text-lg font-medium text-blue-800 mb-3">バックアップ</h3>
			<p class="text-sm text-blue-700 mb-4">
				現在の書籍データをJSONファイルとしてエクスポートします
			</p>
			<button
				on:click={exportData}
				disabled={isExporting}
				class="w-full py-3 px-4 rounded-xl bg-blue-500/80 backdrop-blur-sm text-white font-medium hover:bg-blue-600/80 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 transition-all disabled:opacity-50 flex items-center justify-center"
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
			class="bg-green-100/30 backdrop-blur-sm rounded-xl p-5 border border-green-200/30 shadow-md"
		>
			<h3 class="text-lg font-medium text-green-800 mb-3">復元</h3>
			<p class="text-sm text-green-700 mb-4">JSONファイルから書籍データをインポートします</p>
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
				class="w-full py-3 px-4 rounded-xl bg-green-500/80 backdrop-blur-sm text-white font-medium hover:bg-green-600/80 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:ring-offset-2 transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"
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
					class="mt-3 text-sm text-green-700 flex items-center bg-green-100/30 backdrop-blur-sm rounded-lg p-2 border border-green-200/30"
				>
					<FileIcon class="mr-1.5" />
					{selectedFile.name}
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- 確認モーダル -->
{#if showConfirmModal}
	<div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
		<div
			class="bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl w-full max-w-md transform transition-all p-6"
		>
			<div class="flex justify-between items-center mb-5">
				<h2 class="text-xl font-semibold text-gray-800 flex items-center">
					<InfoIcon class="text-yellow-500 mr-2" />
					データの上書き確認
				</h2>
				<button
					on:click={cancelImport}
					class="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-white/30 backdrop-blur-sm transition"
				>
					<CloseIcon />
				</button>
			</div>
			<div class="space-y-4">
				<div class="bg-yellow-100/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/30">
					<p class="text-yellow-800">
						既存の書籍データをインポートしたデータで上書きしようとしています。この操作は元に戻せません。
					</p>
				</div>
				<div class="text-gray-700">
					<p class="font-medium mb-2">インポート内容:</p>
					<ul class="list-disc pl-5 space-y-1 text-sm">
						<li>書籍数: {importedData?.length || 0} 冊</li>
						<li>ファイル名: {selectedFile?.name || '不明'}</li>
					</ul>
				</div>
			</div>
			<div class="flex justify-end space-x-3 mt-8 pt-4 border-t border-white/30">
				<button
					type="button"
					class="px-4 py-2 bg-white/30 backdrop-blur-sm text-gray-800 font-medium rounded-xl hover:bg-white/40 transition"
					on:click={cancelImport}
				>
					キャンセル
				</button>
				<button
					type="button"
					class="px-4 py-2 bg-red-500/80 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-red-600/80 transition"
					on:click={confirmImport}
				>
					上書きする
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- 通知コンポーネント -->
{#if notification.show}
	<div
		class="fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-xl backdrop-blur-md transform transition-transform duration-300 animate-fade-in-up flex items-center text-white border border-white/30 {notificationBgColor}"
	>
		{#if notification.type === 'success'}
			<CheckIcon class="mr-2" />
		{:else if notification.type === 'error'}
			<CloseIcon class="mr-2" />
		{:else}
			<InfoIcon class="mr-2" />
		{/if}
		<span>{notification.message}</span>
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
