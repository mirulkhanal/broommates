// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from 'firebase/app';
import {
  FirestoreDataConverter,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { GroceryList } from '../../data';
import firebaseConfig from './firebaseConfig';
import {
  GoogleAuthProvider,
  UserInfo,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Define a custom Firestore data converter for GroceryList type
const groceryListConverter: FirestoreDataConverter<GroceryList> = {
  toFirestore: (item: GroceryList) => {
    const user: UserInfo = JSON.parse(localStorage.getItem('user') as string);
    return { ...item, author: user };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return { ...data } as GroceryList; // Convert Firestore data to GroceryList
  },
};

// Add a grocery item to the 'grocery-list' collection with type safety
export async function addItemToGroceryList(item: GroceryList) {
  try {
    const docRef = await addDoc(
      collection(db, 'grocery-list').withConverter(groceryListConverter),
      item
    );
    console.log('Item added with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding item: ', error);
  }
}

// Fetch grocery items from the 'grocery-list' collection with type safety
export async function fetchGroceryList(): Promise<GroceryList[]> {
  try {
    const querySnapshot = await getDocs(
      collection(db, 'grocery-list').withConverter(groceryListConverter)
    );
    const groceryItems: GroceryList[] = querySnapshot.docs.map((doc) =>
      doc.data()
    );
    return groceryItems;
  } catch (error) {
    console.error('Error fetching grocery list: ', error);
    return []; // Return an empty array on error
  }
}

// User profile handling
export async function createUserProfile(user: UserInfo) {
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      profileComplete: false,
    });
  }

  return userDoc.data();
}

export async function fetchUserProfile(userId: string) {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data() : null;
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(getAuth(app), provider);
    const user = result.user;
    const userProfile = await createUserProfile(user);
    return { user, userProfile };
  } catch (e) {
    if (e instanceof FirebaseError) {
      throw new Error('Error signing in with Google: ' + e.message);
    }
  }
};
