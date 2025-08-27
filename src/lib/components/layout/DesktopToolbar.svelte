<script lang="ts">
	import { activeTab, type TabId } from '$lib/stores/navigation';
	import BookIcon from '$lib/components/icons/BookIcon.svelte';
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';
	import AddIcon from '$lib/components/icons/AddIcon.svelte';
	import SyncIcon from '$lib/components/icons/SyncIcon.svelte';

	interface TabInfo {
		title: string;
		icon: typeof BookIcon;
		iconColor: string;
		darkIconColor?: string;
		action?: () => void;
		actionIcon?: typeof BookIcon;
		actionText?: string;
	}

	const tabInfo: Record<TabId, TabInfo> = {
		bookList: {
			title: '書籍一覧',
			icon: BookIcon,
			iconColor: 'text-green-600',
			darkIconColor: 'dark:text-green-400',
			action: () => ($activeTab = 'addBook'),
			actionIcon: AddIcon,
			actionText: '書籍を追加'
		},
		addBook: {
			title: '書籍を追加',
			icon: AddIcon,
			iconColor: 'text-blue-600',
			darkIconColor: 'dark:text-blue-400'
		},
		backupRestore: {
			title: 'データ管理',
			icon: SyncIcon,
			iconColor: 'text-purple-600',
			darkIconColor: 'dark:text-purple-400'
		}
	};

	$: currentTab = tabInfo[$activeTab];
</script>

<div
	class="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl -webkit-backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 p-4 md:p-6 flex items-center justify-between sticky top-0 z-10 shadow-lg"
>
	<div class="flex items-center">
		<div class="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm p-3 rounded-xl mr-3 shadow-sm">
			<svelte:component
				this={currentTab.icon}
				class="w-6 h-6 {currentTab.iconColor} {currentTab.darkIconColor || ''}"
			/>
		</div>
		<h2 class="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200">
			{currentTab.title}
		</h2>
	</div>

	{#if currentTab.action}
		<button
			class="px-4 py-2.5 md:px-5 md:py-3 rounded-xl bg-indigo-500/90 dark:bg-indigo-600/90 backdrop-blur-sm flex items-center gap-2 text-white border-none cursor-pointer shadow-md transition-all duration-200 hover:bg-indigo-600/90 dark:hover:bg-indigo-700/90 hover:shadow-lg"
			on:click={currentTab.action}
		>
			<svelte:component this={currentTab.actionIcon} class="w-5 h-5" />
			<span class="font-medium">{currentTab.actionText}</span>
		</button>
	{/if}
</div>
