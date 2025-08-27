<script lang="ts">
	import { activeTab } from '$lib/stores/navigation';
	import BookList from '$lib/components/BookList.svelte';
	import AddBookForm from '$lib/components/AddBookForm.svelte';
	import BackupRestore from '$lib/components/BackupRestore.svelte';
</script>

<div class="content-area flex-1 overflow-y-auto p-4 md:p-6 max-w-5xl mx-auto w-full">
	{#if $activeTab === 'bookList'}
		<BookList />
	{:else if $activeTab === 'addBook'}
		<div class="form-container w-full max-w-md mx-auto">
			<AddBookForm />
		</div>
	{:else if $activeTab === 'backupRestore'}
		<div class="form-container w-full max-w-md mx-auto">
			<BackupRestore />
		</div>
	{/if}
</div>
