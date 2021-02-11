import Link from 'next/link';

import { useAuth } from '@/lib/auth';

export default function Navbar() {
  const auth = useAuth();

  return (
    <header>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex justify-between items-center border-b-2 border-gray-100 py-6 '>
          <Link href='/'>
            <a className='text-4xl font-extrabold'>OpenShelf</a>
          </Link>
          {auth.user ? (
            <button
              onClick={() => auth.signout()}
              className='whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium bg-indigo-600 text-white'
            >
              Sign Out
            </button>
          ) : (
            <Link href='/login'>
              <a className='whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium bg-indigo-600 text-white'>
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
