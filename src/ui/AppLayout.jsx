import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

function AppLayout() {
  return (
    <section className='styledAppLayout'>
      <Header />
      <Sidebar />
      <main className='main-applayout'>
        <div className='container'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default AppLayout;
