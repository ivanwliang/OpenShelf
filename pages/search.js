import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';

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
      console.log(results);
    };

    // Fetch only if query object is defined, else q will be undefined
    if (q) {
      fetchBooks(q);
    }
  }, [router.query.q]);

  return (
    <div>
      <Navbar />
      <div className='max-w-5xl mx-auto mt-10 bg-white shadow overflow-hidden sm:rounded-md'>
        {/* {numBooksFound !== 0 && numBooksFound} */}
        <ul className='divide-y divide-gray-200'>
          {books.map((book) => (
            <li>
              <BookCard
                key={book.key}
                bookKey={book.key}
                title={book.title}
                author={book.author_name}
                coverId={book.cover_i}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default searchResults;
