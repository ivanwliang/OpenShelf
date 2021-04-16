import Navbar from "@/components/Navbar";
import BookSearchbar from "@/components/BookSearchbar";

const BookDetailLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12 mt-2">
        <BookSearchbar />
      </div>
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </div>
  );
};

export default BookDetailLayout;
