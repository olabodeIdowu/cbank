import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import { IoIosNotifications } from 'react-icons/io';
import { BsFillPeopleFill } from 'react-icons/bs';
import { AiOutlineCaretRight, AiOutlineCaretDown } from 'react-icons/ai';
import { navLists } from '../data/navItems';

function MainNav() {
  const [navItems, setNavItems] = useState(navLists);

  const navigate = useNavigate();

  function handleNavButtons(id) {
    setNavItems(() => {
      return navItems.map((ni) => {
        return {
          ...ni,
          active: id === ni.id ? !ni.active : false,
        };
      });
    });
  }

  return (
    <nav>
      <ul className='navList'>
        <li>
          <NavLink className='styledNavLink' to='/dashboard'>
            <AiFillHome />
            <span>Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink className='styledNavLink' to='/users'>
            <BsFillPeopleFill />
            <span>Users</span>
          </NavLink>
        </li>
        {navItems.map((ni) => {
          return (
            <li
              style={
                ni.active ? { background: '#07073d' } : { background: 'none' }
              }
              key={ni.id}
              onClick={() => handleNavButtons(ni.id)}
            >
              <NavLink className='styledNavLink styledNavLinkCaret'>
                <div className='styledNavLinkDiv'>
                  {ni?.icon}

                  <span>{ni.name}</span>
                </div>
                {ni.active ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}
              </NavLink>
              {ni.active && (
                <main className='styledNavLinkMain'>
                  {ni.list.map((l, index, arr) => {
                    return (
                      <p
                        key={index}
                        onClick={() =>
                          navigate(
                            `/${
                              arr[index].includes(' ')
                                ? arr[index].split(' ').join('-').toLowerCase()
                                : arr[index].toLowerCase()
                            }`
                          )
                        }
                        className='subNavLink'
                      >
                        {l}
                      </p>
                    );
                  })}
                </main>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MainNav;
