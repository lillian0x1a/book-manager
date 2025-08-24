<script lang="ts">
	import { booksStore } from '$lib/stores/books';
	import { fetchBookByISBN } from '$lib/utils/bookApi';
	// SVGアイコンコンポーネントをインポート
	import AddIcon from '$lib/components/icons/AddIcon.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import { onMount } from 'svelte';

	let title = '';
	let author = '';
	let isbn = '';
	let publishedDate = '';
	let isLoading = false;
	let errorMessage = '';
	let imageLinks = { thumbnail: '' };

	// コンポーネントがマウントされたときにスクロールを無効化
	onMount(() => {
		// bodyのスクロールを無効化
		document.body.style.overflow = 'hidden';
		document.body.style.position = 'fixed';
		document.body.style.width = '100%';
		document.body.style.height = '100%';

		// htmlのスクロールを無効化
		document.documentElement.style.overflow = 'hidden';
		document.documentElement.style.position = 'fixed';
		document.documentElement.style.width = '100%';
		document.documentElement.style.height = '100%';

		// クリーンアップ関数
		return () => {
			document.body.style.overflow = '';
			document.body.style.position = '';
			document.body.style.width = '';
			document.body.style.height = '';

			document.documentElement.style.overflow = '';
			document.documentElement.style.position = '';
			document.documentElement.style.width = '';
			document.documentElement.style.height = '';
		};
	});

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

<svelte:head>
	<style>
		html,
		body {
			overflow: hidden !important;
			position: fixed !important;
			width: 100% !important;
			height: 100% !important;
			margin: 0 !important;
			padding: 0 !important;
			touch-action: none !important;
		}
		* {
			touch-action: none !important;
		}
	</style>
</svelte:head>

<div
	class="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8 flex items-center justify-center h-screen w-screen overflow-hidden fixed inset-0"
>
	<div
		class="bg-white/30 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-6 max-w-md w-full max-h-[calc(100vh-2rem)] overflow-y-auto overflow-x-hidden"
	>
		<form class="space-y-5" on:submit|preventDefault={handleSubmit}>
			<div class="space-y-1.5">
				<label for="isbn-input" class="text-sm font-medium text-gray-700">ISBN</label>
				<div class="flex space-x-2">
					<input
						id="isbn-input"
						bind:value={isbn}
						placeholder="978-3-16-148410-0"
						class="flex-1 px-4 py-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 focus:outline-none transition"
						on:change={searchByISBN}
					/>
					<button
						on:click|preventDefault={searchByISBN}
						class="px-5 py-3 rounded-xl bg-indigo-500/80 backdrop-blur-sm text-white font-medium hover:bg-indigo-600/80 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:ring-offset-2 transition-all"
						disabled={isLoading}
					>
						{#if isLoading}
							<div class="flex items-center justify-center">
								<SpinnerIcon class="mr-2 text-white" />
								検索中
							</div>
						{:else}
							検索
						{/if}
					</button>
				</div>
			</div>
			{#if errorMessage}
				<div class="mt-2 p-3 bg-red-200/50 backdrop-blur-sm rounded-xl border border-red-200/50">
					<p class="text-sm text-red-700">{errorMessage}</p>
				</div>
			{/if}
			<div class="space-y-1.5">
				<label for="title-input" class="text-sm font-medium text-gray-700">タイトル *</label>
				<input
					id="title-input"
					bind:value={title}
					placeholder="書籍のタイトル"
					class="w-full px-4 py-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 focus:outline-none transition"
					required
				/>
			</div>
			<div class="space-y-1.5">
				<label for="author-input" class="text-sm font-medium text-gray-700">著者 *</label>
				<input
					id="author-input"
					bind:value={author}
					placeholder="著者名"
					class="w-full px-4 py-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 focus:outline-none transition"
					required
				/>
			</div>
			<div class="space-y-1.5">
				<label for="published-date-input" class="text-sm font-medium text-gray-700">出版日</label>
				<input
					id="published-date-input"
					type="date"
					bind:value={publishedDate}
					class="w-full px-4 py-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 focus:outline-none transition"
				/>
			</div>
			{#if imageLinks?.thumbnail}
				<div class="space-y-1.5">
					<div class="text-sm font-medium text-gray-700">カバー画像</div>
					<div class="flex justify-center">
						<img
							src={imageLinks.thumbnail}
							alt="カバー画像"
							class="h-48 object-contain rounded-xl shadow-md bg-white/20 backdrop-blur-sm p-2 max-w-full"
						/>
					</div>
				</div>
			{/if}
			<button
				type="submit"
				class="w-full py-3 px-4 rounded-xl bg-indigo-500/80 backdrop-blur-sm text-white font-medium hover:bg-indigo-600/80 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:ring-offset-2 transition-all flex items-center justify-center space-x-2"
			>
				<AddIcon />
				<span>書籍を追加</span>
			</button>
		</form>
	</div>
</div>
