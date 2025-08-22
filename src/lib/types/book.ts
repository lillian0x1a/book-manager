export interface Book {
	id: string;
	title: string;
	author: string;
	isbn?: string;
	publishedDate?: string;
	status: 'available' | 'borrowed';
}
