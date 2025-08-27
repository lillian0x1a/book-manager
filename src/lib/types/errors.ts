export class AppError extends Error {
	readonly status: number;
	readonly code: string;
	constructor(message: string, options?: { status?: number; code?: string }) {
		super(message);
		this.name = new.target.name;
		this.status = options?.status ?? 500;
		this.code = options?.code ?? 'APP_ERROR';
	}
}

export class ValidationError extends Error {
	status: number;
	code: string;
	constructor(message: string, code: string, status = 400) {
		super(message);
		this.name = 'ValidationError';
		this.code = code;
		this.status = status;
	}
}

export class NotFoundError extends AppError {
	constructor(message: string, code = 'NOT_FOUND') {
		super(message, { status: 404, code });
	}
}

export class NetworkError extends AppError {
	constructor(message: string, code = 'NETWORK_ERROR') {
		super(message, { status: 503, code });
	}
}
