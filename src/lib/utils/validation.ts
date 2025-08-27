import type { Book } from '../types/book';
import { ValidationError } from '../types/errors';
import { assertNonEmpty, assertISBN } from './validators';

export function validateBookData(data: unknown): Book[] {
	if (!Array.isArray(data)) {
		throw new ValidationError('データが配列ではありません', 'INVALID_DATA_FORMAT');
	}

	const validBooks: Book[] = [];

	for (const item of data) {
		// 必須フィールドの存在チェック
		if (!item.id || !item.title || !item.author || !item.isbn) {
			throw new ValidationError(
				'無効な書籍データです。id, title, author, isbnは必須です',
				'INVALID_BOOK_DATA'
			);
		}

		// 各フィールドのバリデーション
		try {
			assertNonEmpty(item.id, 'ID');
			assertNonEmpty(item.title, 'タイトル');
			assertNonEmpty(item.author, '著者');
			assertISBN(item.isbn);
		} catch (error) {
			if (error instanceof ValidationError) {
				throw new ValidationError(`書籍データの検証に失敗しました: ${error.message}`, error.code);
			}
			throw error;
		}

		// 必須フィールドが存在することを確認
		const book: Book = {
			id: item.id,
			title: item.title,
			author: item.author,
			isbn: item.isbn,
			createdAt: item.createdAt || new Date().toISOString(),
			updatedAt: item.updatedAt || new Date().toISOString()
		};

		// オプションフィールドが存在する場合に追加
		if (item.imageLinks) {
			book.imageLinks = item.imageLinks;
		}

		if (item.publishedDate) {
			// publishedDateが文字列であることを確認
			if (typeof item.publishedDate === 'string') {
				book.publishedDate = item.publishedDate;
			} else {
				throw new ValidationError(
					'publishedDateは文字列である必要があります',
					'INVALID_PUBLISHED_DATE'
				);
			}
		}

		validBooks.push(book);
	}

	return validBooks;
}
