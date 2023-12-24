import { axiosInstance } from '@/src/app/_util/axiosInstance';

export default async function uploadImageForServer(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post('columns/50/card-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.imageUrl;
}
