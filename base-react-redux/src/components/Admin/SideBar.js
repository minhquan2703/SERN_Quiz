import "react-pro-sidebar/dist/css/styles.css";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import { FaGem } from "react-icons/fa";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import sidebarBg from "../../assets/bg2.jpg";
import "./SideBar.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
    const navigate = useNavigate();
    return (
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
                        padding: "24px",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontSize: 14,
                        letterSpacing: "1px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}>
                    <DiReact
                        onClick={()=>navigate('/')}
                        size={"4em"}
                        color={"#00bfff"}
                        style={{
                            marginRight: "5px",
                            cursor: "pointer",
                         }}/>
                    <span>QLearning</span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<MdDashboard />}
                        //suffix={<span className="badge red">Main</span>}
                    >
                        Dashboard
                        <Link to="/admins" />
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu icon={<FaGem />} title="Features">
                        <MenuItem>
                            Manage Users
                            <Link to="/admins/manage-users" />
                        </MenuItem>
                        <MenuItem>
                            Manage Quizs
                            <Link to="/admins/manage-quizzes" />
                        </MenuItem>
                        <MenuItem>
                            Manage Questions
                            <Link to="/admins/manage-questions" />
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: "center" }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: "20px 24px",
                    }}
                >
                    <a
                        href="https://github.com/minhquan2703"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        <span
                            style={{
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                            }}
                        >
                            &#169; My github
                        </span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default SideBar;
