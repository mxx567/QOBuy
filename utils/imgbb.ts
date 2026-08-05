import * as ImagePicker from 'expo-image-picker';
import { File } from 'expo-file-system';
// 1. Define the ImgBB API Response structure
interface ImgBbResponse {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string; 
    display_url: string;
    size: number;
    time: string;
    expiration: string;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
}


export interface uploadedImage{
    uri: string,
    delete: string
};

const apikey = process.env.EXPO_PUBLIC_IMGBB_API_KEY ?? '';
export const uploadToImgBB = async (imageuri: string): Promise<string | null | uploadedImage> => {
    // 1. Point the File class directly to your image's URI string
    const fileInstance = new File(imageuri);

    // 2. Call the native async base64 helper method
    const base64String = await fileInstance.base64();

    const formData = new FormData();
    formData.append('key', String(apikey));
    formData.append('image', base64String);



  try { 
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: 'POST',
      body: formData,
      // do NOT set Content-Type header manually — fetch needs to set
      // the multipart boundary itself; setting it yourself breaks the upload
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }

    const result: ImgBbResponse = await response.json();

    if (result.success) {
      const img: uploadedImage = { uri: result.data.url, delete: result.data.delete_url }
      return (img);
    } else {
      console.error('ImgBB error:', result);
      return null;
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};