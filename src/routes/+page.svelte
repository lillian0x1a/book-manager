<script>
	import BookList from '$lib/components/BookList.svelte';
	import AddBookForm from '$lib/components/AddBookForm.svelte';
	import BackupRestore from '$lib/components/BackupRestore.svelte';
</script>

<main class="container mx-auto p-4">
	<h1 class="text-3xl font-bold mb-6">蔵書管理システム</h1>

	<section class="mb-8">
		<AddBookForm />
	</section>
	<BackupRestore />
	<section>
		<h2 class="text-xl mb-4">書籍一覧</h2>
		<BookList />
	</section>
</main>
