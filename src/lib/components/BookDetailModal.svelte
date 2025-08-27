<script lang="ts">
	import { selectedBook, showDetailModal } from '$lib/stores/bookUI';
	import { BookIcon, CloseIcon } from '$lib/components/icons';

	function closeModal() {
		showDetailModal.set(false);
		selectedBook.set(null);
	}
</script>

{#if $selectedBook && $showDetailModal}
	<div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
		<div
			class="bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl w-full max-w-md transform transition-all p-6"
		>
			<div class="flex justify-between items-center mb-5">
				<h2 class="text-xl font-semibold text-gray-800">書籍詳細</h2>
				<button
					on:click={closeModal}
					class="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-white/30 backdrop-blur-sm transition"
				>
					<CloseIcon />
				</button>
			</div>
			<div class="space-y-4">
				<div class="flex items-start">
					{#if $selectedBook.imageLinks?.thumbnail}
						<img
							src={$selectedBook.imageLinks.thumbnail}
							alt="カバー画像"
							class="w-20 h-28 object-cover rounded-xl shadow-sm mr-4"
						/>
					{:else}
						<div
							class="w-20 h-28 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 border border-white/30"
						>
							<BookIcon class="text-gray-400" />
						</div>
					{/if}
					<div class="flex-1">
						<h3 class="text-lg font-medium text-gray-800">{$selectedBook.title}</h3>
						<p class="text-gray-600 mt-1">{$selectedBook.author}</p>
					</div>
				</div>
				<div class="space-y-3 pt-2">
					{#if $selectedBook.isbn}
						<div>
							<p class="text-sm text-gray-600">ISBN</p>
							<p class="text-gray-800">{$selectedBook.isbn}</p>
						</div>
					{/if}
					{#if $selectedBook.publishedDate}
						<div>
							<p class="text-sm text-gray-600">出版日</p>
							<p class="text-gray-800">{$selectedBook.publishedDate}</p>
						</div>
					{/if}
				</div>
			</div>
			<div class="flex justify-end mt-8 pt-4 border-t border-white/30">
				<button
					type="button"
					class="px-4 py-2 bg-white/30 backdrop-blur-sm text-gray-800 font-medium rounded-xl hover:bg-white/40 transition"
					on:click={closeModal}
				>
					閉じる
				</button>
			</div>
		</div>
	</div>
{/if}
