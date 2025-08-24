import { NetworkError, AppError } from "$lib/types/errors";

export interface GoogleBookDTO {
  title?: string;
  authors?: string;
  publishedDate?: string;
  imageLinks?: { thumbnail: string };
}

export async function fetchBookByISBNFromGoogle(isbn: string): Promise<GoogleBookDTO | null> {
  const apiKey = import.meta.env.PUBLIC_GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(isbn)}${apiKey ? `&key=${apiKey}` : ""}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new AppError(`Google Books API responded with ${response.status}`, { status: response.status, code: "GOOGLE_BOOKS_ERROR" });
    }
    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      return null;
    }
    const book = data.items[0].volumeInfo;
    return {
      title: book.title,
      authors: Array.isArray(book.authors) ? book.authors.join(", ") : undefined,
      publishedDate: book.publishedDate,
      imageLinks: book.imageLinks
    };
  } catch (err) {
    // Network or parsing error
    console.error("Failed to fetch from Google Books:", err);
    throw new NetworkError("Failed to fetch book data");
  }
}
