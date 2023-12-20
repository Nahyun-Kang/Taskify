import MagnifyingGlass from './MagnifyingGlass';

export default function InvitationList() {
  return (
    <div>
      <h2>초대받은 대시보드</h2>
      <div>
        <input placeholder='검색'></input>
        <MagnifyingGlass />
      </div>
      <div>
        <div>제목들</div>
        <div>데이터들</div>
      </div>
    </div>
  );
}
