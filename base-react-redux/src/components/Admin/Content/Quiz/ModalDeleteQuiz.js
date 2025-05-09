import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiService";

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDeleteQuiz, fetchQuiz } = props;
    const handleClose = () => setShow(false);
    const handleDeleteQuiz = async (quizId) => {
        let resDelete = await deleteQuiz(quizId);
        if (resDelete && resDelete.EC === 0) {
            // setListQuiz(prev => prev.filter((q)=> q.id !== quizId));
            fetchQuiz();
            toast.success(resDelete.EM);
            handleClose();
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete Quiz  
                    <b> ID: {dataDeleteQuiz}</b> ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleDeleteQuiz(dataDeleteQuiz)}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteQuiz;
