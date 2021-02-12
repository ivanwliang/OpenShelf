import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';
import BookSearchbar from '@/components/BookSearchbar';

const BookDetail = () => {
  const router = useRouter();
  const { key } = router.query;

  const [bookDetails, setBookDetails] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState({});
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState({});
  const [covers, setCovers] = useState([]);
  // const { title, subtitle, authors, covers, description = '' } = bookDetails;
  // console.log(bookDetails.covers[1]);

  useEffect(() => {
    const fetchBook = async (key) => {
      const response = await fetch(`https://openlibrary.org/works/${key}.json`);
      const result = await response.json();

      console.log(result);
      // setBookDetails(result);
      setTitle(result.title);
      setSubtitle(result.subtitle);
      setDescription(result.description);
      setAuthor(result.authors);
      setCovers(result.covers);
    };

    // Fetch only if query object is defined, else will search for undefined
    if (key) {
      fetchBook(key);
    }
  }, [key]);

  return (
    <div>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='max-w-5xl mx-auto py-12 mt-2'>
          <BookSearchbar />
        </div>
        <p>Book key: {key}</p>
        <p>Title: {title}</p>
        {subtitle && <p>Subtitle: {subtitle}</p>}
        {/* <p>Author: {authors[0]}</p> */}
        {description && <p>Description: {description.value}</p>}
        {covers[0] && (
          <img
            src={`https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`}
            className='rounded-sm'
          />
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
