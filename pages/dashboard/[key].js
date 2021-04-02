import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { getUserBook } from "@/lib/db";
import Navbar from "@/components/Navbar";
import BookSearchbar from "@/components/BookSearchbar";
import { useAuth } from "@/lib/auth";
import Notes from "@/components/Notes";
import StarRating from "@/components/StarRating";

const UserBookDetail = () => {
  const auth = useAuth();
  const router = useRouter();
  const { key } = router.query;

  const [bookDetails, setBookDetails] = useState({});
  const {
    uid,
    authorName = "",
    description = "",
    bookKey,
    cover,
    notes,
    shelf,
    title,
    userRating,
    userReview,
  } = bookDetails;

  useEffect(() => {
    const fetchBook = async (uid, key) => {
      const result = await getUserBook(uid, key);

      // Reshape description into proper format - sometimes it returns as description or description.value
      if (typeof result.description === "object") {
        result.description = result.description.value;
      }

      setBookDetails(result);
    };

    if (auth.user && key) {
      const uid = auth.user.uid;
      fetchBook(uid, key);
    }
  }, [key, auth.user]);

  // Wait for data fetch to finish before passing down props to StarRating
  if (!bookKey) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12 mt-2">
        <BookSearchbar />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <div>
          {cover && (
            <img
              className="md:float-left mb-6 md:mr-10 mx-auto"
              src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`}
            />
          )}

          <div className="mb-6 space-y-2">
            <h1 className="text-3xl font-bold leading-7">{title}</h1>
            <p>{authorName}</p>
          </div>

          {description && <ReactMarkdown>{description}</ReactMarkdown>}
        </div>

        <div className="clear-left">
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gray-900">Rating</span>
            </h2>
            <StarRating rating={userRating} uid={uid} bookKey={bookKey} />
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-bold">
              <span className="text-gray-900">Notes</span>
            </h2>
            <div className="mt-3 mb-6 py-6 px-6 bg-white shadow-md border border-gray-400 sm:rounded-lg">
              <Notes notes={notes} uid={uid} bookKey={bookKey} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookDetail;
