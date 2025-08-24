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

<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex">
	<!-- macOS用サイドバー -->
	<nav
		class="w-64 bg-white/30 backdrop-blur-lg border border-white/20 flex-shrink-0 flex flex-col shadow-lg min-h-screen {isMobile
			? 'hidden'
			: 'block'} z-10"
	>
		<div class="p-6 border-b border-white/20">
			<h2 class="text-2xl font-semibold text-gray-800">読書管理</h2>
		</div>
		<div class="flex-1 overflow-y-auto p-4">
			<ul class="space-y-1">
				<li>
					<button
						class="w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 transition-all {activeTab ===
						'bookList'
							? 'bg-white/40 text-indigo-700 shadow-md'
							: 'text-gray-700 hover:bg-white/20'}"
						on:click={() => (activeTab = 'bookList')}
					>
						<BookIcon />
						<span>書籍一覧</span>
					</button>
				</li>
				<li>
					<button
						class="w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 transition-all {activeTab ===
						'addBook'
							? 'bg-white/40 text-indigo-700 shadow-md'
							: 'text-gray-700 hover:bg-white/20'}"
						on:click={() => (activeTab = 'addBook')}
					>
						<AddIcon />
						<span>書籍を追加</span>
					</button>
				</li>
				<li>
					<button
						class="w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 transition-all {activeTab ===
						'backupRestore'
							? 'bg-white/40 text-indigo-700 shadow-md'
							: 'text-gray-700 hover:bg-white/20'}"
						on:click={() => (activeTab = 'backupRestore')}
					>
						<SettingsIcon />
						<span>データ管理</span>
					</button>
				</li>
			</ul>
		</div>
	</nav>
	<!-- メインコンテンツエリア -->
	<main class="flex-1">
		<!-- iOS用ナビゲーションバー -->
		{#if isMobile}
			<header
				class="bg-white/30 backdrop-blur-lg border-b border-white/20 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-lg"
			>
				{#if activeTab === 'bookList'}
					<div class="flex items-center mb-4">
						<div class="bg-white/40 p-2 rounded-xl mr-3 shadow-sm">
							<BookIcon class="text-green-600" />
						</div>
						<h2 class="text-xl font-medium text-gray-800">書籍一覧</h2>
					</div>
					<button
						class="w-10 h-10 rounded-full bg-indigo-500/80 backdrop-blur-sm flex items-center justify-center text-white shadow-lg"
						on:click={() => (activeTab = 'addBook')}
					>
						<AddIcon />
					</button>
				{/if}
				{#if activeTab === 'addBook'}
					<div class="flex items-center mb-4">
						<div class="bg-white/40 p-2 rounded-xl mr-3 shadow-sm">
							<AddIcon class="text-blue-600" />
						</div>
						<h2 class="text-xl font-medium text-gray-800">書籍を追加</h2>
					</div>
				{/if}
				{#if activeTab === 'backupRestore'}
					<div class="flex items-center mb-4">
						<div class="bg-white/40 p-2 rounded-xl mr-3 shadow-sm">
							<SyncIcon class="text-purple-600" />
						</div>
						<h2 class="text-xl font-medium text-gray-800">データ管理</h2>
					</div>
				{/if}
			</header>
		{/if}

		<!-- macOS用ツールバー - 常に表示 -->
		{#if !isMobile}
			<div
				class="bg-white/30 backdrop-blur-lg border-b border-white/20 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-lg"
			>
				{#if activeTab === 'bookList'}
					<div class="flex items-center">
						<div class="bg-white/40 p-2 rounded-xl mr-3 shadow-sm">
							<BookIcon class="text-green-600" />
						</div>
						<h2 class="text-xl font-medium text-gray-800">書籍一覧</h2>
					</div>
					<button
						class="px-4 py-2 bg-indigo-500/80 backdrop-blur-sm text-white rounded-xl flex items-center space-x-2 hover:bg-indigo-600/80 transition-all shadow-lg"
						on:click={() => (activeTab = 'addBook')}
					>
						<AddIcon />
						<span>書籍を追加</span>
					</button>
				{:else if activeTab === 'addBook'}
					<div class="flex items-center">
						<div class="bg-white/40 p-2 rounded-xl mr-3 shadow-sm">
							<AddIcon class="text-blue-600" />
						</div>
						<h2 class="text-xl font-medium text-gray-800">書籍を追加</h2>
					</div>
				{:else if activeTab === 'backupRestore'}
					<div class="flex items-center">
						<div class="bg-white/40 p-2 rounded-xl mr-3 shadow-sm">
							<SyncIcon class="text-purple-600" />
						</div>
						<h2 class="text-xl font-medium text-gray-800">データ管理</h2>
					</div>
				{/if}
			</div>
		{/if}

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
			<!-- コンテンツエリア -->
			{#if activeTab === 'bookList'}
				<BookList />
			{:else if activeTab === 'addBook'}
				<div class="w-full max-w-md mx-auto">
					<AddBookForm />
				</div>
			{:else if activeTab === 'backupRestore'}
				<div class="w-full max-w-md mx-auto">
					<BackupRestore />
				</div>
			{/if}
		</div>
	</main>
	<!-- iOS用タブバー -->
	{#if isMobile}
		<nav
			class="fixed bottom-0 left-0 right-0 bg-white/30 backdrop-blur-lg border-t border-white/20 flex justify-around items-center py-2 px-4 md:hidden shadow-lg"
		>
			<button
				class="flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all {activeTab ===
				'bookList'
					? 'bg-white/40 text-indigo-600 shadow-md active-tab'
					: 'text-gray-600 hover:bg-white/20'}"
				on:click={() => (activeTab = 'bookList')}
			>
				<BookIcon class="text-2xl" />
				<span class="text-xs mt-1">一覧</span>
			</button>
			<button
				class="flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all {activeTab ===
				'addBook'
					? 'bg-white/40 text-indigo-600 shadow-md active-tab'
					: 'text-gray-600 hover:bg-white/20'}"
				on:click={() => (activeTab = 'addBook')}
			>
				<AddIcon class="text-2xl" />
				<span class="text-xs mt-1">追加</span>
			</button>
			<button
				class="flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all {activeTab ===
				'backupRestore'
					? 'bg-white/40 text-indigo-600 shadow-md active-tab'
					: 'text-gray-600 hover:bg-white/20'}"
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
		transition: all 0.3s ease;
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
			transition: opacity 0.3s ease;
		}
		nav button.active-tab::after {
			opacity: 1;
		}
	}
	/* コンテンツエリアのガラス効果 */
	.bg-white\/30 {
		background-color: rgba(255, 255, 255, 0.3);
	}
	/* 背景のぼかし効果 */
	.backdrop-blur-lg {
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}
	/* ガラスの境界線 */
	.border-white\/20 {
		border-color: rgba(255, 255, 255, 0.2);
	}
	/* 柔らかい影 */
	.shadow-lg {
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
	.shadow-xl {
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}
</style>
