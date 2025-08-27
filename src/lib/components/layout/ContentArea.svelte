<script lang="ts">
	import { activeTab } from '$lib/stores/navigation';

	import BookList from '$lib/components/BookList.svelte';
	import AddBookForm from '$lib/components/AddBookForm.svelte';
	import BackupRestore from '$lib/components/BackupRestore.svelte';
</script>

<div class="content-area">
	{#if $activeTab === 'bookList'}
		<BookList />
	{:else if $activeTab === 'addBook'}
		<div class="form-container">
			<AddBookForm />
		</div>
	{:else if $activeTab === 'backupRestore'}
		<div class="form-container">
			<BackupRestore />
		</div>
	{/if}
</div>

<style>
	.content-area {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		max-width: 80rem;
		margin: 0 auto;
		width: 100%;
	}

	.form-container {
		width: 100%;
		max-width: 28rem;
		margin: 0 auto;
	}
</style>
