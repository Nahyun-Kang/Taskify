import Header from '../_component/Header';
import InvitationDashboard from '../_component/InvitationDashboard';
import SideMenu from '../_component/SideMenu';

export default function Dashboard() {
  return (
    <div>
      <SideMenu />
      <Header />
      <InvitationDashboard />
      <h1>username</h1>
    </div>
  );
}
