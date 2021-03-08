import { useAuth } from '@/lib/auth';
import { updateShelf } from '@/lib/db';

export default function SelectShelf({ shelf, bookKey }) {
  const auth = useAuth();

  const handleChange = (e) => {
    updateShelf(auth.user.uid, bookKey, e.target.value);
  };

  return (
    <div>
      <label
        htmlFor='location'
        className='block text-sm font-medium text-gray-700'
      >
        Shelf
      </label>
      <select
        id='location'
        name='location'
        value={shelf}
        onChange={handleChange}
        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
      >
        <option value='currently-reading'>Currently Reading</option>
        <option value='want-to-read'>Want to Read</option>
        <option value='finished-reading'>Finished Reading</option>
      </select>
    </div>
  );
}
