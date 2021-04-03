import { useState, useEffect } from "react";
import Router from "next/router";
import firebase from "@/lib/firebase";

import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import BookSearchbar from "@/components/BookSearchbar";
import Shelf from "@/components/Shelf";

const firestore = firebase.firestore();

const Dashboard = () => {
  const auth = useAuth();

  const [books, setBooks] = useState([]);

  // If no user found, redirect to login page
  useEffect(() => {
    // If there is no user even after auth has finished loading, redirect to login page
    if (!auth.user && !auth.loading) {
      Router.push("/login");
    }
  }, [auth]);

  // Subscribe to list of user's books
  useEffect(() => {
    // Wait for user to load before fetching books
    if (auth.user) {
      return firestore
        .collection("users")
        .doc(auth.user.uid)
        .collection("books")
        .onSnapshot((snapshot) => {
          var result = [];
          snapshot.forEach((doc) => {
            doc = doc.data();
            result.push({ bookKey: doc.bookKey, ...doc });
          });
          setBooks(result);
        });
    }
  }, [auth.user]);

  // Prevent flash of dashboard content if not authenticated
  if (!auth.user) {
    return null;
  }

  // Show empty state if user has not added any books yet
  if (books.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto py-12 mt-2">
            <BookSearchbar />
          </div>

          <p className="text-center text-xl font-medium text-gray-700 mt-4">
            Add some books
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12 mt-2">
        <BookSearchbar />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        {/* Render shelf for "Currently Reading" books */}
        <Shelf books={books} shelfName="Currently Reading" />

        {/* Render shelf for "Want to Read" books */}
        <Shelf books={books} shelfName="Want to Read" />

        {/* Render shelf for "Finished reading" books */}
        <Shelf books={books} shelfName="Finished Reading" />
      </div>
    </div>
  );
};

export default Dashboard;
