<script>
	import { onMount } from 'svelte';
	import BookList from '$lib/components/BookList.svelte';
	import AddBookForm from '$lib/components/AddBookForm.svelte';
	import BackupRestore from '$lib/components/BackupRestore.svelte';
	// SVGアイコンコンポーネントをインポート
	import BookIcon from '$lib/components/icons/BookIcon.svelte';
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';
	import AddIcon from '$lib/components/icons/AddIcon.svelte';
	import SyncIcon from '$lib/components/icons/SyncIcon.svelte';

	let activeTab = 'bookList'; // 'bookList', 'addBook', 'backupRestore'
	let isMobile = false;

	// 画面サイズを検出
	function checkScreenSize() {
		isMobile = window.innerWidth < 768;
	}

	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	});
</script>

<div class="min-h-screen bg-gray-50 flex">
	<!-- macOS用サイドバー -->
	{#if !isMobile}
		<nav class="w-64 bg-gray-100 border-r border-gray-200 flex-shrink-0 hidden md:flex flex-col">
			<div class="p-6 border-b border-gray-200">
				<h2 class="text-2xl font-semibold text-gray-900">読書管理</h2>
			</div>
			<div class="flex-1 overflow-y-auto p-4">
				<ul class="space-y-1">
					<li>
						<button
							class="w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors {activeTab ===
							'bookList'
								? 'bg-blue-500 text-white'
								: 'text-gray-700 hover:bg-gray-200'}"
							on:click={() => (activeTab = 'bookList')}
						>
							<BookIcon />
							<span>書籍一覧</span>
						</button>
					</li>
					<li>
						<button
							class="w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors {activeTab ===
							'addBook'
								? 'bg-blue-500 text-white'
								: 'text-gray-700 hover:bg-gray-200'}"
							on:click={() => (activeTab = 'addBook')}
						>
							<AddIcon />
							<span>書籍を追加</span>
						</button>
					</li>
					<li>
						<button
							class="w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors {activeTab ===
							'backupRestore'
								? 'bg-blue-500 text-white'
								: 'text-gray-700 hover:bg-gray-200'}"
							on:click={() => (activeTab = 'backupRestore')}
						>
							<SettingsIcon />
							<span>データ管理</span>
						</button>
					</li>
				</ul>
			</div>
		</nav>
	{/if}

	<!-- メインコンテンツエリア -->
	<main class="flex-1 overflow-auto">
		<!-- iOS用ナビゲーションバー -->
		{#if isMobile}
			<header
				class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10"
			>
				{#if activeTab === 'bookList'}
					<div class="flex items-center mb-4">
						<div class="bg-green-100 p-2 rounded-lg mr-3">
							<BookIcon class="text-green-600" />
						</div>
						<h2 class="text-xl font-medium text-gray-900">書籍一覧</h2>
					</div>
					<button
						class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white"
						on:click={() => (activeTab = 'addBook')}
					>
						<AddIcon />
					</button>
				{/if}
				{#if activeTab === 'addBook'}
					<div class="flex items-center mb-4">
						<div class="bg-blue-100 p-2 rounded-lg mr-3">
							<AddIcon class="text-blue-600" />
						</div>
						<h2 class="text-xl font-medium text-gray-900">書籍を追加</h2>
					</div>
				{/if}
				{#if activeTab === 'backupRestore'}
					<div class="flex items-center mb-4">
						<div class="bg-purple-100 p-2 rounded-lg mr-3">
							<SyncIcon class="text-purple-600" />
						</div>
						<h2 class="text-xl font-medium text-gray-900">データ管理</h2>
					</div>
				{/if}
			</header>
		{/if}

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
			<!-- macOS用ツールバー -->
			{#if !isMobile}
				<div class="mb-6 flex items-center justify-between">
					{#if activeTab === 'bookList'}
						<div class="flex items-center mb-4">
							<div class="bg-green-100 p-2 rounded-lg mr-3">
								<BookIcon class="text-green-600" />
							</div>
							<h2 class="text-xl font-medium text-gray-900">書籍一覧</h2>
						</div>
						<button
							class="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
							on:click={() => (activeTab = 'addBook')}
						>
							<AddIcon />
							<span>書籍を追加</span>
						</button>
					{/if}
					{#if activeTab === 'addBook'}
						<div class="flex items-center mb-4">
							<div class="bg-blue-100 p-2 rounded-lg mr-3">
								<AddIcon class="text-blue-600" />
							</div>
							<h2 class="text-xl font-medium text-gray-900">書籍を追加</h2>
						</div>{/if}
					{#if activeTab === 'backupRestore'}
						<div class="flex items-center mb-4">
							<div class="bg-purple-100 p-2 rounded-lg mr-3">
								<SyncIcon class="text-purple-600" />
							</div>
							<h2 class="text-xl font-medium text-gray-900">データ管理</h2>
						</div>
					{/if}
				</div>
			{/if}

			<!-- コンテンツエリア -->
			{#if activeTab === 'bookList'}
				<BookList />
			{:else if activeTab === 'addBook'}
				<AddBookForm />
			{:else if activeTab === 'backupRestore'}
				<BackupRestore />
			{/if}
		</div>
	</main>

	<!-- iOS用タブバー -->
	{#if isMobile}
		<nav
			class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4 md:hidden"
		>
			<button
				class="flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-colors {activeTab ===
				'bookList'
					? 'text-blue-500 active-tab'
					: 'text-gray-500'}"
				on:click={() => (activeTab = 'bookList')}
			>
				<BookIcon class="text-2xl" />
				<span class="text-xs mt-1">一覧</span>
			</button>
			<button
				class="flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-colors {activeTab ===
				'addBook'
					? 'text-blue-500 active-tab'
					: 'text-gray-500'}"
				on:click={() => (activeTab = 'addBook')}
			>
				<AddIcon class="text-2xl" />
				<span class="text-xs mt-1">追加</span>
			</button>
			<button
				class="flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-colors {activeTab ===
				'backupRestore'
					? 'text-blue-500 active-tab'
					: 'text-gray-500'}"
				on:click={() => (activeTab = 'backupRestore')}
			>
				<SettingsIcon class="text-2xl" />
				<span class="text-xs mt-1">設定</span>
			</button>
		</nav>
	{/if}
</div>

<style>
	/* Appleのシステムフォントを優先 */
	:global(body) {
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
	}

	/* モバイル用コンテンツの下部余白（タブバー分） */
	@media (max-width: 767px) {
		main {
			padding-bottom: 5rem;
		}
	}

	/* ボタンのホバーエフェクト */
	button {
		transition: all 0.2s ease;
	}

	/* iOSスタイルのタブバーアイテム */
	@media (max-width: 767px) {
		nav button {
			position: relative;
		}
		nav button::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 4px;
			height: 4px;
			border-radius: 50%;
			background-color: currentColor;
			opacity: 0;
			transition: opacity 0.2s ease;
		}
		nav button.active-tab::after {
			opacity: 1;
		}
	}
</style>
