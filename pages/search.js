import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';

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
      const response = await fetch(`http://openlibrary.org/search.json?q=${q}`);
      const results = await response.json();

      setNumBooksFound(results.numFound);
      setBooks(results.docs);
    };

    // Fetch only if query object is defined, else q will be undefined
    if (q) {
      fetchBooks(q);
    }
  }, [router.query.q]);

  return (
    <div>
      <Navbar />
      {numBooksFound !== 0 && numBooksFound}
      <ul>
        {books.map((book) => (
          <li key={book.key}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default searchResults;
