<script lang="ts">
	import { booksStore } from '$lib/stores/books';
	import { fetchBookByISBN } from '$lib/utils/bookApi';

	let title = '';
	let author = '';
	let isbn = '';
	let publishedDate = '';
	let isLoading = false; // ローディング状態
	let errorMessage = ''; // エラーメッセージ

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
			errorMessage = ''; // 成功時エラーメッセージクリア
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
				publishedDate: publishedDate || undefined
				// status: 'available' // Removed to match type
			});

			title = '';
			author = '';
			isbn = '';
			publishedDate = '';
		}
	};
</script>

<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
	<div class="flex items-center space-x-2">
		<input
			bind:value={isbn}
			placeholder="ISBN"
			class="px-3 py-2 border rounded w-full"
			on:change={searchByISBN}
		/>
		<button
			on:click|preventDefault={searchByISBN}
			class="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600"
			disabled={isLoading}
		>
			{#if isLoading}検索中...{:else}検索{/if}
		</button>
	</div>
	{#if errorMessage}
		<p class="text-red-500 text-sm">{errorMessage}</p>
	{/if}
	<input
		bind:value={title}
		placeholder="タイトル*"
		class="px-3 py-2 border rounded w-full"
		required
	/>
	<input bind:value={author} placeholder="著者*" class="px-3 py-2 border rounded w-full" required />
	<input
		type="date"
		bind:value={publishedDate}
		placeholder="出版日"
		class="px-3 py-2 border rounded w-full"
	/>
	<button type="submit" class="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 w-full"
		>追加</button
	>
</form>
