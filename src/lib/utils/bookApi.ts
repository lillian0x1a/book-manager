export async function fetchBookByISBN(
	isbn: string
): Promise<{ title?: string; authors?: string; publishedDate?: string } | null> {
	const apiKey = import.meta.env.PUBLIC_GOOGLE_BOOKS_API_KEY; // SvelteKitの.envからAPIキー取得
	const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(isbn)}${apiKey ? `&key=${apiKey}` : ''}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('APIリクエストに失敗しました');
		}
		const data = await response.json();
		if (data.totalItems === 0) {
			return null; // 書籍が見つからない
		}
		const book = data.items[0].volumeInfo; // 最初の結果を使用
		return {
			title: book.title,
			authors: Array.isArray(book.authors) ? book.authors.join(', ') : undefined, // 著者をカンマ区切り文字列に変換
			publishedDate: book.publishedDate // 例: "2023-01-01"
		};
	} catch (error) {
		console.error('書籍データの取得に失敗:', error);
		return null; // エラー時nullを返す
	}
}
