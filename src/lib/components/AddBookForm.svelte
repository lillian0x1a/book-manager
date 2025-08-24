<script lang="ts">
	import { booksStore } from '$lib/stores/books';
	import { fetchBookByISBN } from '$lib/utils/bookApi';
	let title = '';
	let author = '';
	let isbn = '';
	let publishedDate = '';
	let isLoading = false;
	let errorMessage = '';
	let imageLinks = { thumbnail: '' };

	async function searchByISBN() {
		if (!isbn) {
			errorMessage = 'ISBNを入力してください。';
			return;
		}
		isLoading = true;
		errorMessage = '';
		const bookData = await fetchBookByISBN(isbn);
		isLoading = false;
		if (bookData) {
			title = bookData.title || '';
			author = bookData.authors || '';
			publishedDate = bookData.publishedDate || '';
			imageLinks = bookData.imageLinks || { thumbnail: '' };
			errorMessage = '';
		} else {
			errorMessage = '指定されたISBNの書籍が見つかりませんでした。';
		}
	}

	const handleSubmit = () => {
		if (title && author) {
			booksStore.addBook({
				title,
				author,
				isbn: isbn || undefined,
				publishedDate: publishedDate || undefined,
				imageLinks: imageLinks?.thumbnail ? { thumbnail: imageLinks.thumbnail } : undefined
			});
			title = '';
			author = '';
			isbn = '';
			publishedDate = '';
			imageLinks = { thumbnail: '' };
		}
	};
</script>

<div class="bg-white rounded-2xl shadow-sm p-6 max-w-md mx-auto">
	<form class="space-y-5" on:submit|preventDefault={handleSubmit}>
		<div class="flex items-center mb-4">
			<div class="bg-blue-100 p-2 rounded-lg mr-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-blue-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
				</svg>
			</div>
			<h2 class="text-xl font-medium text-gray-900">書籍を追加</h2>
		</div>

		<div class="space-y-1.5">
			<label class="text-sm font-medium text-gray-700">ISBN</label>
			<div class="flex space-x-2">
				<input
					bind:value={isbn}
					placeholder="978-3-16-148410-0"
					class="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
					on:change={searchByISBN}
				/>
				<button
					on:click|preventDefault={searchByISBN}
					class="px-5 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
					disabled={isLoading}
				>
					{#if isLoading}
						<div class="flex items-center justify-center">
							<svg
								class="animate-spin h-5 w-5 mr-2 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							検索中
						</div>
					{:else}
						検索
					{/if}
				</button>
			</div>
		</div>

		{#if errorMessage}
			<div class="mt-2 p-3 bg-red-50 rounded-lg">
				<p class="text-sm text-red-600">{errorMessage}</p>
			</div>
		{/if}

		<div class="space-y-1.5">
			<label class="text-sm font-medium text-gray-700">タイトル *</label>
			<input
				bind:value={title}
				placeholder="書籍のタイトル"
				class="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
				required
			/>
		</div>

		<div class="space-y-1.5">
			<label class="text-sm font-medium text-gray-700">著者 *</label>
			<input
				bind:value={author}
				placeholder="著者名"
				class="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
				required
			/>
		</div>

		<div class="space-y-1.5">
			<label class="text-sm font-medium text-gray-700">出版日</label>
			<input
				type="date"
				bind:value={publishedDate}
				class="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
			/>
		</div>

		{#if imageLinks?.thumbnail}
			<div class="space-y-1.5">
				<label class="text-sm font-medium text-gray-700">カバー画像</label>
				<div class="flex justify-center">
					<img
						src={imageLinks.thumbnail}
						alt="カバー画像"
						class="h-48 object-contain rounded-lg shadow-sm"
					/>
				</div>
			</div>
		{/if}

		<button
			type="submit"
			class="w-full py-3 px-4 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
		>
			書籍を追加
		</button>
	</form>
</div>
