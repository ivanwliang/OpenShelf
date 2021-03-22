import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';
import BookSearchbar from '@/components/BookSearchbar';

const searchResults = () => {
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [numBooksFound, setNumBooksFound] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const page = router.query.page;
    setSearchPage(page);
  }, [router.query.page]);

  useEffect(() => {
    const q = router.query.q;

    const fetchBooks = async (q) => {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${q}&page=${searchPage}`
      );

      setLoading(true);

      const results = await response.json();
      // Remove results without covers and broken images
      const filteredResults = results.docs.filter(
        (doc) => Object.keys(doc).includes('cover_i') && doc['cover_i'] !== -1
      );

      setNumBooksFound(results.numFound);
      setBooks(filteredResults);
      setLoading(false);
    };

    // Fetch only if query object is defined, else will search for undefined
    if (q) {
      fetchBooks(q);
    }
  }, [router.query.q, searchPage]);

  const incrementSearchPage = () => {
    // 100 book results per page
    const totalPages = numBooksFound / 100;
    if (searchPage <= totalPages) {
      setSearchPage(searchPage + 1);
    }
  };

  const decrementSearchPage = () => {
    if (searchPage == 1) {
      return;
    }
    setSearchPage(searchPage - 1);
  };

  if (loading) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 bg-white overflow-hidden sm:rounded-md mb-6'>
        <div className='max-w-6xl mx-auto pt-6 pb-4 mt-2'>
          <BookSearchbar />
        </div>
        {/* {numBooksFound !== 0 && numBooksFound} */}
        <p className='text-center text-gray-800 text-sm py-2'>
          Didn't find your book? Try adding more keywords, such as the author's
          name.
        </p>
        <ul className='divide-y divide-gray-200'>
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

        {/* Pagination */}
        <nav
          className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'
          aria-label='Pagination'
        >
          <div className='flex-1 flex justify-between sm:justify-end'>
            <button
              onClick={decrementSearchPage}
              className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
            >
              Previous
            </button>
            <button
              onClick={incrementSearchPage}
              className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default searchResults;
