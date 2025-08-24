// src/lib/stores/books.ts
import { writable } from 'svelte/store';
import type { Book, CreateBookInput, UpdateBookInput } from '$lib/types/book';
import { bookRepository } from '$lib/repositories/bookRepository';
import { createBookEntity, updateBookEntity } from '$lib/services/bookService';

function createBooksStore() {
	const { subscribe, set, update } = writable<Book[]>(bookRepository.loadBooks());

	return {
		subscribe,
		set,
		update,

		add(input: CreateBookInput): Book {
			const book = createBookEntity(input);
			update((books) => {
				const updated = [...books, book];
				bookRepository.saveBooks(updated);
				return updated;
			});
			return book;
		},

		remove(id: string): void {
			update((books) => {
				const updated = books.filter((b) => b.id !== id);
				bookRepository.saveBooks(updated);
				return updated;
			});
		},

		toggleStatus: (id: string): void => {
			update((books) =>
				books.map((book) =>
					book.id === id
						? { ...book, status: book.status === 'available' ? 'borrowed' : 'available' }
						: book
				)
			);
		},

		updateBook(id: string, patch: UpdateBookInput): void {
			update((books) => {
				const updated = books.map((b) => (b.id === id ? updateBookEntity(b, patch) : b));
				bookRepository.saveBooks(updated);
				return updated;
			});
		},

		clear(): void {
			set([]);
			bookRepository.saveBooks([]);
		},

		/** バックアップ復元用 */
		importBooks(imported: Book[]): void {
			set(imported);
			bookRepository.saveBooks(imported);
		}
	};
}

export const books = createBooksStore();
