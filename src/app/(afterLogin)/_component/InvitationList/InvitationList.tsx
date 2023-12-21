import MagnifyingGlass from './MagnifyingGlass';
import { DUMMY, Dummy } from './DummyData';

export default function InvitationList() {
  const labelClass = 'text-gray40 text-1';
  const tableMainLable = 'hidden md:block';

  return (
    <div className='rounded-[.125rem] border-none bg-white px-[1.75rem] pt-8'>
      <h2 className='mb-5 text-[1.5rem] font-bold text-black80'>초대받은 대시보드</h2>
      <div className='mb-6 flex w-full gap-2 rounded-[.375rem] border-[.0625rem] px-4 py-2'>
        <MagnifyingGlass />
        <input placeholder='검색' className='w-full focus:outline-none'></input>
      </div>
      <table>
        <tr className={`flex ${labelClass} md:flex`}>
          <th className={`${tableMainLable} font-normal`}>이름</th>
          <th className={`${tableMainLable} font-normal`}>초대자</th>
          <th className={`${tableMainLable} font-normal`}>수락 여부</th>
        </tr>
        {DUMMY.map((item: Dummy, idx: number) => {
          return (
            <div key={idx.toString()}>
              <tr className={`float-left block ${labelClass}`}>
                <td className='block'>이름</td>
                <td className='block'>초대자</td>
                <td className='block'>수락 여부</td>
              </tr>
              <tr className='float-left block'>
                <td className='block'>{item.name}</td>
                <td className='block'>{item.inviter}</td>
                <td className='block'>
                  <button>수락</button>
                  <button>거절</button>
                </td>
              </tr>
            </div>
          );
        })}
      </table>
    </div>
  );
}
