import BookCard from '@/components/BookCard';

const Shelf = ({ books, shelfName }) => {
  const slug = shelfName.toLowerCase().replace(/ /g, '-');

  // Filter books based on the shelf they belong to
  const shelfBooks = books.filter((book) => book.shelf === slug);

  // Don't render shelf if no books belong to it
  if (shelfBooks.length === 0) {
    return null;
  }

  return (
    <div className='py-4'>
      <h3 className='text-lg leading-6 font-medium text-gray-900 border-b border-gray-200'>
        {shelfName}
      </h3>

      <ul>
        {shelfBooks.map((book) => (
          <BookCard
            key={book.bookKey}
            bookKey={book.bookKey}
            title={book.title}
            coverId={book.cover}
            author={book.authorName}
            dashboard={true}
            shelf={slug}
          >
            {book.title}
          </BookCard>
        ))}
      </ul>
    </div>
  );
};

export default Shelf;
