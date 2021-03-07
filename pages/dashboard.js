import { useState, useEffect } from 'react';
import Router from 'next/router';

import { useAuth } from '@/lib/auth';
import { getAllBooks } from '@/lib/db';
import Navbar from '@/components/Navbar';
import BookSearchbar from '@/components/BookSearchbar';
import Shelf from '@/components/Shelf';

const Dashboard = () => {
  const [books, setBooks] = useState([]);

  const auth = useAuth();

  // If no user found, redirect to login page
  useEffect(() => {
    // If there is no user even after auth has finished loading, redirect to login page
    if (!auth.user && !auth.loading) {
      Router.push('/login');
    }
  }, [auth]);

  useEffect(() => {
    // Wait for user to load before fetching their books
    if (auth.user) {
      const fetchData = async () => {
        const result = await getAllBooks(auth.user.uid);
        console.log(result);
        setBooks(result);
      };
      fetchData();
    }
  }, [auth.user]);

  // Prevent flash of dashboard content if not authenticated
  if (!auth.user) {
    return null;
  }

  // Show empty state if user has not added any books yet
  if (books.length === 0) {
    return (
      <div>
        <Navbar />
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='max-w-5xl mx-auto py-12 mt-2'>
            <BookSearchbar />
          </div>

          <p>Add some books</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='max-w-5xl mx-auto py-12 mt-2'>
          <BookSearchbar />
        </div>

        {/* Render shelf for "Currently Reading" books */}
        <Shelf books={books} shelfName='Currently Reading' />

        {/* Render shelf for "Want to Read" books */}
        <Shelf books={books} shelfName='Want to Read' />

        {/* Render shelf for "Finished reading" books */}
        <Shelf books={books} shelfName='Finished Reading' />
      </main>
    </div>
  );
};

export default Dashboard;
