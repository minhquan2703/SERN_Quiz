import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import _ from 'lodash';
import { putUpdateQuiz } from "../../../../services/apiService";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";

const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "DIFFICULT", label: "DIFFICULT" },
];

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdateQuiz } = props;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState({ value: "EASY", label: "EASY" });
    const [image, setImage] = useState(null);
    const [ previewImage, setPreviewImage] = useState("");

    useEffect(()=>{
        if(!_.isEmpty(dataUpdateQuiz)){
            setName(dataUpdateQuiz.name)
            setDescription(dataUpdateQuiz.description)
            setType({ value: dataUpdateQuiz.difficulty, label: dataUpdateQuiz.difficulty})
            setImage("")
            if(dataUpdateQuiz.image){
				setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`)	
			}
        }
    },[dataUpdateQuiz])
    const handleClose = () => {
        setShow(false);
        setName("");
        setDescription("");
        setType({ value: "EASY", label: "EASY" });
        setImage("");
        setPreviewImage("");
        props.resetDataUpdateQuiz()
    }
    const handleSubmitUpdateQuiz = async() =>{
        let res = await putUpdateQuiz(dataUpdateQuiz.id, description, name, type.value, image)
        if(res && res.EC === 0){
            props.fetchQuiz()
            toast.success(res.EM)
            handleClose()
        }
        else{
            toast.error(res.EM)
        }
    }
    const handleUpdateImage = (event) => {
        if (event.target && event.target.value && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };
    return (
        <>
            <Modal 
            show={show} 
            onHide={handleClose}
            backdrop='static'
            keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={name}
                                onChange={(event)=>setName(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={description}
                                onChange={(event)=>setDescription(event.target.value)}

                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                                    <Select
                                        // value={selectedOption}
                                        // onChange={this.handleChange}
                                        value={type}
                                        onChange={setType}
                                        placeholder={"quiz types..."}
                                        options={options}

                                    />
                        </Form.Group>
                        <Form.Group>
                            <div className="upload-image-container">
                                <div className="preview-image">
                                    <div className="btn-upload-image">
                                        <label className="form-label label-upload-quiz" htmlFor="labelUpdate"><FcPlus />Upload File Image</label>  
                                        <input
                                            type="file"
                                            hidden
                                            id="labelUpdate"
                                            onChange={(event) =>handleUpdateImage(event)}/>
                                    </div>
                                    <div className="preview-image-container mx-auto my-3">
                                        {previewImage ? 
                                        <img src={previewImage} /> 
                                        :<span>Preview Image</span>}
                                    </div>
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>handleSubmitUpdateQuiz()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUpdateQuiz;
