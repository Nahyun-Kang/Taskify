'use client';
import Swal from 'sweetalert2';

interface alertParamsProps {
  errorMessage: string;
  status: number;
  area: string;
}

export default function Alert({ errorMessage, status, area }: alertParamsProps) {
  return Swal.fire({
    icon: 'error',
    title: `${area} 에러 발생`,
    html: `<h2>상태코드: ${status} </h2> <br> <strong>${errorMessage}</strong>`,
    showCancelButton: false,
    confirmButtonText: '확인',
  });
}
