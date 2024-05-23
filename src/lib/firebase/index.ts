// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from 'firebase/app';
import {
  FirestoreDataConverter,
  addDoc,
  collection,
  getDocs,
  getFirestore,
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
export async function fetchGroceryList() {
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
  }
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(getAuth(app), provider);
  } catch (e) {
    if (e instanceof FirebaseError) {
      throw new Error('Error signing in with Google: ' + e.message);
    }
  }
};
