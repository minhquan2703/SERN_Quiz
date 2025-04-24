import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers, getUsersWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LIMIT_USER = 6
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [ dataUpdate, setDataUpdate ] = useState({})
  const [ dataView, setDataView ] = useState({})
  const [ dataDelete, setDataDelete ] = useState({})
  const [ pageCount, setPageCount ] = useState(0)
  const [ currentPage, setCurrentPage ] = useState(1)

  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaginate(1);
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
        setListUsers(res.DT);
    }
  };
  const fetchListUsersWithPaginate = async(page) => {
    let res = await getUsersWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
        console.log(`RES DT =>> `,res.DT)
        setListUsers(res.DT.users);
        setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user)
  };

  const handleClickBtnView = (user) => {
    setShowModalViewUser(true);
    setDataView(user)
  };
  const handleClickBtnDelete = (user) =>{
    console.log("data delete>> ",user)
    setShowModalDeleteUser(true)
    setDataDelete(user)
  }

  const resetUpdateData= () =>{
    setDataUpdate({})
  }

  const resetViewData = () =>{
    setDataView({})
  }

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            &#160;&#160;Add new users
          </button>
        </div>
        <div className="table-user-container">
          {/* <TableUser
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            listUsers={listUsers}
          /> */}
          <TableUserPaginate
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            listUsers={listUsers}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount = {pageCount}
            currentPage = {currentPage} 
            setCurrentPage = {setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage = {currentPage} 
          setCurrentPage = {setCurrentPage}
        />
          {/* {showModalUpdateUser &&  có thể dùng điều kiện show để thay cho hàm resetUpdateUser và tránh re-render, nhưng cách này sẽ 
          làm modal bị unmount (không tồn tại trong DOM nếu show = false) => gây lỗi/bug khi import từ component khác 
          + nếu đang upload ảnh/video mà modal bị unmount, sẽ mất toàn bộ tiến trình. 
           */}
          <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate = {dataUpdate}
          fetchListUsers={fetchListUsers}
          resetUpdateData={resetUpdateData}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage = {currentPage} 
          setCurrentPage = {setCurrentPage}
        />
          <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataView = {dataView}
          resetViewData={resetViewData}
        />
          <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage = {currentPage} 
          setCurrentPage = {setCurrentPage}
          />

      </div>
    </div>
  );
};
export default ManageUser;
