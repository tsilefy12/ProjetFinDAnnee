import React, { useState } from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { Link } from 'react-router-dom'
import { sidebarData } from './SidebarData'
import './Navrbar.css';
import { IconContext } from 'react-icons'
function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to="#" className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className='izyroa'>
            <label className='text1 float-start'>ECOLE &nbsp;&nbsp;&nbsp; NATIONALE &nbsp;&nbsp; D'INFORMATIQUE</label>
            <label className='text flot-end'>&nbsp;&nbsp;-|- &nbsp;&nbsp;PROJET &nbsp;&nbsp; FIN &nbsp;&nbsp; D'ANNEE &nbsp;&nbsp;M1 &nbsp;&nbsp;2022</label>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to="#" className='nav-bars'>
                <AiIcons.AiOutlineClose />
              </Link>

            </li>

            {sidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>

  )
}

export default Navbar