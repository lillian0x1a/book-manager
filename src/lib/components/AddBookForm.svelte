<script lang="ts">
	import { books } from '$lib/stores/books';
	import { fetchBookByISBN } from '$lib/utils/bookApi';
	import AddIcon from '$lib/components/icons/AddIcon.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import { ValidationError } from '$lib/types/errors';
	import { isISBN } from '$lib/utils/validators';

	let title: string = '';
	let author: string = '';
	let isbn: string = '';
	let publishedDate: string = '';
	let isLoading = false;
	let errorMessage: string | null = null;

	async function handleFetchByISBN() {
		errorMessage = null;
		if (!isISBN(isbn)) {
			errorMessage = 'ISBN の形式が正しくありません';
			return;
		}
		isLoading = true;
		try {
			const data = await fetchBookByISBN(isbn);
			if (data) {
				title = data.title ?? ''; // undefinedの場合は空文字列を代入
				author = data.authors ?? ''; // undefinedの場合は空文字列を代入
				publishedDate = data.publishedDate ?? ''; // undefinedの場合は空文字列を代入
			} else {
				errorMessage = '該当する書籍が見つかりませんでした';
			}
		} catch (e) {
			errorMessage = e instanceof ValidationError ? e.message : '書籍データの取得に失敗しました';
			console.error(e);
		} finally {
			isLoading = false;
		}
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		errorMessage = null;
		try {
			books.add({
				title,
				author,
				isbn: isbn || '', // undefinedの代わりに空文字列を渡す
				publishedDate: publishedDate || '' // undefinedの代わりに空文字列を渡す
			});
			// reset
			title = '';
			author = '';
			isbn = '';
			publishedDate = '';
		} catch (e) {
			errorMessage = e instanceof ValidationError ? e.message : '入力内容を確認してください';
			console.error(e);
		}
	}
</script>

<div class="w-full max-w-2xl mx-auto">
	<div class="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6">
		<h2 class="text-xl font-bold mb-4">書籍を追加</h2>

		{#if errorMessage}
			<div class="mb-4 p-3 rounded-lg bg-red-100 border border-red-200 text-red-800">
				{errorMessage}
			</div>
		{/if}

		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<div>
				<label class="block text-sm font-medium mb-1" for="title"
					>タイトル <span class="text-red-500">*</span></label
				>
				<input
					id="title"
					bind:value={title}
					required
					placeholder="例: 吾輩は猫である"
					class="w-full border rounded-lg px-3 py-2"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium mb-1" for="author"
					>著者 <span class="text-red-500">*</span></label
				>
				<input
					id="author"
					bind:value={author}
					required
					placeholder="例: 夏目漱石"
					class="w-full border rounded-lg px-3 py-2"
				/>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
				<div class="md:col-span-2">
					<label class="block text-sm font-medium mb-1" for="ISBN">ISBN</label>
					<input
						id="ISBN"
						bind:value={isbn}
						placeholder="例: 978-4-xx-xxxxxx-x"
						class="w-full border rounded-lg px-3 py-2"
					/>
				</div>
				<button
					type="button"
					on:click={handleFetchByISBN}
					class="w-full md:w-auto px-4 py-2 rounded-xl bg-indigo-500 text-white flex items-center justify-center gap-2 disabled:opacity-60"
					disabled={isLoading || !isbn}
				>
					{#if isLoading}
						<SpinnerIcon />
						<span>検索中...</span>
					{:else}
						<AddIcon />
						<span>ISBN から自動入力</span>
					{/if}
				</button>
			</div>

			<div>
				<label class="block text-sm font-medium mb-1" for="publishedDate">出版日</label>
				<input
					id="publishedDate"
					bind:value={publishedDate}
					placeholder="例: 2001-01-01"
					class="w-full border rounded-lg px-3 py-2"
				/>
			</div>

			<button
				type="submit"
				class="w-full py-3 px-4 rounded-xl bg-indigo-500/80 text-white flex items-center justify-center gap-2"
			>
				<AddIcon />
				<span>書籍を追加</span>
			</button>
		</form>
	</div>
</div>
