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
		{ id: 'bookList', label: '一覧', icon: BookIcon },
		{ id: 'addBook', label: '追加', icon: AddIcon },
		{ id: 'backupRestore', label: '設定', icon: SettingsIcon }
	];
</script>

<nav
	class="fixed bottom-0 left-0 right-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl -webkit-backdrop-blur-xl border-t border-white/20 dark:border-gray-700/20 flex justify-around items-center px-4 py-2 shadow-lg z-50"
>
	{#each tabs as tab}
		<button
			class="flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-200 bg-none border-none cursor-pointer text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-700/20 relative {$activeTab ===
			tab.id
				? 'bg-white/40 dark:bg-gray-700/40 text-indigo-600 dark:text-indigo-400 shadow-sm'
				: ''}"
			on:click={() => ($activeTab = tab.id)}
		>
			<svelte:component this={tab.icon} class="w-6 h-6" />
			<span class="text-xs mt-1">{tab.label}</span>

			{#if $activeTab === tab.id}
				<div
					class="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-current opacity-100"
				></div>
			{/if}
		</button>
	{/each}
</nav>
