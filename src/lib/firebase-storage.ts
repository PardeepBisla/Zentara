import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage, isFirebaseConfigured } from "./firebase";

/**
 * Uploads a base64 image string to Firebase Cloud Storage
 * @param base64Image The base64 encoded image string
 * @param userId The UID of the user
 * @returns The public download URL of the uploaded image
 */
export async function uploadGeneratedImage(base64Image: string, userId: string): Promise<string> {
  if (!isFirebaseConfigured || !storage) {
    throw new Error("Firebase Storage is not configured. Please add your credentials.");
  }

  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `generations/${userId}/${timestamp}.png`);
    
    // Upload the base64 string
    // Note: base64Image should be the raw data or include the data:image/png;base64, prefix
    const uploadTask = await uploadString(storageRef, base64Image, 'base64');
    
    // Get the public download URL
    const downloadURL = await getDownloadURL(uploadTask.ref);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading to Firebase Storage:", error);
    throw error;
  }
}
