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

<nav class="mobile-tab-bar">
	{#each tabs as tab}
		<button
			class="tab-button {$activeTab === tab.id ? 'active' : ''}"
			on:click={() => ($activeTab = tab.id)}
		>
			<svelte:component this={tab.icon} class="tab-icon" />
			<span class="tab-label">{tab.label}</span>
		</button>
	{/each}
</nav>

<style>
	.mobile-tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0.5rem 1rem;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	.tab-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 4rem;
		height: 4rem;
		border-radius: 1rem;
		transition: all 0.3s ease;
		background: none;
		border: none;
		cursor: pointer;
		color: #374151;
		position: relative;
	}

	.tab-button:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.tab-button.active {
		background-color: rgba(255, 255, 255, 0.4);
		color: #4f46e5;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.tab-button.active::after {
		content: '';
		position: absolute;
		bottom: 0.5rem;
		left: 50%;
		transform: translateX(-50%);
		width: 0.25rem;
		height: 0.25rem;
		border-radius: 50%;
		background-color: currentColor;
		opacity: 1;
	}

	.tab-icon {
		font-size: 1.5rem;
	}

	.tab-label {
		font-size: 0.75rem;
		margin-top: 0.25rem;
	}
</style>
