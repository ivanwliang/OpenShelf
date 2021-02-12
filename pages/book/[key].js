import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';
import BookSearchbar from '@/components/BookSearchbar';

const BookDetail = () => {
  const router = useRouter();
  const { key } = router.query;

  const [authorKey, setAuthorKey] = useState('');
  const [authorDetails, setAuthorDetails] = useState({});
  const [bookDetails, setBookDetails] = useState({});
  const {
    title,
    subtitle = '',
    authors,
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

    // Fetch only if query object is defined, else will search for undefined
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
        {description && <p>Description: {description.value}</p>}
        {covers && (
          <img src={`https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`} />
        )}
      </main>
    </div>
  );
};

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { ... } } // See the "paths" section below
//     ],
//     fallback: true
//   };
// }

// export async function getStaticProps({params}) {
//   const result = await fetch('https://.../posts')
//   const posts = await result.json()

//   return {
//     props: {
//       posts,
//     },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every second
//     revalidate: 1, // In seconds
//   }
// }

export default BookDetail;
