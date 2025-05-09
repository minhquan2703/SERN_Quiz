import { useState, useEffect } from "react";
import Select from "react-select";
import "./ManageQuiz.scss";
import { postCreateNewQuiz, getAllQuizForAdmin} from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { FcPlus } from "react-icons/fc";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "DIFFICULT", label: "DIFFICULT" },
];

const ManageQuiz = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState({ value: "EASY", label: "EASY" });
    const [image, setImage] = useState("");
    const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState({})
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [listQuiz, setListQuiz] = useState([]);

    // const handleChangeFile = (event) => {
    //     if (event.target && event.target.value && event.target.files[0]) {
    //         // setPreviewImage(URL.createObjectURL(event.target.files[0]))
    //         setImage(event.target.files[0]);
    //     }
    // };
    useEffect(()=>{
        fetchQuiz();
    },[])
    const fetchQuiz = async() =>{
        let res = await getAllQuizForAdmin()
        if(res && res.EC === 0){
            setListQuiz(res.DT);
        }
    }
    const handleSubmitQuiz = async () => {
        if (!description) {
            toast.error(`"description" is not allowed to be empty`);
        }
        let res = await postCreateNewQuiz(
            description,
            name,
            type?.value,
            image 
        );
        console.log(res);
        if (res && res.EC === 0) {
            setName("");
            setDescription("");
            setImage(null);
            setPreviewImage("")
            setType({ value: "EASY", label: "EASY" });
            toast.success(res.EM);
            fetchQuiz();
            
        } else {
            toast.error(res.EM);
        }
    };
    const handleClickBtnUpdateQuiz = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdateQuiz(quiz);
    };
    const handleClickBtnDeleteQuiz = (quizId) => {
        setShowModalDeleteQuiz(true);
        setDataDeleteQuiz(quizId);        
    };
    const resetDataUpdateQuiz = () => {
        setDataUpdateQuiz({});
    };
    const handleUploadImage = (event) => {
        if (event.target && event.target.value && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">
                                    Add New Quiz
                                </legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your quiz name"
                                        value={name}
                                        onChange={(event) =>
                                            setName(event.target.value)
                                        }
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="description..."
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(event.target.value)
                                        }
                                    />{" "}
                                    <label>Description</label>
                                </div>
                                <div className="my-3">
                                    <Select
                                        // value={selectedOption}
                                        // onChange={this.handleChange}
                                        value={type}
                                        onChange={setType}
                                        placeholder={"quiz types..."}
                                        options={options}
                                    />
                                </div>
                                <div className="more-actions form-group">
                                    <div className="btn-upload-image">
                                        <label className="form-label label-upload-quiz" htmlFor="labelUpload"><FcPlus />Upload File Image</label>  
                                        <input
                                            type="file"
                                            hidden
                                            id="labelUpload"
                                            onChange={(event) =>handleUploadImage(event)}/>
                                    </div>
                                    <div className="preview-image-container mx-auto my-3">
                                        {previewImage ? 
                                        <img src={previewImage} /> 
                                        :<span>Preview Image</span>}
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => handleSubmitQuiz()}>
                                            SAVE
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz
                                setShowModalUpdateQuiz={setShowModalUpdateQuiz}
                                handleClickBtnUpdateQuiz={handleClickBtnUpdateQuiz}
                                handleClickBtnDeleteQuiz={handleClickBtnDeleteQuiz}
                                fetchQuiz={fetchQuiz}
                                listQuiz={listQuiz} 
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign To Users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <ModalUpdateQuiz
                dataUpdateQuiz={dataUpdateQuiz}
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                resetDataUpdateQuiz={resetDataUpdateQuiz}
                fetchQuiz={fetchQuiz}
                listQuiz={listQuiz}/>
                
            <ModalDeleteQuiz 
                dataDeleteQuiz={dataDeleteQuiz}
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                fetchQuiz={fetchQuiz}
                listQuiz={listQuiz}/>
        </div>
    );
};
export default ManageQuiz;