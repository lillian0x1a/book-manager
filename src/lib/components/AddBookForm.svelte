<script lang="ts">
	import { books } from '$lib/stores/books';
	import { fetchBookByISBN } from '$lib/utils/bookApi';
	import { AddIcon, SpinnerIcon } from '$lib/components/icons';
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
	<div
		class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/30"
	>
		<h2 class="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">書籍を追加</h2>

		{#if errorMessage}
			<div
				class="mb-5 p-4 rounded-xl bg-red-100/70 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 text-red-800 dark:text-red-200 shadow-sm"
			>
				{errorMessage}
			</div>
		{/if}

		<form on:submit|preventDefault={handleSubmit} class="space-y-5">
			<div>
				<label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300" for="title">
					タイトル <span class="text-red-500">*</span>
				</label>
				<input
					id="title"
					bind:value={title}
					required
					placeholder="例: 吾輩は猫である"
					class="w-full bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-500/50 transition-all duration-200 text-gray-900 dark:text-gray-100"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300" for="author">
					著者 <span class="text-red-500">*</span>
				</label>
				<input
					id="author"
					bind:value={author}
					required
					placeholder="例: 夏目漱石"
					class="w-full bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-500/50 transition-all duration-200 text-gray-900 dark:text-gray-100"
				/>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
				<div class="md:col-span-2">
					<label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300" for="ISBN"
						>ISBN</label
					>
					<input
						id="ISBN"
						bind:value={isbn}
						placeholder="例: 978-4-xx-xxxxxx-x"
						class="w-full bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-500/50 transition-all duration-200 text-gray-900 dark:text-gray-100"
					/>
				</div>

				<button
					type="button"
					on:click={handleFetchByISBN}
					class="w-full md:w-auto px-4 py-3 rounded-xl bg-indigo-500/90 dark:bg-indigo-600/90 backdrop-blur-sm text-white flex items-center justify-center gap-2 disabled:opacity-60 transition-all duration-200 hover:bg-indigo-600/90 dark:hover:bg-indigo-700/90 shadow-sm"
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
				<label
					class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
					for="publishedDate">出版日</label
				>
				<input
					id="publishedDate"
					bind:value={publishedDate}
					placeholder="例: 2001-01-01"
					class="w-full bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-500/50 transition-all duration-200 text-gray-900 dark:text-gray-100"
				/>
			</div>

			<button
				type="submit"
				class="w-full py-3.5 px-4 rounded-xl bg-indigo-500/90 dark:bg-indigo-600/90 backdrop-blur-sm text-white flex items-center justify-center gap-2 transition-all duration-200 hover:bg-indigo-600/90 dark:hover:bg-indigo-700/90 shadow-md hover:shadow-lg"
			>
				<AddIcon />
				<span>書籍を追加</span>
			</button>
		</form>
	</div>
</div>
