import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  increment, 
  serverTimestamp,
  runTransaction
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

/**
 * Saves the generation history and decrements user credits
 * @param userId The UID of the user
 * @param imageUrl The URL of the generated image
 */
export async function saveGenerationAndDeductCredit(userId: string, imageUrl: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firestore is not configured. Please add your credentials.");
  }

  try {
    const userRef = doc(db, "users", userId);
    
    // Use a transaction to ensure atomicity
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }
      
      const currentCredits = userDoc.data().credits || 0;
      
      if (currentCredits <= 0) {
        throw new Error("Insufficient credits");
      }
      
      // 1. Add to generations collection
      const generationsRef = collection(db, "generations");
      const newGenRef = doc(generationsRef);
      transaction.set(newGenRef, {
        userId,
        imageUrl,
        createdAt: serverTimestamp(),
      });
      
      // 2. Decrement user credits
      transaction.update(userRef, {
        credits: increment(-1)
      });
    });
  } catch (error) {
    console.error("Error updating Firestore:", error);
    throw error;
  }
}
