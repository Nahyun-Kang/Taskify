import { axiosInstance } from '@/src/app/_util/axiosInstance';

export default async function uploadImageForServer(file: File, query: string) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post(query, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (query === 'users/me/image') {
    return response.data.profileImageUrl;
  }

  return response.data.imageUrl;
}
