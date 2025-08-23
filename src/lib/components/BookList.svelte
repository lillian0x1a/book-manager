<script lang="ts">
	import { booksStore, filteredBooks } from '$lib/stores/books';
	import type { Book } from '$lib/types/book';
	import * as Card from '$lib/components/ui/card/index';

	$: statusColor = (status: Book['status']) =>
		status === 'available' ? 'text-green-600' : 'text-red-600';

	let selectedBook: Book | null = null;
	let searchTerm = '';
	let sortBy: 'title' | 'author' | 'publishedDate' = 'title';

	$: {
		$filteredBooks = $booksStore.filter((book: Book) => {
			const lowerSearchTerm = searchTerm.toLowerCase();
			return (
				book.title.toLowerCase().includes(lowerSearchTerm) ||
				book.author.toLowerCase().includes(lowerSearchTerm) ||
				(book.isbn && book.isbn.includes(lowerSearchTerm))
			);
		});
		$filteredBooks = [...$filteredBooks].sort((a, b) => {
			if (sortBy === 'publishedDate') {
				return (a.publishedDate ?? '').localeCompare(b.publishedDate ?? '');
			}
			return (a[sortBy] ?? '').localeCompare(b[sortBy] ?? '');
		});
	}

	function openModal(book: Book) {
		selectedBook = book;
	}

	function closeModal() {
		selectedBook = null;
	}
</script>

<div class="mb-4">
	<Input
		type="text"
		class="w-full"
		placeholder="タイトル・著者・ISBNで検索"
		bind:value={searchTerm}
	/>
</div>

<div class="mb-4">
	<label for="sortBy" class="mr-2">ソート:</label>
	<select
		id="sortBy"
		class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
		bind:value={sortBy}
	>
		<option value="title">タイトル</option>
		<option value="author">著者</option>
		<option value="publishedDate">出版日</option>
	</select>
</div>

<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
	{#each $filteredBooks as book (book.id)}
		<Card.Root class="max-w-md mx-auto">
			<Card.Header>
				<h3 class="text-lg font-bold">{book.title}</h3>
				{#if book.imageLinks?.thumbnail}
					<img
						src={book.imageLinks.thumbnail}
						alt="{book.title}のカバー画像"
						class="w-32 h-48 object-cover rounded-md shadow-md"
					/>
				{/if}
			</Card.Header>
			<Card.Content>
				<p class="text-gray-600">著者: {book.author}</p>
				{#if book.isbn}
					<p class="text-sm text-gray-500">ISBN: {book.isbn}</p>
				{/if}
				<p class={`mt-2 ${statusColor(book.status)}`}>
					状態: {book.status === 'available' ? '利用可能' : '貸出中'}
				</p>
			</Card.Content>
			<Card.Footer>
				<div class="flex space-x-2">
					<button on:click={() => booksStore.toggleStatus(book.id)}>
						{book.status === 'available' ? '貸出' : '返却'}
					</button>
					<button on:click={() => booksStore.removeBook(book.id)}>削除</button>
					<button on:click={() => openModal(book)}>詳細</button>
				</div>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
