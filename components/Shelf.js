const Shelf = ({ shelfName = 'Reading List' }) => {
  return (
    <div className='pb-5 border-b border-gray-200'>
      <h3 className='text-lg leading-6 font-medium text-gray-900'>
        {shelfName}
      </h3>
    </div>
  );
};

export default Shelf;
