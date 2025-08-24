// src/lib/utils/validators.ts
import { ValidationError } from '../types/errors';

export function isEmail(value: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function assertEmail(email: string): void {
	if (!isEmail(email)) {
		throw new ValidationError('Invalid email format', 'INVALID_EMAIL');
	}
}

export function isISBN(value: string): boolean {
	// 10桁 or 13桁の数字 (ハイフン除去後)
	const cleaned = value.replace(/-/g, '');
	return /^(?:\d{10}|\d{13})$/.test(cleaned);
}

export function assertISBN(isbn: string): void {
	if (!isISBN(isbn)) {
		throw new ValidationError('Invalid ISBN format', 'INVALID_ISBN');
	}
}

export function isNonEmpty(value: string): boolean {
	return value.trim().length > 0;
}

export function assertNonEmpty(value: string, fieldName = 'Value'): void {
	if (!isNonEmpty(value)) {
		throw new ValidationError(`${fieldName} must not be empty`, 'EMPTY_VALUE');
	}
}
