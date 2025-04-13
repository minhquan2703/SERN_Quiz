import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';

const ModalCreateUser = (props) => {
	const { show, setShow } = props
    // const [show, setShow] = useState(false);
    const handleClose = () => {
		setShow(false);
		setEmail("")
		setPassword("")
		setUsername("")
		setImage("")
		setRole("USER")
		setPreviewImage("")
	}
    //const handleShow = () => setShow(true);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")
	const [image, setImage] = useState("")
	const [role, setRole] = useState("USER")
	const [previewImage, setPreviewImage] = useState("")	

	const handleUploadImage = (event) =>{
		if(event.target && event.target.value && event.target.files[0]){
		setPreviewImage(URL.createObjectURL(event.target.files[0]))
		setImage(event.target.files[0])
		}
	}
	
	const validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  );
	  };

	const handleSubmitCreateUser = async() =>{
		// let data = {
		// 	email: email,
		// 	password: password,
		// 	username: username,
		// 	role: role,
		// 	userImage: image
		// }
		// console.log(data)
		const isValidEmail = validateEmail(email)
		if(!isValidEmail){
			toast.error("Invalid email")
			return;
		}

		if(!password){
			toast.error("Invalid password")
			return;
		}
		
		
		let data = await postCreateNewUser(email, password, username, role, image);
		console.log("check res >>>", data)
		if(data && data.EC === 0){
			toast.success(data.EM)
			handleClose();
			await props.fetchListUsers()
		}
		if(data && data.EC !== 0){
			toast.error(data.EM)
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
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input 
					type="email" 
					className="form-control" 
					value={email}
					onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input 
					type="password" 
					className="form-control"
					onChange ={(event) => setPassword(event.target.value)}/>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input type="text" 
					className="form-control"
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
          <Button variant="secondary" onClick={()=>handleSubmitCreateUser()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser