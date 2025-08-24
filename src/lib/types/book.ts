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
	status: 'available' | 'borrowed';
	imageLinks?: {
		thumbnail?: string;
	};
	// 以下を追加
	publishedDate?: string;
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
