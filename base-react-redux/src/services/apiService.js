import axios from '../utils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) =>{
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username || "");
    data.append('role',role );
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
}
const getAllUsers= () => {
    return axios.get('api/v1/participant/all');
}

const putUpdateUser = (id, username, role, image) =>{
    const data = new FormData();
    data.append('id', id);
    data.append('username', username || "");
    data.append('role',role );
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
}

const deleteUser= (userId) => {
    return axios.delete('api/v1/participant', { data: {id: userId} });
}
const getUsersWithPaginate= (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, {email, password, delay:1500});
}

const postRegister = (email, username, password) => {
    return axios.post(`api/v1/register`, {email, username, password});
}
const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}
const getDataQuiz = (id) =>{
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}
const postSubmitQuiz = (data) =>{
    return axios.post(`api/v1/quiz-submit`, {...data}); //post raw data
}
const postCreateNewQuiz = (description, name, difficulty, quizImage) =>{
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage',quizImage );
    return axios.post('api/v1/quiz', data);
}
const getAllQuizForAdmin = () =>{
    return axios.get(`api/v1/quiz/all`);
}
const deleteQuiz = (quizId) =>{
    return axios.delete(`api/v1/quiz/${quizId}`)
}
const putUpdateQuiz = (id, description, name, type, image) =>{ //form data
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name',name);
    data.append('difficulty', type);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data);
}
const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) =>{
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage',questionImage);
    return axios.post('api/v1/question', data);
}
const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) =>{ //urlencoded
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}
const postAssignQuiz = (quizId, userId) =>{
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId } );
}
const getQuizWithQA = (quizId) =>{
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);

}
export { 
     postLogin, postRegister, postCreateNewUser, postSubmitQuiz, postCreateNewQuiz, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion, postAssignQuiz             //method Post-C
    , getUsersWithPaginate, getAllUsers, getQuizByUser, getDataQuiz, getAllQuizForAdmin, getQuizWithQA                     //method Get-R
    , putUpdateUser, putUpdateQuiz                                         //method Put-U
    , deleteUser, deleteQuiz                                            //method Delete-D
}