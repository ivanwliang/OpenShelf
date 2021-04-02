import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import Navbar from "@/components/Navbar";
import BookSearchbar from "@/components/BookSearchbar";
import { addBook, getUserBook } from "@/lib/db";
import { useAuth } from "@/lib/auth";

const BookDetail = () => {
  const auth = useAuth();
  const router = useRouter();
  const { key } = router.query;

  const [authorKey, setAuthorKey] = useState("");
  const [authorDetails, setAuthorDetails] = useState({});
  const [userHasBook, setUserHasBook] = useState(false);
  const [bookDetails, setBookDetails] = useState({});

  const {
    title,
    subtitle = "",
    authors,
    subjects = [],
    covers,
    description = "",
  } = bookDetails;

  useEffect(() => {
    const fetchBook = async (key) => {
      const response = await fetch(`https://openlibrary.org/works/${key}.json`);
      const result = await response.json();

      setBookDetails(result);
      setAuthorKey(result.authors[0].author.key);
    };

    if (key) {
      fetchBook(key);
    }
  }, [key]);

  useEffect(() => {
    const fetchAuthor = async (authorKey) => {
      const response = await fetch(`https://openlibrary.org${authorKey}.json`);
      const result = await response.json();

      setAuthorDetails(result);
    };

    if (authorKey) {
      fetchAuthor(authorKey);
    }
  }, [authorKey]);

  useEffect(() => {
    const fetchUserBook = async (key) => {
      const response = await getUserBook(auth.user.uid, key);
      if (response) {
        setUserHasBook(true);
      } else {
        setUserHasBook(false);
      }
    };

    if (key && auth.user) {
      fetchUserBook(key);
    }
  }, [key, auth.user]);

  const handleClick = async () => {
    const authorName = authorDetails.name;
    const authorBio = authorDetails?.bio?.value || "";
    const cover = covers ? covers[0] : "";

    if (auth.user && !userHasBook) {
      addBook(auth.user.uid, key, {
        title,
        subtitle,
        authorName,
        authorBio,
        cover,
        description,
        subjects,
      });

      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12 mt-2">
        <BookSearchbar />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <div>
          {covers && (
            <img
              className="md:float-left mb-6 md:mr-10 mx-auto"
              src={`https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`}
            />
          )}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold leading-7">{title}</h1>
            {authorDetails && <p>{authorDetails.name}</p>}
          </div>

          <div className={"mb-5"}>
            {userHasBook ? (
              <div className="inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-400">
                Book already added
              </div>
            ) : (
              <button
                type="button"
                className="inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleClick}
              >
                Add to Reading List
              </button>
            )}
          </div>

          {description && <ReactMarkdown>{description.value}</ReactMarkdown>}
        </div>

        {subjects.length > 0 && (
          <h2 className={"text-2xl font-bold mt-5"}>Categories</h2>
        )}
        <ul className={"list-disc list-inside mt-2 ml-2 space-y-1 mb-12"}>
          {subjects &&
            subjects.map((subject) => <li key={subject}>{subject}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default BookDetail;
