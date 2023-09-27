import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <aside className='styledSidebar'>
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
