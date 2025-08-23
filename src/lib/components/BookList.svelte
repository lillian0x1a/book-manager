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
		selectedBook = { ...book };
	}

	function closeModal() {
		selectedBook = null;
	}

	function saveEdit() {
		if (selectedBook) {
			booksStore.updateBook(selectedBook);
			closeModal();
		}
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

<div class="mb-4 flex items-center gap-2">
	<span>ソート:</span>
	<select class="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white" bind:value={sortBy}>
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
					<button on:click={() => openModal(book)}>編集</button>
				</div>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>

<!-- 編集モーダル -->
{#if selectedBook}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
			<h2 class="text-lg font-bold mb-4">書籍情報編集</h2>
			<form on:submit|preventDefault={saveEdit} class="space-y-4">
				<div>
					<label class="block mb-1" for="edit-title">タイトル</label>
					<input
						id="edit-title"
						class="w-full border rounded px-3 py-2"
						type="text"
						bind:value={selectedBook.title}
						required
					/>
				</div>
				<div>
					<label class="block mb-1" for="edit-author">著者</label>
					<input
						id="edit-author"
						class="w-full border rounded px-3 py-2"
						type="text"
						bind:value={selectedBook.author}
						required
					/>
				</div>
				<div>
					<label class="block mb-1" for="edit-isbn">ISBN</label>
					<input
						id="edit-isbn"
						class="w-full border rounded px-3 py-2"
						type="text"
						bind:value={selectedBook.isbn}
					/>
				</div>
				<div>
					<label class="block mb-1" for="edit-publishedDate">出版日</label>
					<input
						id="edit-publishedDate"
						class="w-full border rounded px-3 py-2"
						type="date"
						bind:value={selectedBook.publishedDate}
					/>
				</div>
				<div class="flex justify-end gap-2">
					<button type="button" class="px-4 py-2 rounded bg-gray-300" on:click={closeModal}
						>キャンセル</button
					>
					<button type="submit" class="px-4 py-2 rounded bg-indigo-600 text-white">保存</button>
				</div>
			</form>
		</div>
	</div>
{/if}
