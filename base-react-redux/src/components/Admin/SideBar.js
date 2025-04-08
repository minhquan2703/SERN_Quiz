import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
  } from 'react-pro-sidebar';
  import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
  import { DiReact } from 'react-icons/di';
  import { MdDashboard } from 'react-icons/md';
  import sidebarBg from '../../assets/bg2.jpg';
  import './SideBar.scss'

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
    return(
        <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <DiReact size={'3em'} color={'#00bfff'} style={{marginRight: "5px"}}/>
            <span>Pham Minh Quan</span>
          </div>
        </SidebarHeader>
  
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdDashboard />}
              //suffix={<span className="badge red">Main</span>}
            >
                Dashboard
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              icon={<FaGem />}
              title="Features"
            >
              <MenuItem>Manage Users</MenuItem>
              <MenuItem>Manage Quizs</MenuItem>
              <MenuItem>Manage Questions</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
  
        <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/minhquan2703"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                &#169; My github
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
      </ProSidebar>

    )
}

export default SideBar;