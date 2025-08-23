export async function fetchBookByISBN(
	isbn: string
): Promise<{
	title?: string;
	authors?: string;
	publishedDate?: string;
	imageLinks?: { thumbnail: string };
} | null> {
	const apiKey = import.meta.env.PUBLIC_GOOGLE_BOOKS_API_KEY;
	const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(isbn)}${apiKey ? `&key=${apiKey}` : ''}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('APIリクエストに失敗しました');
		}
		const data = await response.json();
		if (data.totalItems === 0) {
			return null;
		}
		const book = data.items[0].volumeInfo;
		return {
			title: book.title,
			authors: Array.isArray(book.authors) ? book.authors.join(', ') : undefined,
			publishedDate: book.publishedDate,
			imageLinks: book.imageLinks
		};
	} catch (error) {
		console.error('書籍データの取得に失敗:', error);
		return null; // エラー時nullを返す
	}
}
