<script>
	import BookList from '$lib/components/BookList.svelte';
	import AddBookForm from '$lib/components/AddBookForm.svelte';
	import BackupRestore from '$lib/components/BackupRestore.svelte';
</script>

<div class="min-h-screen bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
		<header class="mb-10">
			<h1 class="text-3xl font-light text-gray-900 mb-2">蔵書管理システム</h1>
			<p class="text-gray-500">書籍の追加、管理、バックアップができます</p>
		</header>

		<main class="space-y-8">
			<AddBookForm />
			<BackupRestore />
			<BookList />
		</main>
	</div>
</div>
