/**
 * Domain entity representing a Book
 */
export interface Book {
	id: string;
	title: string;
	author: string;
	isbn: string;
	createdAt: string;
	updatedAt: string;
}

/** 本を新規作成するときの入力 */
export interface CreateBookInput {
	title: string;
	author: string;
	isbn: string;
	publishedDate?: string; // オプションで追加
}

/** 本を更新するときの入力 */
export interface UpdateBookInput {
	title?: string;
	author?: string;
	isbn?: string;
	publishedDate?: string;
}
