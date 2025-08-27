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

<nav class="sidebar">
	<div class="sidebar-header">
		<h2>読書管理</h2>
	</div>
	<div class="sidebar-content">
		<ul class="nav-list">
			{#each tabs as tab}
				<li>
					<button
						class="nav-button {$activeTab === tab.id ? 'active' : ''}"
						on:click={() => ($activeTab = tab.id)}
					>
						<svelte:component this={tab.icon} />
						<span>{tab.label}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.sidebar {
		width: 16rem;
		background-color: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-right: 1px solid rgba(255, 255, 255, 0.2);
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		z-index: 10;
	}

	.sidebar-header {
		padding: 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}

	.sidebar-header h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1f2937;
	}

	.sidebar-content {
		flex: 1;
		padding: 1rem;
	}

	.nav-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.nav-button {
		width: 100%;
		text-align: left;
		padding: 0.75rem 1rem;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		transition: all 0.3s ease;
		background: none;
		border: none;
		cursor: pointer;
		color: #374151;
	}

	.nav-button:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.nav-button.active {
		background-color: rgba(255, 255, 255, 0.4);
		color: #4f46e5;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
</style>
