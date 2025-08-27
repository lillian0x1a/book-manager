import type { Book } from '$lib/types/book';
import { ValidationError } from '$lib/types/errors';
import { isNonEmpty, isISBN } from '$lib/utils/validators';

export interface CreateBookInput {
	title: string;
	author: string;
	isbn?: string;
	publishedDate?: string;
	imageLinks?: { thumbnail: string };
}

export function validateBookInput(input: CreateBookInput): void {
	if (!isNonEmpty(input.title)) {
		throw new ValidationError('Title is required', 'TITLE_REQUIRED');
	}
	if (!isNonEmpty(input.author)) {
		throw new ValidationError('Author is required', 'AUTHOR_REQUIRED');
	}
	if (input.isbn && !isISBN(input.isbn)) {
		throw new ValidationError('Invalid ISBN format', 'INVALID_ISBN');
	}
}

export function createBookEntity(input: CreateBookInput): Book {
	validateBookInput(input);
	const now = new Date().toISOString(); // 現在時刻をISO形式で取得
	return {
		id: crypto.randomUUID(),
		title: input.title.trim(),
		author: input.author.trim(),
		isbn: input.isbn?.trim() ?? '',
		publishedDate: input.publishedDate?.trim() ?? '',
		imageLinks: input.imageLinks,
		createdAt: now, // 作成日時を設定
		updatedAt: now // 更新日時を設定
	};
}

export function updateBookEntity(existing: Book, patch: Partial<CreateBookInput>): Book {
	if (patch.title !== undefined && !isNonEmpty(patch.title)) {
		throw new ValidationError('Title cannot be empty', 'TITLE_EMPTY');
	}
	if (patch.author !== undefined && !isNonEmpty(patch.author)) {
		throw new ValidationError('Author cannot be empty', 'AUTHOR_EMPTY');
	}
	if (patch.isbn !== undefined && patch.isbn !== '' && !isISBN(patch.isbn)) {
		throw new ValidationError('Invalid ISBN format', 'INVALID_ISBN');
	}

	const now = new Date().toISOString(); // 現在時刻をISO形式で取得
	return {
		...existing,
		...patch,
		title: patch.title !== undefined ? patch.title.trim() : existing.title,
		author: patch.author !== undefined ? patch.author.trim() : existing.author,
		isbn: patch.isbn !== undefined ? patch.isbn.trim() : existing.isbn,
		publishedDate:
			patch.publishedDate !== undefined ? patch.publishedDate.trim() : existing.publishedDate,
		updatedAt: now // 更新日時を現在時刻に設定
	};
}
