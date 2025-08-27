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
		action?: () => void;
		actionIcon?: typeof BookIcon;
	}

	const tabInfo: Record<TabId, TabInfo> = {
		bookList: {
			title: '書籍一覧',
			icon: BookIcon,
			iconColor: 'text-green-600',
			action: () => ($activeTab = 'addBook'),
			actionIcon: AddIcon
		},
		addBook: {
			title: '書籍を追加',
			icon: AddIcon,
			iconColor: 'text-blue-600'
		},
		backupRestore: {
			title: 'データ管理',
			icon: SyncIcon,
			iconColor: 'text-purple-600'
		}
	};

	$: currentTab = tabInfo[$activeTab];
</script>

<header class="mobile-header">
	<div class="header-content">
		<div class="icon-container">
			<svelte:component this={currentTab.icon} class={currentTab.iconColor} />
		</div>
		<h2>{currentTab.title}</h2>
	</div>

	{#if currentTab.action}
		<button class="action-button" on:click={currentTab.action}>
			<svelte:component this={currentTab.actionIcon} />
		</button>
	{/if}
</header>

<style>
	.mobile-header {
		background-color: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		padding: 0.75rem 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		top: 0;
		z-index: 10;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	.header-content {
		display: flex;
		align-items: center;
	}

	.icon-container {
		background-color: rgba(255, 255, 255, 0.4);
		padding: 0.5rem;
		border-radius: 0.75rem;
		margin-right: 0.75rem;
		box-shadow:
			0 1px 3px 0 rgba(0, 0, 0, 0.1),
			0 1px 2px 0 rgba(0, 0, 0, 0.06);
	}

	h2 {
		font-size: 1.25rem;
		font-weight: 500;
		color: #1f2937;
	}

	.action-button {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 9999px;
		background-color: rgba(99, 102, 241, 0.8);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		border: none;
		cursor: pointer;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		transition: background-color 0.2s ease;
	}

	.action-button:hover {
		background-color: rgba(79, 70, 229, 0.8);
	}
</style>
