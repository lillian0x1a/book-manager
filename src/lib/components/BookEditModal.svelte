<script lang="ts">
	import { books } from '$lib/stores/books';
	import { selectedBook, showEditModal } from '$lib/stores/bookUI';
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';

	function closeModal() {
		showEditModal.set(false);
		selectedBook.set(null);
	}

	function saveEdit() {
		if ($selectedBook) {
			books.updateBook($selectedBook.id, $selectedBook);
			closeModal();
		}
	}
</script>

{#if $selectedBook && $showEditModal}
	<div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
		<div
			class="bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl w-full max-w-md transform transition-all p-6"
		>
			<div class="flex justify-between items-center mb-5">
				<h2 class="text-xl font-semibold text-gray-800">書籍情報編集</h2>
				<button
					on:click={closeModal}
					class="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-white/30 backdrop-blur-sm transition"
				>
					<CloseIcon />
				</button>
			</div>
			<form on:submit|preventDefault={saveEdit} class="space-y-5">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="edit-title"
						>タイトル</label
					>
					<input
						id="edit-title"
						class="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-indigo-400/50 focus:border-indigo-400/50 transition"
						type="text"
						bind:value={$selectedBook.title}
						required
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="edit-author">著者</label>
					<input
						id="edit-author"
						class="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-indigo-400/50 focus:border-indigo-400/50 transition"
						type="text"
						bind:value={$selectedBook.author}
						required
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="edit-isbn">ISBN</label>
					<input
						id="edit-isbn"
						class="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-indigo-400/50 focus:border-indigo-400/50 transition"
						type="text"
						bind:value={$selectedBook.isbn}
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="edit-publishedDate"
						>出版日</label
					>
					<input
						id="edit-publishedDate"
						class="w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-indigo-400/50 focus:border-indigo-400/50 transition"
						type="date"
						bind:value={$selectedBook.publishedDate}
					/>
				</div>
				<div class="flex justify-end space-x-3 pt-2">
					<button
						type="button"
						class="px-4 py-2 text-gray-700 font-medium rounded-xl hover:bg-white/30 backdrop-blur-sm transition"
						on:click={closeModal}
					>
						キャンセル
					</button>
					<button
						type="submit"
						class="px-4 py-2 bg-indigo-500/80 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-indigo-600/80 transition"
					>
						保存
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
