import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const searchResults = () => {
  const router = useRouter();
  const q = router.query.searchQuery;

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async (q) => {
      const response = await fetch(`http://openlibrary.org/search.json?q=${q}`);
      const results = await response.json();
      setBooks(results);
    };
    fetchBooks();
  }, [q]);

  return <div>{JSON.stringify(books, null, 2)}</div>;
};

export default searchResults;
