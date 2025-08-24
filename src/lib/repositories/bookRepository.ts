// src/lib/repositories/bookRepository.ts
import type { Book } from '$lib/types/book';

const STORAGE_KEY = 'books';

function loadBooks(): Book[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as Book[]) : [];
	} catch {
		return [];
	}
}

function saveBooks(books: Book[]): void {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export const bookRepository = {
	loadBooks,
	saveBooks
};
