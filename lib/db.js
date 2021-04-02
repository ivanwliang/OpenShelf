import firebase from "./firebase";

const firestore = firebase.firestore();

// Users

export function updateUser(uid, data) {
  return firestore.collection("users").doc(uid).update(data);
}

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

// Reading List

export function addBook(uid, bookKey, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .collection("books")
    .doc(bookKey)
    .set(
      {
        uid: uid,
        bookKey,
        ...data,
        shelf: "currently-reading",
        userRating: 0,
        userReview: "",
        notes: "",
      },
      { merge: true }
    );
}

export async function getUserBook(uid, bookKey) {
  try {
    const snapshot = await firestore
      .collection("users")
      .doc(uid)
      .collection("books")
      .doc(bookKey)
      .get();

    return snapshot.data();
  } catch (error) {
    return error;
  }
}

export async function updateNote(uid, bookKey, content) {
  try {
    await firestore
      .collection("users")
      .doc(uid)
      .collection("books")
      .doc(bookKey)
      .update({ notes: content });
  } catch (error) {
    return error;
  }
}

export async function updateRating(uid, bookKey, rating) {
  try {
    await firestore
      .collection("users")
      .doc(uid)
      .collection("books")
      .doc(bookKey)
      .update({ userRating: rating });
  } catch (error) {
    return error;
  }
}

export async function updateShelf(uid, bookKey, shelf) {
  try {
    await firestore
      .collection("users")
      .doc(uid)
      .collection("books")
      .doc(bookKey)
      .update({ shelf: shelf });
  } catch (error) {
    return error;
  }
}

export async function deleteBook(uid, bookKey) {
  try {
    await firestore
      .collection("users")
      .doc(uid)
      .collection("books")
      .doc(bookKey)
      .delete();
  } catch (error) {
    return error;
  }
}
