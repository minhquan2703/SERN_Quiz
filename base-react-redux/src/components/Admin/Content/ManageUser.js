import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { useState } from "react";
import { FcPlus } from 'react-icons/fc';



const ManageUser = (props) => {

    const [showModalCreateUser, setShowModelCreateUser] = useState(false)
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div>
                    <button className='btn btn-primary' onClick={()=>setShowModelCreateUser(true)}><FcPlus/>Add new users</button>
                </div>
                <div>
                    table users
                </div>
                <ModalCreateUser 
                show={showModalCreateUser}
                setShow = {setShowModelCreateUser}
                />

            </div>

        </div>
    )
}
export default ManageUser