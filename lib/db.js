import firebase from './firebase';

const firestore = firebase.firestore();

// Users

export function updateUser(uid, data) {
  return firestore.collection('users').doc(uid).update(data);
}

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

// Reading List

export function addBook(uid, bookKey, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .collection('books')
    .doc(bookKey)
    .set(
      {
        bookKey,
        ...data,
        shelf: 'reading-list',
        userRating: null,
        userReview: '',
        notes: '',
      },
      { merge: true }
    );
}

export async function getAllBooks(uid) {
  try {
    const books = [];

    const snapshot = await firestore
      .collection('users')
      .doc(uid)
      .collection('books')
      .get();

    snapshot.forEach((doc) => {
      doc = doc.data();
      books.push({ bookKey: doc.bookKey, ...doc });
    });

    return books;
  } catch (error) {
    return error;
  }
}
