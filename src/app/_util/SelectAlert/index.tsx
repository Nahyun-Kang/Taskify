'use client';
import Swal from 'sweetalert2';

interface SelectAlertParamsProps {
  work: 'Cancel' | 'Delete' | 'Update';
  onClick?: (result: boolean) => boolean;
}

export default function SelectAlert({ work }: SelectAlertParamsProps) {
  const workName = work === 'Cancel' ? '취소' : work === 'Delete' ? '삭제' : '변경';
  return Swal.fire({
    icon: `${work === 'Delete' ? 'warning' : 'question'}`,
    title: `${workName} 하시겠습니까?`,
    text: `${work === 'Delete' ? '삭제시 복구가 불가능합니다.' : ''}`,
    confirmButtonText: `${workName}`,
    cancelButtonText: '이전',
    reverseButtons: true,
    showCancelButton: true,
  }).then((result) => {
    console.log('result : ', result);
    return result.isConfirmed;
  });
}
