import Navbar from '@/components/Navbar';
import BookSearchbar from '@/components/BookSearchbar';

export default function Index() {
  return (
    <div className='bg-white'>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='max-w-5xl mx-auto py-12 mt-2'>
          <BookSearchbar />
        </div>
      </main>
    </div>
  );
}
