import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';
import BookSearchbar from '@/components/BookSearchbar';
import { useAuth } from '@/lib/auth';

export default function Index() {
  const auth = useAuth();
  const router = useRouter();

  // Redirect user to dashboard if logged in
  if (auth.user) {
    router.push('/dashboard');
  }

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
