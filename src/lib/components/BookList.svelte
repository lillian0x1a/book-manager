<script lang="ts">
	import { booksStore, filteredBooks } from '$lib/stores/books';
	import type { Book } from '$lib/types/book';

	import BookIcon from '$lib/components/icons/BookIcon.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import DropdownIcon from '$lib/components/icons/DropdownIcon.svelte';
	import InfoIcon from '$lib/components/icons/InfoIcon.svelte';
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';

	$: statusColor = (status: Book['status']) =>
		status === 'available' ? 'text-green-600' : 'text-red-600';
	let selectedBook: Book | null = null;
	let searchTerm = '';
	let sortBy: 'title' | 'author' | 'publishedDate' = 'title';
	let showEdit = false;
	let showDetail = false;
	$: {
		$filteredBooks = $booksStore.filter((book: Book) => {
			const lowerSearchTerm = searchTerm.toLowerCase();
			return (
				book.title.toLowerCase().includes(lowerSearchTerm) ||
				book.author.toLowerCase().includes(lowerSearchTerm) ||
				(book.isbn && book.isbn.includes(lowerSearchTerm))
			);
		});
		$filteredBooks = [...$filteredBooks].sort((a, b) => {
			if (sortBy === 'publishedDate') {
				return (a.publishedDate ?? '').localeCompare(b.publishedDate ?? '');
			}
			return (a[sortBy] ?? '').localeCompare(b[sortBy] ?? '');
		});
	}
	function openModal(book: Book) {
		selectedBook = { ...book };
		showEdit = true;
		showDetail = false;
	}
	function openDetail(book: Book) {
		selectedBook = { ...book };
		showDetail = true;
		showEdit = false;
	}
	function closeModal() {
		selectedBook = null;
		showEdit = false;
		showDetail = false;
	}
	function saveEdit() {
		if (selectedBook) {
			booksStore.updateBook(selectedBook);
			closeModal();
		}
	}
</script>

