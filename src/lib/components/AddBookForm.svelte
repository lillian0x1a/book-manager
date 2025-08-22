<script lang="ts">
	import { booksStore } from '$lib/stores/books';
	import { fetchBookByISBN } from '$lib/utils/bookApi';

	import { Button } from '$lib/components/ui/button/index';
	import { Label } from '$lib/components/ui/label/index';
	import { Input } from '$lib/components/ui/input/index';
	import * as Card from '$lib/components/ui/card/index';

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

<Card.Root class="max-w-md mx-auto mt-8">
	<Card.Header>
		<h2 class="text-lg font-bold">書籍追加フォーム</h2>
	</Card.Header>
	<Card.Content>
		<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
			<div class="space-y-1">
				<Label for="title">書籍タイトル</Label>
				<Input id="title" type="text" bind:value={title} placeholder="タイトルを入力" required />
			</div>
			<div class="space-y-1">
				<Label for="author">著者</Label>
				<Input id="author" type="text" bind:value={author} placeholder="著者名を入力" required />
			</div>
			<div class="space-y-1">
				<Label for="isbn">ISBN</Label>
				<Input id="isbn" type="text" bind:value={isbn} placeholder="978-3-16-148410-0" />
			</div>
			<div class="space-y-1">
				<Label for="publishedDate">出版日</Label>
				<Input id="publishedDate" type="date" bind:value={publishedDate} />
			</div>
			<Card.Footer>
				<Button type="submit" class="w-full">書籍を追加</Button>
			</Card.Footer>
		</form>
	</Card.Content>
</Card.Root>
