import Link from 'next/link';

import SelectShelf from './SelectShelf';
import { useAuth } from '@/lib/auth';
import { deleteBook } from '@/lib/db';

const BookCard = ({
  bookKey,
  title,
  coverId,
  author,
  dashboard,
  shelf = '',
}) => {
  const auth = useAuth();

  const handleDelete = () => {
    if (
      confirm('Are you sure you want to delete this book from your library?')
    ) {
      deleteBook(auth.user.uid, bookKey);
    }
  };

  if (dashboard) {
    return (
      <div className='hover:bg-gray-50 flex'>
        <Link href={`dashboard/${bookKey}`}>
          <a className='flex-grow'>
            <div className='flex items-center px-4 py-4 sm:px-6'>
              <div className='min-w-0 flex-1 flex items-center space-x-5'>
                <div className='flex-shrink-0'>
                  <img
                    src={`https://covers.openlibrary.org/b/id/${coverId}-S.jpg`}
                    className='rounded-sm'
                  />
                </div>
                <div className='min-w-0 flex-1 px-4'>
                  <p className='text-sm font-medium text-indigo-600'>{title}</p>
                  <p className='mt-2 text-sm font-medium text-gray-700'>
                    {author}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </Link>
        <div className='flex items-center px-4 sm:-mt-1.5 sm:px-6'>
          <div className='flex items-center space-x-6'>
            <SelectShelf shelf={shelf} bookKey={bookKey} />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='h-8 w-8 text-red-700 cursor-pointer'
              onClick={handleDelete}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
          </div>
        </div>
      </div>
    );
  } else {
    // bookKey has format "/works/..." Just want the ID that comes after
    const strippedKey = bookKey.substring(7);

    return (
      <Link href={`book/${strippedKey}`}>
        <a className='block hover:bg-gray-50'>
          <div className='flex items-center px-4 py-4 sm:px-6'>
            <div className='min-w-0 flex-1 flex items-center space-x-5'>
              <div className='flex-shrink-0  w-1/12'>
                <img
                  src={`https://covers.openlibrary.org/b/id/${coverId}-S.jpg`}
                  className='rounded-sm'
                />
              </div>
              <div className='min-w-0 flex-1 px-4'>
                <p className='text-sm font-medium text-indigo-600'>{title}</p>
                <p className='mt-2 text-sm font-medium text-gray-700'>
                  {author}
                </p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    );
  }
};

export default BookCard;
