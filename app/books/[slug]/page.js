import { notFound } from "next/navigation";
import { books } from "../../../content/books";
import BookDetail from "./BookDetail";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export default function BookPage({ params }) {
  const book = books.find((b) => b.slug === params.slug);

  if (!book) {
    notFound();
  }

  return <BookDetail book={book} />;
}
