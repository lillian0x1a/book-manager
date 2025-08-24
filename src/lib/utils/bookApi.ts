import { fetchBookByISBNFromGoogle } from "$lib/api/googleBooksClient";
import { ValidationError } from "$lib/types/errors";
import { isISBN } from "$lib/utils/validators";

export async function fetchBookByISBN(isbn: string) {
  if (!isISBN(isbn)) {
    throw new ValidationError("Invalid ISBN format", "INVALID_ISBN");
  }
  return fetchBookByISBNFromGoogle(isbn);
}
