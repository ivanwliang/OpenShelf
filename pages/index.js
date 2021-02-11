import Navbar from '@/components/Navbar';
import BookSearchbar from '@/components/BookSearchbar';

export default function Index() {
  return (
    <div className='bg-white'>
      <Navbar />
      <main className='max-w-7xl mx-auto'>
        <div className='max-w-3xl mx-auto py-8'>
          <BookSearchbar />
        </div>
      </main>
    </div>
  );
}
