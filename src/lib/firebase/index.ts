// firebase/index.ts

// Import the necessary Firebase modules
import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  FirestoreDataConverter,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  GoogleAuthProvider,
  UserInfo,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import { GroceryList } from '../../types';

// Initialize Firebase app and Firestore database
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
    return [];
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

// Board management functions
export interface Board {
  id: string;
  title: string;
  members: string[]; // User IDs of members
  type: 'Grocery' | 'Chore' | 'Custom'; // Board type
  owner: string; // User ID of the owner
  // Add more fields as needed
}

// Add a new board to the 'boards' collection
export async function addBoard(board: Board) {
  try {
    const docRef = await addDoc(collection(db, 'boards'), board);
    console.log('Board added with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding board: ', error);
  }
}

// Fetch all boards and filter based on user membership
export async function fetchUserBoards(userId: string): Promise<Board[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'boards'));
    const boards: Board[] = [];
    querySnapshot.forEach((doc) => {
      const boardData = doc.data();
      if (boardData.members.includes(userId) || boardData.owner === userId) {
        boards.push({ ...boardData, id: doc.id } as Board);
      }
    });
    return boards;
  } catch (error) {
    console.error('Error fetching user boards: ', error);
    return [];
  }
}

// Fetch a specific board by ID
export async function fetchBoardById(boardId: string): Promise<Board | null> {
  try {
    const docRef = doc(db, 'boards', boardId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data() as Board;
    }
    return null;
  } catch (error) {
    console.error('Error fetching board by ID: ', error);
    return null;
  }
}
export const createBoard = async (boardData: any, userId: string) => {
  try {
    await addDoc(collection(db, 'boards'), {
      ...boardData,
      members: [userId],
      owner: userId,
    });
  } catch (error) {
    console.error('Error creating board: ', error);
    throw error; // Optionally rethrow the error for handling in the component
  }
};

export const deleteBoard = async (boardId: string) => {
  try {
    await deleteDoc(doc(db, 'boards', boardId));
  } catch (error) {
    console.error('Error deleting board: ', error);
    throw error; // Optionally rethrow the error for handling in the component
  }
};

export const getBoardDetails = async (boardId: string) => {
  try {
    const boardDocRef = doc(db, 'boards', boardId);
    const boardDocSnapshot = await getDoc(boardDocRef);
    if (boardDocSnapshot.exists()) {
      return boardDocSnapshot.data();
    } else {
      throw new Error('Board not found'); // Handle case where board doesn't exist
    }
  } catch (error) {
    console.error('Error fetching board details: ', error);
    throw error; // Optionally rethrow the error for handling in the component
  }
};
