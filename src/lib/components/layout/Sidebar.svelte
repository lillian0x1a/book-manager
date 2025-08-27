<!-- components/layout/Sidebar.svelte -->
<script lang="ts">
	import { activeTab, type TabId } from '$lib/stores/navigation';
	import BookIcon from '$lib/components/icons/BookIcon.svelte';
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';
	import AddIcon from '$lib/components/icons/AddIcon.svelte';

	interface TabItem {
		id: TabId;
		label: string;
		icon: typeof BookIcon;
	}

	const tabs: TabItem[] = [
		{ id: 'bookList', label: '書籍一覧', icon: BookIcon },
		{ id: 'addBook', label: '書籍を追加', icon: AddIcon },
		{ id: 'backupRestore', label: 'データ管理', icon: SettingsIcon }
	];
</script>

<nav
	class="w-64 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl -webkit-backdrop-blur-xl border-r border-white/20 dark:border-gray-700/20 flex-shrink-0 flex flex-col shadow-lg z-10"
>
	<div class="p-6 border-b border-white/20 dark:border-gray-700/20">
		<h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">読書管理</h2>
	</div>

	<div class="flex-1 p-4">
		<ul class="list-none p-0 m-0 flex flex-col gap-2">
			{#each tabs as tab}
				<li>
					<button
						class="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 bg-none border-none cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/20 {$activeTab ===
						tab.id
							? 'bg-white/30 dark:bg-gray-700/30 text-indigo-600 dark:text-indigo-400 shadow-sm'
							: ''}"
						on:click={() => ($activeTab = tab.id)}
					>
						<svelte:component this={tab.icon} class="w-5 h-5" />
						<span class="font-medium">{tab.label}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</nav>
