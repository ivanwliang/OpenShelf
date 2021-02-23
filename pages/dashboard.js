import { useState, useEffect } from 'react';

import { useAuth } from '@/lib/auth';
import { getAllBooks } from '@/lib/db';
import Navbar from '@/components/Navbar';
import BookSearchbar from '@/components/BookSearchbar';
import Shelf from '@/components/Shelf';
import BookCard from '@/components/BookCard';

const Dashboard = () => {
  const auth = useAuth();

  const [books, setBooks] = useState([]);

  // Wait for user to load before fetching their books
  useEffect(() => {
    if (auth.user) {
      const fetchData = async () => {
        const result = await getAllBooks(auth.user.uid);
        setBooks(result);
      };
      fetchData();
    }
  }, [auth.user]);

  console.log(books);

  return auth.user ? (
    <div>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='max-w-5xl mx-auto py-12 mt-2'>
          <BookSearchbar />
        </div>
        <Shelf />
        {/* <button
          type='button'
          className='inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Add New Shelf
        </button> */}
        <ul>
          {books &&
            books.map((book) => {
              return (
                <BookCard
                  key={book.bookKey}
                  bookKey={book.bookKey}
                  title={book.title}
                  coverId={book.cover}
                  author={book.authorName}
                  dashboard={true}
                >
                  {book.title}
                </BookCard>
              );
            })}
        </ul>
      </main>
    </div>
  ) : (
    <div>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>Login Bum</div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
