import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';
import BookSearchbar from '@/components/BookSearchbar';
import { useAuth } from '@/lib/auth';

const UserBookDetail = () => {
  const auth = useAuth();
  const router = useRouter();
  const { key } = router.query;

  return (
    <div>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='max-w-5xl mx-auto py-12 mt-2'>
          <BookSearchbar />
        </div>

        {/* <p>{title}</p>
        {subtitle && <p>Subtitle: {subtitle}</p>}
        {authorDetails && (
          <div>
            {authorDetails && <p>By: {authorDetails.name}</p>}
            {authorDetails.bio && <p>Bio {authorDetails.bio.value}</p>}
          </div>
        )}
        {description && <p>Description: {description}</p>}
        {covers && (
          <img src={`https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`} />
        )}
        <ul>
          {subjects &&
            subjects.map((subject) => <li key={subject}>{subject}</li>)}
        </ul>
        <button
          type='button'
          className='inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          onClick={handleClick}
        >
          Add to Reading List
        </button> */}
      </main>
    </div>
  );
};

export default UserBookDetail;
