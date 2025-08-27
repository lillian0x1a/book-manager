<script lang="ts">
	import { selectedBook, showDetailModal } from '$lib/stores/bookUI';
	import { BookIcon, CloseIcon } from '$lib/components/icons';

	function closeModal() {
		showDetailModal.set(false);
		selectedBook.set(null);
	}
</script>

{#if $selectedBook && $showDetailModal}
	<div
		class="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
	>
		<div
			class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl w-full max-w-md transform transition-all p-6"
		>
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">書籍詳細</h2>
				<button
					on:click={closeModal}
					class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2 rounded-xl hover:bg-white/30 dark:hover:bg-gray-700/30 backdrop-blur-sm transition-all duration-200"
				>
					<CloseIcon />
				</button>
			</div>

			<div class="space-y-5">
				<div class="flex items-start">
					{#if $selectedBook.imageLinks?.thumbnail}
						<img
							src={$selectedBook.imageLinks.thumbnail}
							alt="カバー画像"
							class="w-20 h-28 object-cover rounded-xl shadow-md mr-4"
						/>
					{:else}
						<div
							class="w-20 h-28 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 border border-white/30 dark:border-gray-600/30"
						>
							<BookIcon class="text-gray-400 dark:text-gray-500 w-8 h-8" />
						</div>
					{/if}

					<div class="flex-1">
						<h3 class="text-lg font-medium text-gray-800 dark:text-gray-200">
							{$selectedBook.title}
						</h3>
						<p class="text-gray-600 dark:text-gray-400 mt-1">{$selectedBook.author}</p>
					</div>
				</div>

				<div class="space-y-4 pt-2">
					{#if $selectedBook.isbn}
						<div>
							<p class="text-sm text-gray-600 dark:text-gray-400">ISBN</p>
							<p class="text-gray-800 dark:text-gray-200 font-medium">{$selectedBook.isbn}</p>
						</div>
					{/if}

					{#if $selectedBook.publishedDate}
						<div>
							<p class="text-sm text-gray-600 dark:text-gray-400">出版日</p>
							<p class="text-gray-800 dark:text-gray-200 font-medium">
								{$selectedBook.publishedDate}
							</p>
						</div>
					{/if}
				</div>
			</div>

			<div class="flex justify-end mt-8 pt-4 border-t border-white/30 dark:border-gray-700/30">
				<button
					type="button"
					class="px-5 py-2.5 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-800 dark:text-gray-200 font-medium rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200 shadow-sm"
					on:click={closeModal}
				>
					閉じる
				</button>
			</div>
		</div>
	</div>
{/if}
