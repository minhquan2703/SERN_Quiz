import { useEffect, useState } from "react";
import { useParams, useLocation, data } from "react-router-dom"
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from 'lodash';
import './DetailQuiz.scss'
import Question from "./Question";
import ModalResult from "./ModalResult";

const DetailQuiz = (props) =>{
    const param = useParams();
    const quizId = param.id;
    const location = useLocation()
    const [ dataQuiz, setDataQuiz ]= useState([])
    const [ index, setIndex ] = useState(0)
    const [ isShowModalResult, setIsShowModalResult ] = useState(false)
    const [ dataModalResult, setDataModalResult] = useState({})
    useEffect(()=>{
        fetchQuiz(quizId)
    }, [quizId]);

    const fetchQuiz = async(id) =>{
        let res = await getDataQuiz(id)
        if(res && res.EC === 0){
            let raw = res.DT
            let data = _.chain(raw)
            // Group the elements of Array based on `color` property
            .groupBy("id")
            // `key` is group's name (color), `value` is the array of objects
            .map((value, key) => {
                let answers = [];
                let questionDescription, image = null;
                value.forEach((item, index)=> {

                    if(index === 0){
                        questionDescription = item.description;
                        image= item.image;
                    }
                    item.answers.isSelected = false;
                    answers.push(item.answers);
                })
                    
                return { questionId: key, answers, questionDescription, image };
        })
            .value()
            setDataQuiz(data)
        }
    };
    const handlePrev = () =>{
        if(index-1 < 0) return;
        setIndex(index -1);
    }
    const handleNext = () =>{
        if(dataQuiz && dataQuiz.length > index+1)
            setIndex(index +1);
    }
    const handleFinish = async() => {
        const payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = []
        if(dataQuiz && dataQuiz.length > 0){
            dataQuiz.forEach( question =>{
                let questionId = question.questionId;
                let userAnswerId = []
                question.answers.forEach(a=>{
                    if(a.isSelected){
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            //submit api
            // if(payload){
            let res = await postSubmitQuiz(payload);
            if(res.EC === 0 && res){
                console.log('check res: ',res)
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true)
            }
            else{
                alert('something was wrong')
            }
        }
    }
    

    const handleCheckBox = (aId, qId) =>{
        let dataQuizClone = _.cloneDeep(dataQuiz); //clone thay vì thao tác trực tiếp với dataQuiz để tránh phá cấu trúc dẫn tới bug
        let question = dataQuizClone.find(item => +item.questionId === +qId); //react doesn't merge state
        if (question && question.answers){
            question.answers = question.answers.map(item => {
                if(+item.id === +aId){
                    item.isSelected = !item.isSelected; //set ngược giá trị boolean (false->true, true->false)
                }
                return item;
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +qId)
        if(index > -1){
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }
    return(
        <div className="detail-quiz-container container">
            <div className="left-content">
                <div className="title">
                   Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr/>
                <div className="q-body">
                    <img/>
                </div>
                <div className="q-content">
                    <Question 
                    index={index}
                    data={dataQuiz[index]}
                    handleCheckBox={handleCheckBox}/>
                </div>
                <div className="footer ">
                    <button className="btn btn-secondary" onClick={()=>handlePrev()}>Prev</button>
                    <button className="btn btn-primary" onClick={()=>handleNext()}>Next</button>
                    <button className="btn btn-warning" onClick={()=>handleFinish()}>Finish</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
            <ModalResult
            show={isShowModalResult}
            setShow={setIsShowModalResult}
            dataModalResult={dataModalResult}
            />
        </div>
    )
} 
export default DetailQuiz