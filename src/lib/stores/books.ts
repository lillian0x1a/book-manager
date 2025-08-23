// src/lib/stores/books.ts
import { writable, get } from 'svelte/store';
import type { Book } from '$lib/types/book';

function createBooksStore() {
	// → サーバーでも安全な初期値
	const { subscribe, update, set } = writable<Book[]>([]);

	// クライアントマウント後に localStorage から読み込む
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem('books');
		if (saved) {
			try {
				set(JSON.parse(saved));
			} catch (e) {
				console.warn('Failed to parse books from localStorage', e);
				set([]);
			}
		}
	}

	function persist(books: Book[]) {
		if (typeof window === 'undefined') return; // サーバーでは何もしない
		localStorage.setItem('books', JSON.stringify(books));
	}

	return {
		subscribe,

		addBook: (
			payload: Omit<Book, 'id' | 'status' | 'imageLinks'> & { imageLinks?: { thumbnail: string } }
		) => {
			update((books: Book[]) => {
				const newBook: Book = {
					...payload,
					id: crypto.randomUUID(), // UUIDv4（Bun/最新環境対応）
					status: 'available' as 'available',
					imageLinks: payload?.imageLinks
				};
				const next = [...books, newBook];
				persist(next);
				return next;
			});
		},

		removeBook: (id: string) => {
			update((books: Book[]) => {
				const next = books.filter((b) => b.id !== id);
				persist(next);
				return next;
			});
		},

		toggleStatus: (id: string) => {
			update((books) => {
				const next = books.map((b) =>
					b.id === id
						? {
								...b,
								status:
									b.status === 'available'
										? ('borrowed' as 'borrowed')
										: ('available' as 'available')
							}
						: b
				);
				persist(next);
				return next;
			});
		},

		reset: () => {
			set([]);
			persist([]);
		},

		importBooks: (imported: Book[]) => {
			set(imported); // ストアを直接セット
			persist(imported); // localStorageに保存
		},

		// 新規: エクスポート用（データ取得のみ）
		exportData: () => {
			if (typeof window === 'undefined') return null; // サーバー側では何もしない
			// 現在のストアデータを返す
			return get({ subscribe });
		},

		searchBooks: (searchTerm: string) =>
			update((books) => {
				const lowerSearchTerm = searchTerm.toLowerCase();
				return books.filter(
					(book) =>
						book.title.toLowerCase().includes(lowerSearchTerm) ||
						book.author.toLowerCase().includes(lowerSearchTerm) ||
						(book.isbn && book.isbn.includes(lowerSearchTerm))
				);
			}),

		sortBooks: (sortBy: 'title' | 'author' | 'publishedDate' | 'status') =>
			update((books) => {
				return [...books].sort((a: Book, b: Book) => {
					if (a[sortBy] != null && b[sortBy] != null && a[sortBy]! < b[sortBy]!) {
						return -1;
					}
					if (a[sortBy] != null && b[sortBy] != null && a[sortBy]! > b[sortBy]!) {
						return 1;
					}
					return 0;
				});
			}),

		filterBooks: (status: 'available' | 'borrowed') =>
			update((books) => {
				return books.filter((book: Book) => book.status === status);
			})
	};
}

export const booksStore = createBooksStore();
