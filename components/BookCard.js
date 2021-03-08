import Link from 'next/link';

import SelectShelf from './SelectShelf';

const BookCard = ({
  bookKey,
  title,
  coverId,
  author,
  dashboard,
  shelf = '',
}) => {
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
          <SelectShelf shelf={shelf} bookKey={bookKey} />
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
