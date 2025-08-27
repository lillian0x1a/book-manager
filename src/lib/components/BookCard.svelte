<script lang="ts">
	import type { Book } from '$lib/types/book';
	import BookIcon from '$lib/components/icons/BookIcon.svelte';
	import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';

	export let book: Book;
	export let onDetail: (book: Book) => void;
	export let onEdit: (book: Book) => void;
	export let onDelete: (id: string) => void;
</script>

<div
	class="bg-white/30 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-white/40 p-5"
>
	<div class="flex">
		{#if book.imageLinks?.thumbnail}
			<img
				src={book.imageLinks.thumbnail}
				alt="{book.title}のカバー画像"
				class="w-16 h-24 object-cover rounded-xl shadow-sm mr-4"
			/>
		{:else}
			<div
				class="w-16 h-24 bg-white/40 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 border border-white/30"
			>
				<BookIcon class="text-gray-400" />
			</div>
		{/if}
		<div class="flex-1 min-w-0">
			<h3 class="font-medium text-gray-800 truncate">{book.title}</h3>
			<p class="text-sm text-gray-600 truncate mt-1">{book.author}</p>
		</div>
	</div>
	{#if book.isbn}
		<p class="text-xs text-gray-600 mt-3">ISBN: {book.isbn}</p>
	{/if}
	<div class="mt-4 flex space-x-2">
		<button
			on:click={() => onDetail(book)}
			class="p-2 rounded-xl text-gray-600 hover:bg-white/30 backdrop-blur-sm transition"
		>
			<InfoIcon />
		</button>
		<button
			on:click={() => onEdit(book)}
			class="p-2 rounded-xl text-gray-600 hover:bg-white/30 backdrop-blur-sm transition"
		>
			<EditIcon />
		</button>
		<button
			on:click={() => onDelete(book.id)}
			class="p-2 rounded-xl text-gray-600 hover:bg-red-200/50 hover:text-red-500 backdrop-blur-sm transition"
		>
			<DeleteIcon />
		</button>
	</div>
</div>
