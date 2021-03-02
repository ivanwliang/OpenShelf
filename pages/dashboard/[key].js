import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getUserBook } from '@/lib/db';
import Navbar from '@/components/Navbar';
import BookSearchbar from '@/components/BookSearchbar';
import { useAuth } from '@/lib/auth';
import Notes from '@/components/Notes';

const UserBookDetail = () => {
  const auth = useAuth();
  const router = useRouter();
  const { key } = router.query;

  const [bookDetails, setBookDetails] = useState({});
  const {
    uid,
    authorBio = '',
    authorName = '',
    description = '',
    bookKey,
    cover,
    notes,
    shelf,
    subjects,
    subtitle,
    title,
    userRating,
    userReview,
  } = bookDetails;

  useEffect(() => {
    const fetchBook = async (uid, key) => {
      const result = await getUserBook(uid, key);
      console.log(result);

      setBookDetails(result);
    };

    if (auth.user && key) {
      const uid = auth.user.uid;
      fetchBook(uid, key);
    }
  }, [key, auth.user]);

  return (
    <div>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='max-w-5xl mx-auto py-12 mt-2'>
          <BookSearchbar />
        </div>

        <p>{title}</p>
        {subtitle && <p>Subtitle: {subtitle}</p>}

        <div>
          <p>By: {authorName}</p>
          {authorBio && <p>Bio {authorBio}</p>}
        </div>

        {description && <p>Description: {description}</p>}
        {cover && (
          <img src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`} />
        )}
        <ul>
          {subjects &&
            subjects.map((subject) => <li key={subject}>{subject}</li>)}
        </ul>
        <hr></hr>
        <h2>Notes</h2>
        {notes && <Notes notes={notes} uid={uid} bookKey={bookKey} />}
      </main>
    </div>
  );
};

export default UserBookDetail;
