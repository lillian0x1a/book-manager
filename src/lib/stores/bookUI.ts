import { writable, derived } from 'svelte/store';
import type { Book } from '$lib/types/book';

// UI状態のストア
export const searchTerm = writable(''); // 空文字列で初期化
export const sortBy = writable<'title' | 'author' | 'publishedDate'>('title');
export const selectedBook = writable<Book | null>(null);
export const showEditModal = writable(false);
export const showDetailModal = writable(false);
export const showSortDropdown = writable(false);

// 並び替えオプション（定数配列として定義）
export const sortOptions = [
	{ value: 'title', label: 'タイトル' },
	{ value: 'author', label: '著者' },
	{ value: 'publishedDate', label: '出版日' }
] as const;

// 現在選択されている並び替えオプションのラベルを取得
export const selectedSortLabel = derived(
	sortBy,
	($sortBy) => sortOptions.find((option) => option.value === $sortBy)?.label || 'タイトル'
);
