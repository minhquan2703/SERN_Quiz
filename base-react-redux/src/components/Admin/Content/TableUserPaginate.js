import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

const TableUserPaginate = (props) => {
    const { listUsers, pageCount } = props
    //const listUsers = props.listUsers 

    const handlePageClick = (event) => {
        props.fetchListUsersWithPaginate(+event.selected +1);
        props.setCurrentPage(+event.selected +1)
        console.log(`User requested page number ${event.selected}`);
      };
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {listUsers && listUsers.length > 0 &&
            listUsers.map((user, index) => {
                return(
                    <tr key={`table-user-${index}`}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn btn-success"
                                onClick={()=> props.handleClickBtnView(user)}
                                >View</button>
                                <button className="btn btn-warning mx-3" 
                                onClick={() => props.handleClickBtnUpdate(user)}
                                >Update</button>
                                <button className="btn btn-danger" 
                                onClick={() => props.handleClickBtnDelete(user)}
                                >Delete</button>
                            </td>
                    </tr>
            )
            })}
            {listUsers && listUsers.length === 0 &&
            <tr>
                <td colSpan={5}>Not found user</td>
            </tr>
            }

        </tbody>
      </table>
      <div className="user-pagination">
        <ReactPaginate
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< Prev"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={props.currentPage -1}
        />
      </div>

    </>
  );
};
export default TableUserPaginate;