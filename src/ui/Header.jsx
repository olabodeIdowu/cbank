import { FcMenu } from 'react-icons/fc';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';
import Search from './Search';
import { NavLink } from 'react-router-dom';
import { IoIosNotifications } from 'react-icons/io';

// import { useEffect, useState } from 'react';

function Header() {
  return (
    <main className='styledHeader'>
      <div style={{ position: 'relative' }} className='apps-linkHeader'>
        <FcMenu className='grapp' />
        <div>
          <NavLink className='nav-item' to='/dashboard'>
            Home
          </NavLink>
          <p>/</p>
          <p>dashboard</p>
        </div>

        <IoIosNotifications className='notifications' />
        <p
          style={{
            position: 'absolute',
            right: '-2.5%',
            top: '-50%',
            fontSize: '2rem',
            color: '#b91c1c',
          }}
        >
          0
        </p>
      </div>
      <div className='apps-search'>
        {/* <GrApps className='grapp' /> */}
        <Search />
      </div>

      <div className='menu-avatar'>
        <UserAvatar />
        <HeaderMenu />
      </div>
    </main>
  );
}

export default Header;
