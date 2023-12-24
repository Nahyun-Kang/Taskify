import { axiosInstance } from '@/src/app/_util/axiosInstance';

export default async function uploadImageForServer(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post('https://sp-taskify-api.vercel.app/3/columns/562/card-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE5LCJ0ZWFtSWQiOiIzIiwiaWF0IjoxNzAzNDI2MzE4LCJpc3MiOiJzcC10YXNraWZ5In0.XGNmV6eX2yDdPf6oMdi0549AwRmnIl8HYDF4dJCPI6k',
    },
  });

  return response.data.imageUrl;
}
