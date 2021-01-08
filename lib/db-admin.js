import db from './firebase-admin';

export async function getAllBooks(uid) {
  try {
    const snapshot = await db.collection('books').where('uid', '==', uid).get();
    const books = [];

    snapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });

    return books;
  } catch (error) {
    return error;
  }
}
