<script lang="ts">
	import { booksStore } from '$lib/stores/books';
	import type { Book } from '$lib/types/book';
	import * as Card from '$lib/components/ui/card/index';

	$: statusColor = (status: Book['status']) =>
		status === 'available' ? 'text-green-600' : 'text-red-600';

	let selectedBook: Book | null = null;

	function openModal(book: Book) {
		selectedBook = book;
	}

	function closeModal() {
		selectedBook = null;
	}
</script>

<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
	{#each $booksStore as book (book.id)}
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
