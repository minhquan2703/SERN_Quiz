
import _ from "lodash";
const Question = (props) => {
    const { data, index } = props;
    if (_.isEmpty(data)) {
        return <></>;
    }
    const handleCheckedBox = (event, aId, qId) =>{
        console.log('data props: ',aId, qId)
        // console.log(`a${data.answers[index].id} - q${data.questionId}`)
        console.log(event.target.checked)
        props.handleCheckBox(aId, qId);
    }
    return (
        <>
            {data.image 
                ?
                <div className="q-image mx-auto">
                    <img src={`data:image/png;base64,${data.image}`} />
                </div>
                :
                <div className="q-image mx-auto"></div>
            }
            <div className="question">
                Question {+index + 1}: {data.questionDescription} ?
            </div>
            <div className="answers">
                {data.answers.map((answer, index) => {
                    return (
                        <div className="a-child" key={`answer-${index}`}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={answer.isSelected} //answer.isSelected === true ? true : false
                                    onChange={(event)=>handleCheckedBox(event, answer.id, data.questionId)}/>
                                <label className="form-check-label">{answer.description}</label>
                            </div>
                        </div>
                    );})}
            </div>
        </>
    );
};
export default Question;
