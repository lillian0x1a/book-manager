<script lang="ts">
	import { books } from '$lib/stores/books';
	import {
		searchTerm,
		sortBy,
		selectedBook,
		showEditModal,
		showDetailModal
	} from '$lib/stores/bookUI';
	import type { Book } from '$lib/types/book';
	import BookSearch from './BookSearch.svelte';
	import BookCard from './BookCard.svelte';
	import BookEditModal from './BookEditModal.svelte';
	import BookDetailModal from './BookDetailModal.svelte';
	import { BookIcon } from '$lib/components/icons';

	// 表示用の書籍リストを計算（ストアを直接変更しない）
	$: filteredBooks = $books.filter((book: Book) => {
		if (!$searchTerm) return true; // 検索語が空の場合は全て表示
		const lowerSearchTerm = $searchTerm.toLowerCase();
		return (
			book.title.toLowerCase().includes(lowerSearchTerm) ||
			book.author.toLowerCase().includes(lowerSearchTerm) ||
			(book.isbn && book.isbn.includes(lowerSearchTerm))
		);
	});

	// ソートした書籍リストを計算
	$: sortedBooks = [...filteredBooks].sort((a: Book, b: Book) => {
		if ($sortBy === 'publishedDate') {
			return (a.publishedDate ?? '').localeCompare(b.publishedDate ?? '');
		}
		return (a[$sortBy] ?? '').localeCompare(b[$sortBy] ?? '');
	});

	function openModal(book: Book) {
		selectedBook.set({ ...book });
		showEditModal.set(true);
		showDetailModal.set(false);
	}

	function openDetail(book: Book) {
		selectedBook.set({ ...book });
		showDetailModal.set(true);
		showEditModal.set(false);
	}

	function handleDelete(id: string) {
		books.remove(id);
	}
</script>

<div
	class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8 max-w-7xl mx-auto"
>
	<!-- 検索とフィルターセクション -->
	<BookSearch />

	<!-- 書籍数表示 -->
	<div class="mb-6 text-right">
		<div
			class="text-sm text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-xl inline-block shadow-sm"
		>
			{#if $books.length}
				<span class="font-medium">{$books.length}</span> 冊の書籍
			{:else}
				<span class="font-medium">0</span> 冊の書籍
			{/if}
		</div>
	</div>

	<!-- 書籍一覧 -->
	<section>
		{#if sortedBooks.length === 0}
			<div
				class="text-center py-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg"
			>
				<BookIcon class="mx-auto text-gray-400 dark:text-gray-500 mb-5 w-16 h-16" />
				<h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
					書籍が見つかりません
				</h3>
				<p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
					検索条件を変更するか、新しい書籍を追加してください
				</p>
			</div>
		{:else}
			<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each sortedBooks as book (book.id)}
					<BookCard {book} onDetail={openDetail} onEdit={openModal} onDelete={handleDelete} />
				{/each}
			</div>
		{/if}
	</section>
</div>

<!-- モーダル -->
<BookEditModal />
<BookDetailModal />
