import Link from 'next/link';

const BookCard = ({ bookKey, title, coverId, author }) => {
  return (
    <Link href='#'>
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
              <p className='mt-2 text-sm font-medium text-gray-700'>{author}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BookCard;