<div class="min-h-screen bg-gray-50 px-4 py-8">
	<div class="max-w-7xl mx-auto">
		<header class="mb-10">
			<div class="flex items-center mb-4">
				<div class="bg-green-100 p-2 rounded-lg mr-3">
					<BookIcon class="text-green-600" />
				</div>
				<h2 class="text-xl font-medium text-gray-900">書籍一覧</h2>
			</div>
		</header>
		<!-- 検索とフィルターセクション -->
		<section class="bg-white rounded-xl shadow-sm p-6 mb-8">
			<div class="mb-6">
				<div class="relative">
					<input
						type="text"
						class="w-full py-3 px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
						placeholder="タイトル・著者・ISBNで検索"
						bind:value={searchTerm}
					/>
					<div class="absolute right-3 top-3 text-gray-400">
						<SearchIcon />
					</div>
				</div>
			</div>
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<span class="text-gray-600">並び替え:</span>
					<div class="relative">
						<select
							class="appearance-none bg-gray-100 border-0 rounded-lg py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
							bind:value={sortBy}
						>
							<option value="title">タイトル</option>
							<option value="author">著者</option>
							<option value="publishedDate">出版日</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
						>
							<DropdownIcon />
						</div>
					</div>
				</div>
				<div class="text-sm text-gray-500">
					{$filteredBooks.length} 冊の書籍
				</div>
			</div>
		</section>
		<!-- 書籍一覧 -->
		<section>
			{#if $filteredBooks.length === 0}
				<div class="text-center py-12">
					<BookIcon class="mx-auto text-gray-300 mb-4" />
					<h3 class="text-lg font-medium text-gray-900 mb-1">書籍が見つかりません</h3>
					<p class="text-gray-500">検索条件を変更するか、新しい書籍を追加してください</p>
				</div>
			{:else}
				<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{#each $filteredBooks as book (book.id)}
						<div
							class="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
						>
							<div class="p-5">
								<div class="flex">
									{#if book.imageLinks?.thumbnail}
										<img
											src={book.imageLinks.thumbnail}
											alt="{book.title}のカバー画像"
											class="w-16 h-24 object-cover rounded-lg shadow-sm mr-4"
										/>
									{:else}
										<div
											class="w-16 h-24 bg-gray-100 rounded-lg flex items-center justify-center mr-4"
										>
											<BookIcon class="text-gray-400" />
										</div>
									{/if}
									<div class="flex-1 min-w-0">
										<h3 class="font-medium text-gray-900 truncate">{book.title}</h3>
										<p class="text-sm text-gray-500 truncate mt-1">{book.author}</p>
										<div class="mt-2 flex items-center">
											<span
												class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${book.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
											>
												{book.status === 'available' ? '利用可能' : '貸出中'}
											</span>
										</div>
									</div>
								</div>
								{#if book.isbn}
									<p class="text-xs text-gray-500 mt-3">ISBN: {book.isbn}</p>
								{/if}
								<div class="mt-4 flex space-x-2">
									<button
										on:click={() => booksStore.toggleStatus(book.id)}
										class={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${book.status === 'available' ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
									>
										{book.status === 'available' ? '貸出' : '返却'}
									</button>
									<button
										on:click={() => openDetail(book)}
										class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
									>
										<InfoIcon />
									</button>
									<button
										on:click={() => openModal(book)}
										class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
									>
										<EditIcon />
									</button>
									<button
										on:click={() => booksStore.removeBook(book.id)}
										class="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition"
									>
										<DeleteIcon />
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</div>

<!-- 編集モーダル -->
{#if selectedBook && showEdit}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
			<div class="p-6">
				<div class="flex justify-between items-center mb-5">
					<h2 class="text-xl font-semibold text-gray-900">書籍情報編集</h2>
					<button on:click={closeModal} class="text-gray-400 hover:text-gray-500">
						<CloseIcon />
					</button>
				</div>
				<form on:submit|preventDefault={saveEdit} class="space-y-5">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1" for="edit-title"
							>タイトル</label
						>
						<input
							id="edit-title"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
							type="text"
							bind:value={selectedBook.title}
							required
						/>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1" for="edit-author"
							>著者</label
						>
						<input
							id="edit-author"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
							type="text"
							bind:value={selectedBook.author}
							required
						/>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1" for="edit-isbn">ISBN</label>
						<input
							id="edit-isbn"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
							type="text"
							bind:value={selectedBook.isbn}
						/>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1" for="edit-publishedDate"
							>出版日</label
						>
						<input
							id="edit-publishedDate"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
							type="date"
							bind:value={selectedBook.publishedDate}
						/>
					</div>
					<div class="flex justify-end space-x-3 pt-2">
						<button
							type="button"
							class="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
							on:click={closeModal}
						>
							キャンセル
						</button>
						<button
							type="submit"
							class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
						>
							保存
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

<!-- 詳細モーダル -->
{#if selectedBook && showDetail}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
			<div class="p-6">
				<div class="flex justify-between items-center mb-5">
					<h2 class="text-xl font-semibold text-gray-900">書籍詳細</h2>
					<button on:click={closeModal} class="text-gray-400 hover:text-gray-500">
						<CloseIcon />
					</button>
				</div>
				<div class="space-y-4">
					<div class="flex items-start">
						{#if selectedBook.imageLinks?.thumbnail}
							<img
								src={selectedBook.imageLinks.thumbnail}
								alt="カバー画像"
								class="w-20 h-28 object-cover rounded-lg shadow-sm mr-4"
							/>
						{:else}
							<div class="w-20 h-28 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
								<BookIcon class="text-gray-400" />
							</div>
						{/if}
						<div class="flex-1">
							<h3 class="text-lg font-medium text-gray-900">{selectedBook.title}</h3>
							<p class="text-gray-600 mt-1">{selectedBook.author}</p>
							<div class="mt-3">
								<span
									class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedBook.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
								>
									{selectedBook.status === 'available' ? '利用可能' : '貸出中'}
								</span>
							</div>
						</div>
					</div>
					<div class="space-y-3 pt-2">
						{#if selectedBook.isbn}
							<div>
								<p class="text-sm text-gray-500">ISBN</p>
								<p class="text-gray-900">{selectedBook.isbn}</p>
							</div>
						{/if}
						{#if selectedBook.publishedDate}
							<div>
								<p class="text-sm text-gray-500">出版日</p>
								<p class="text-gray-900">{selectedBook.publishedDate}</p>
							</div>
						{/if}
					</div>
				</div>
				<div class="flex justify-end mt-8 pt-4 border-t border-gray-200">
					<button
						type="button"
						class="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition"
						on:click={closeModal}
					>
						閉じる
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
