<script lang="ts">
	import { booksStore } from '$lib/stores/books';
	import { fetchBookByISBN } from '$lib/utils/bookApi';

	let title = '';
	let author = '';
	let isbn = '';
	let publishedDate = '';
	let isLoading = false; // ローディング状態
	let errorMessage = ''; // エラーメッセージ
	let imageLinks = { thumbnail: '' }; // 追加: サムネイル画像リンク

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
			imageLinks = bookData.imageLinks || { thumbnail: '' }; // 追加: 画像リンクの取得
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
	{#if imageLinks?.thumbnail}
		<img
			src={imageLinks.thumbnail}
			alt="カバー画像"
			class="w-32 h-48 object-cover rounded-md shadow-md mb-2"
		/>
	{/if}
</form>
