export interface Book {
	id: string;
	title: string;
	author: string;
	isbn: string;
	createdAt: string;
	updatedAt: string;
	imageLinks?: {
		thumbnail?: string;
	};
	publishedDate?: string;
}

export interface CreateBookInput {
	title: string;
	author: string;
	isbn: string;
	publishedDate?: string;
}

export interface UpdateBookInput {
	title?: string;
	author?: string;
	isbn?: string;
	publishedDate?: string;
}

export type NotificationType = 'info' | 'success' | 'error';

export interface Notification {
	show: boolean;
	message: string;
	type: NotificationType;
}
