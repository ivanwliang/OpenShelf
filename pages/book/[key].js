import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';
import BookSearchbar from '@/components/BookSearchbar';
import { addBook } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const BookDetail = () => {
  const auth = useAuth();
  const router = useRouter();
  const { key } = router.query;

  const [authorKey, setAuthorKey] = useState('');
  const [authorDetails, setAuthorDetails] = useState({});
  const [bookDetails, setBookDetails] = useState({});
  const {
    title,
    subtitle = '',
    authors,
    subjects = [],
    covers,
    description = '',
  } = bookDetails;

  useEffect(() => {
    const fetchBook = async (key) => {
      const response = await fetch(`https://openlibrary.org/works/${key}.json`);
      const result = await response.json();

      setBookDetails(result);
      console.log(result);
      setAuthorKey(result.authors[0].author.key);
    };

    if (key) {
      fetchBook(key);
    }
  }, [key]);

  useEffect(() => {
    const fetchAuthor = async (authorKey) => {
      const response = await fetch(`https://openlibrary.org${authorKey}.json`);
      const result = await response.json();

      setAuthorDetails(result);
    };

    if (authorKey) {
      fetchAuthor(authorKey);
    }
  }, [authorKey]);

  const handleClick = () => {
    const authorName = authorDetails.name;
    const authorBio = authorDetails?.bio?.value || '';
    const cover = covers ? covers[0] : '';

    if (auth.user) {
      addBook(auth.user.uid, key, {
        title,
        subtitle,
        authorName,
        authorBio,
        cover,
        description,
        subjects,
      });
    } else {
      router.push('/login');
    }
  };

  return (
    <div>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='max-w-5xl mx-auto py-12 mt-2'>
          <BookSearchbar />
        </div>

        <p>{title}</p>
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
        </button>
      </main>
    </div>
  );
};

export default BookDetail;
