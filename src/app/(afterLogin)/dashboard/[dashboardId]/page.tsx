import CardList from '@/src/app/(afterLogin)/_component/CardList';

export default function DashBoard() {
  return (
    <div className='flex flex-col lg:flex-row'>
      <CardList />
      <CardList />
    </div>
  );
}
