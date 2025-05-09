import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import _ from "lodash";
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
    const navigate = useNavigate()
    const [arrQuiz, setArrQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        let res = await getQuizByUser();
        if(res && res.EC === 0){
            setArrQuiz(res.DT);

        }
    };

    return (
        <div className="list-quiz-container container">
            {!_.isEmpty(arrQuiz) ? (
                arrQuiz.map((quiz, index) => {
                    return (
                        <div className="card" style={{ width: "18rem" }} key={`${index}-quiz`}>
                            <img src={`data:image/png;base64,${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz #{+index +1}</h5>
                                <p className="card-text">{quiz.description || "No description"}</p>
                                <button href="#" className="btn btn-primary" onClick={()=>navigate(`/quiz/${quiz.id}`, {state: {quizTitle: quiz.description} } )}>Start Now</button>
                            </div>
                        </div>
                    );
                }))
                : (
                <div>You dont have quiz</div>
            )}
        </div>
    );
};

export default ListQuiz;