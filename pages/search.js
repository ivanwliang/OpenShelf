import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import BookSearchbar from "@/components/BookSearchbar";

const searchResults = () => {
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [numBooksFound, setNumBooksFound] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = router.query.q;

    const fetchBooks = async (q) => {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${q}`
      );

      setLoading(true);

      const results = await response.json();
      // Remove results without covers and broken images
      const filteredResults = results.docs.filter(
        (doc) => Object.keys(doc).includes("cover_i") && doc["cover_i"] !== -1
      );

      setNumBooksFound(results.numFound);
      setBooks(filteredResults);
      setLoading(false);
    };

    // Fetch only if query object is defined, else will search for undefined
    if (q) {
      fetchBooks(q);
    }
  }, [router.query.q]);

  if (loading) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 bg-white overflow-hidden sm:rounded-md mb-6">
        <div className="max-w-6xl mx-auto pt-6 pb-4 mt-2">
          <BookSearchbar />
        </div>
        {/* {numBooksFound !== 0 && numBooksFound} */}
        <p className="text-center text-gray-800 text-sm py-2">
          Didn't find your book? Try adding more keywords, such as the author's
          name.
        </p>
        <ul className="divide-y divide-gray-200">
          {books.map((book) => (
            <li key={book.key}>
              <BookCard
                bookKey={book.key}
                title={book.title}
                author={book.author_name}
                coverId={book.cover_i}
                dashboard={false}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default searchResults;
