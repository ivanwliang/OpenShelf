import db from './firebase-admin';

export async function getAllBooks(uid) {
  try {
    const snapshot = await db
      .collection('users')
      .where('uid', '==', uid)
      .collection('books')
      .get();
    const books = [];

    snapshot.forEach((doc) => {
      books.push({ bookKey: doc.bookKey, ...doc.data() });
    });

    return books;
  } catch (error) {
    return error;
  }
}
