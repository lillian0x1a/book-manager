<script lang="ts">
	import type { Book } from '$lib/types/book';
	import { BookIcon, InfoIcon, EditIcon, DeleteIcon } from '$lib/components/icons';

	export let book: Book;
	export let onDetail: (book: Book) => void;
	export let onEdit: (book: Book) => void;
	export let onDelete: (id: string) => void;
</script>

<div
	class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-white/70 dark:hover:bg-gray-800/70 p-5"
>
	<div class="flex">
		{#if book.imageLinks?.thumbnail}
			<img
				src={book.imageLinks.thumbnail}
				alt="{book.title}のカバー画像"
				class="w-16 h-24 object-cover rounded-xl shadow-md mr-4"
			/>
		{:else}
			<div
				class="w-16 h-24 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 border border-white/40 dark:border-gray-600/40"
			>
				<BookIcon class="text-gray-400 dark:text-gray-500 w-6 h-6" />
			</div>
		{/if}

		<div class="flex-1 min-w-0">
			<h3 class="font-medium text-gray-800 dark:text-gray-200 truncate">{book.title}</h3>
			<p class="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">{book.author}</p>
		</div>
	</div>

	{#if book.isbn}
		<p class="text-xs text-gray-600 dark:text-gray-400 mt-3">ISBN: {book.isbn}</p>
	{/if}

	<div class="mt-4 flex space-x-2">
		<button
			on:click={() => onDetail(book)}
			class="p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-gray-700/30 backdrop-blur-sm transition-all duration-200 hover:text-blue-500 dark:hover:text-blue-400"
			title="詳細"
		>
			<InfoIcon />
		</button>

		<button
			on:click={() => onEdit(book)}
			class="p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-gray-700/30 backdrop-blur-sm transition-all duration-200 hover:text-indigo-500 dark:hover:text-indigo-400"
			title="編集"
		>
			<EditIcon />
		</button>

		<button
			on:click={() => onDelete(book.id)}
			class="p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-red-100/50 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 backdrop-blur-sm transition-all duration-200"
			title="削除"
		>
			<DeleteIcon />
		</button>
	</div>
</div>
