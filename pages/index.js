import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import BookSearchbar from "../components/BookSearchbar";
import { useAuth } from "@/lib/auth";

export default function Index() {
  const auth = useAuth();
  const router = useRouter();

  // Redirect user to dashboard if logged in
  if (auth.user) {
    router.push("/dashboard");
  }

  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Your Online Bookshelf
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Search for books to add to your reading list. Take notes, rate, and
            keep track of your book collection.
          </p>
        </div>
      </div>
      <div className="max-w-6xl px-6 mx-auto mt-2">
        <BookSearchbar />
      </div>
    </div>
  );
}
