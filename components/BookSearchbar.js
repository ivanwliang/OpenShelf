import { useState } from 'react';
import { useRouter } from 'next/router';

const BookSearchbar = () => {
  const router = useRouter();

  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: { q: search },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex rounded-md shadow-sm'>
        <input
          id='bookSearch'
          name='bookSearch'
          type='text'
          placeholder='Lord of the Rings'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='block w-full pl-10 border-gray-300 rounded-none rounded-l-md placeholder-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg'
        />
        <button
          type='submit'
          className='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
        >
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default BookSearchbar;
