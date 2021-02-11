import Navbar from '@/components/Navbar';
import BookSearchbar from '@/components/BookSearchbar';

export default function Index() {
  return (
    <div className='bg-white'>
      <Navbar />
      <main className='max-w-7xl mx-auto'>
        <div className='max-w-5xl mx-auto py-12'>
          <BookSearchbar />
        </div>
      </main>
    </div>
  );
}
