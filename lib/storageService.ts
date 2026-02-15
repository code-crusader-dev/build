import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Upload file to Firebase Storage
 */
export async function uploadFile(
  file: File,
  path: string
): Promise<{ success: true; url: string } | { success: false; error: string }> {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { success: true, url: downloadURL };
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return { success: false, error: error.message || 'Failed to upload file' };
  }
}

/**
 * Upload club logo
 */
export async function uploadClubLogo(clubId: string, file: File) {
  const path = `club-logos/${clubId}_${Date.now()}.${file.name.split('.').pop()}`;
  return uploadFile(file, path);
}

/**
 * Upload club banner
 */
export async function uploadClubBanner(clubId: string, file: File) {
  const path = `club-banners/${clubId}_${Date.now()}.${file.name.split('.').pop()}`;
  return uploadFile(file, path);
}

/**
 * Delete file from Firebase Storage
 */
export async function deleteFile(fileUrl: string): Promise<boolean> {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}
