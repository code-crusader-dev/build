import { supabase } from './supabase';

/**
 * Storage bucket names
 */
export const STORAGE_BUCKETS = {
  CLUB_LOGOS: 'club-logos',
  CLUB_BANNERS: 'club-banners',
  EVENT_POSTERS: 'event-posters',
  USER_AVATARS: 'user-avatars',
} as const;

export type StorageBucket = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

/**
 * Upload result type
 */
export interface UploadResult {
  success: boolean;
  publicUrl?: string;
  error?: string;
}

/**
 * Upload a file to Supabase Storage
 * @param bucketName - Name of the storage bucket
 * @param file - File to upload
 * @param fileName - Optional custom file name (auto-generated if not provided)
 * @returns Upload result with public URL or error
 */
export const uploadFile = async (
  bucketName: StorageBucket,
  file: File,
  fileName?: string
): Promise<UploadResult> => {
  try {
    // Generate unique file name if not provided
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const finalFileName = fileName || `${timestamp}_${randomString}.${fileExtension}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(finalFileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return {
        success: false,
        error: error.message || 'Failed to upload file',
      };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return {
      success: true,
      publicUrl,
    };
  } catch (error: any) {
    console.error('Upload file error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during upload',
    };
  }
};

/**
 * Delete a file from Supabase Storage
 * @param bucketName - Name of the storage bucket
 * @param filePath - Path of the file to delete
 * @returns Success status
 */
export const deleteFile = async (
  bucketName: StorageBucket,
  filePath: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      console.error('Storage delete error:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete file',
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Delete file error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during deletion',
    };
  }
};

/**
 * Get public URL for a file
 * @param bucketName - Name of the storage bucket
 * @param filePath - Path of the file
 * @returns Public URL
 */
export const getPublicUrl = (bucketName: StorageBucket, filePath: string): string => {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
};
