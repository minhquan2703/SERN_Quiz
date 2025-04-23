import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { getUpdateUser, putUpdateUser } from '../../../services/apiService';
import _default from 'react-bootstrap/Modal';
import _ from 'lodash';

const ModalViewUser = (props) => {
	const { show, setShow, dataView } = props
    // const [show, setShow] = useState(false);
    const handleClose = () => {
		setShow(false);
		setEmail("")
		setPassword("")
		setUsername("")
		setImage("")
		setRole("USER")
		setPreviewImage("")
		props.resetViewData()
	}
	    //const handleShow = () => setShow(true);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")
	const [image, setImage] = useState("")
	const [role, setRole] = useState("USER")
	const [previewImage, setPreviewImage] = useState("")	

	useEffect(()=>{
		if(!_.isEmpty(dataView)){
            setEmail(dataView.email)
            // setPassword(dataView.password) -> backend khong cung cap password trong method get
			setUsername(dataView.username)
			setImage("")
			setRole(dataView.role)
			if(dataView.image){
				setPreviewImage(`data:image/jpeg;base64,${dataView.image}`)	
			}
            console.log("check response dataView: ", dataView)
		}}, [dataView])

	const handleUploadImage = (event) =>{
		if(event.target && event.target.value && event.target.files[0]){
		setPreviewImage(URL.createObjectURL(event.target.files[0]))
		setImage(event.target.files[0])
		}
	}


  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal 
      show={show}
      onHide={handleClose} 
      size="xl"
      backdrop="static"
      className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>View User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input 
					type="email" 
					className="form-control" 
					value={email}
					disabled
					onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input 
					className="form-control"
					value={password}
                    disabled/>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input 
					type="text" 
					className="form-control"
					value={username}
					onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className="col-md-4">
                    <label className="form-label" >Role</label>
                    <select 
					className="form-select" 
					onChange={(event) => setRole(event.target.value)}
					value={role}
					>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                <div className='col-md-12'>
                  <label className='form-label label-upload' htmlFor='labelUpload'>
					<FcPlus/> 
					Upload File Image</label>
                  <input 
				  type="file" 
				  hidden id='labelUpload'
				  onChange={(event) => handleUploadImage(event)}/>
                </div>
                <div className='col-md-12 img-preview'>
					{previewImage ?
					<img src={previewImage}/>
					:
					<span>Preview Image</span>
					}
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalViewUser