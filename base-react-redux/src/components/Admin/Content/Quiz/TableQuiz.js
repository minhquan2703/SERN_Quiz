import { useEffect, useState } from "react";
import { deleteQuiz, getAllQuizForAdmin } from "../../../../services/apiService";
import { toast } from "react-toastify";
import ModalDeleteQuiz from "./ModalUpdateQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = (props) => {
    const { fetchQuiz, listQuiz } = props
    // const [ showModalDeleteQuiz, setShowModalDeleteQuiz ] = useState(false)

    // useEffect(()=>{
    //     fetchQuiz();
    // },[])
    // const fetchQuiz = async() =>{
    //     let res = await getAllQuizForAdmin()
    //     if(res && res.EC === 0){
    //         setListQuiz(res.DT);
    //     }
    //     console.log('res: ',res)
    // }
    // const handleDeleteQuiz = async(quizId)=>{
    //     let resDelete = await deleteQuiz(quizId)
    //     if(resDelete && resDelete.EC ===0){
    //         // setListQuiz(prev => prev.filter((q)=> q.id !== quizId));
    //         fetchQuiz()
    //         toast.success(resDelete.EM);
    //     }
    //     console.log('res delete: ',resDelete)
    // }
    return (
        <>
            <div>List Quizzes</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="colSpan">ID</th>
                        <th scope="colSpan">Name</th>
                        <th scope="colSpan">Description</th>
                        <th scope="colSpan">Type</th>
                        <th scope="colSpan">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((quiz, index) => {
                        return(
                        <tr key={`table-quiz-${index}`}>
                            <td>{quiz.id}</td>
                            <td>{quiz.name}</td>
                            <td>{quiz.description}</td>
                            <td>{quiz.difficulty}</td>
                            <td>
                                <button className="btn btn-warning mx-2" onClick={()=>props.handleClickBtnUpdateQuiz(quiz)}>Update</button>
                                <button className="btn btn-danger" onClick={() => props.handleClickBtnDeleteQuiz(quiz.id)}>Delete</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
export default TableQuiz;
