import { useState, useEffect } from "react";
import Select from "react-select";
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listUser, setListUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, []);
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`,
                };
            });
            setListQuiz(newQuiz);
        }
    };
    const fetchUser = async()=>{
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let users = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`,
                };
            });
            setListUsers(users);
        }
    }
    const handleAssign = async() =>{
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if(res && res.EC === 0){
            toast.success(res.EM);
            setSelectedQuiz({});
            setSelectedUser({});
        }
        else{
            toast.error(res.EM);
        }
        console.log('check res: ',res)
    } 
    return (
        <div className="assign-quiz-container row">
            <div className="col-6 form-group">
                <label className="mb-2">Select Quiz: </label>
                <Select
                    className="z-3"
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className="col-6 form-group">
                <label className="mb-2">Select Users: </label>
                <Select
                    className="z-2"
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button className="btn btn-warning mt-3" onClick={()=>handleAssign()}>Assign</button>
            </div>
        </div>
    );
};
export default AssignQuiz;
