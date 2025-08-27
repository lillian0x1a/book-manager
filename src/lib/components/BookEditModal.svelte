<script lang="ts">
	import { books } from '$lib/stores/books';
	import { selectedBook, showEditModal } from '$lib/stores/bookUI';
	import { CloseIcon } from '$lib/components/icons';

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
	<div
		class="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
	>
		<div
			class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl w-full max-w-md transform transition-all p-6"
		>
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">書籍情報編集</h2>
				<button
					on:click={closeModal}
					class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2 rounded-xl hover:bg-white/30 dark:hover:bg-gray-700/30 backdrop-blur-sm transition-all duration-200"
				>
					<CloseIcon />
				</button>
			</div>

			<form on:submit|preventDefault={saveEdit} class="space-y-5">
				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
						for="edit-title">タイトル</label
					>
					<input
						id="edit-title"
						class="w-full px-4 py-3 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-xl focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-500/50 focus:border-indigo-400/50 dark:focus:border-indigo-500/50 transition-all duration-200 text-gray-900 dark:text-gray-100"
						type="text"
						bind:value={$selectedBook.title}
						required
					/>
				</div>

				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
						for="edit-author">著者</label
					>
					<input
						id="edit-author"
						class="w-full px-4 py-3 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-xl focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-500/50 focus:border-indigo-400/50 dark:focus:border-indigo-500/50 transition-all duration-200 text-gray-900 dark:text-gray-100"
						type="text"
						bind:value={$selectedBook.author}
						required
					/>
				</div>

				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
						for="edit-isbn">ISBN</label
					>
					<input
						id="edit-isbn"
						class="w-full px-4 py-3 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-xl focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-500/50 focus:border-indigo-400/50 dark:focus:border-indigo-500/50 transition-all duration-200 text-gray-900 dark:text-gray-100"
						type="text"
						bind:value={$selectedBook.isbn}
					/>
				</div>

				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
						for="edit-publishedDate">出版日</label
					>
					<input
						id="edit-publishedDate"
						class="w-full px-4 py-3 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-xl focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-500/50 focus:border-indigo-400/50 dark:focus:border-indigo-500/50 transition-all duration-200 text-gray-900 dark:text-gray-100"
						type="date"
						bind:value={$selectedBook.publishedDate}
					/>
				</div>

				<div class="flex justify-end space-x-3 pt-2">
					<button
						type="button"
						class="px-5 py-2.5 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-white/30 dark:hover:bg-gray-700/30 backdrop-blur-sm transition-all duration-200"
						on:click={closeModal}
					>
						キャンセル
					</button>
					<button
						type="submit"
						class="px-5 py-2.5 bg-indigo-500/90 dark:bg-indigo-600/90 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-indigo-600/90 dark:hover:bg-indigo-700/90 transition-all duration-200 shadow-sm"
					>
						保存
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
