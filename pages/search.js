import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';
import BookSearchbar from '@/components/BookSearchbar';

const searchResults = () => {
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [numBooksFound, setNumBooksFound] = useState(0);

  /* 
  Per the documentation on Next.js dynamic routes https://nextjs.org/docs/routing/dynamic-routes,
  pages that are statically optimized will be hydrated with an empty query object. After hydration,
  the app is updated to provide the route parameters. 
  */
  useEffect(() => {
    const q = router.query.q;

    const fetchBooks = async (q) => {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${q}`
      );
      const results = await response.json();
      // Remove results without covers and broken images
      const filteredResults = results.docs.filter(
        (doc) => Object.keys(doc).includes('cover_i') && doc['cover_i'] !== -1
      );

      setNumBooksFound(results.numFound);
      setBooks(filteredResults);
    };

    // Fetch only if query object is defined, else will search for undefined
    if (q) {
      fetchBooks(q);
    }
  }, [router.query.q]);

  return (
    <div>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 bg-white overflow-hidden sm:rounded-md'>
        <div className='max-w-5xl mx-auto py-12 mt-2'>
          <BookSearchbar />
        </div>
        {/* {numBooksFound !== 0 && numBooksFound} */}
        <ul className='divide-y divide-gray-200'>
          {books.map((book) => (
            <li key={book.key}>
              <BookCard
                bookKey={book.key}
                title={book.title}
                author={book.author_name}
                coverId={book.cover_i}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default searchResults;
