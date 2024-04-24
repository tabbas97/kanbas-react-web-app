import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { QuizInterface, IQuestion } from "../../client";
import * as client from "../../client";
import {
    addQuestion,
    deleteQuestion,
    updateQuestion,
    setQuestion,
    setQuestions
} from "../reducer";
import { KanbasState } from "../../../../store";
import { FaBan, FaCalendar, FaCheckCircle, FaEllipsisV, FaEdit } from "react-icons/fa";

export default function QuizEditor({quiz, updateUpstream} : {quiz: QuizInterface, updateUpstream : any}){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const { courseId, quizId } = useParams();
    const [activeTab, setActiveTab] = useState("details"); // details, questions
    const questions = useSelector((state: KanbasState) => state.questionsReducer.questions);
    const activeQuestion = useSelector((state: KanbasState) => state.questionsReducer.question);

    const totalPoints = questions.reduce((acc, question) => acc + parseInt(question.points), 0);

    const handleSave = async () => {
        console.log("Saving Quiz");
        console.log("Old Quiz Info");
        console.log(quiz);
        const updatedQuizInfo = {...quiz,  points: totalPoints};
        console.log("Updated Quiz Info");
        console.log(updatedQuizInfo);
        
        await client.updateQuiz(updatedQuizInfo).then((updatedQuiz) => {
            updateUpstream(updatedQuiz);
            console.log("Upstream update complete");
        });
        navigate(`/Kanbas/courses/${courseId}/quizzes/${quiz._id}`);
    };

    const handleAddNewQuestion = async () => {
        const newQuestion = {
            quizId: quiz._id,
            questionType: "MULTI",
            title: "New Question",
            points: "0",
            question: "",
            choices: [],
            correctAnswerIndex: -1
        };
        await client.createQuestion(newQuestion).then((question) => {
            dispatch(setQuestions([...questions, question]));
            dispatch(setQuestion(question));
            navigate(`/Kanbas/courses/${courseId}/quizzes/${quizId}/questions/${question._id}/Edit`);
        });
    };

    const handleUpdateQuestion = async (question: IQuestion) => {
        dispatch(setQuestion(question));
        navigate(`/Kanbas/courses/${courseId}/quizzes/${quizId}/questions/${question._id}/Edit`);
    };

    const handleDeleteQuestion = async (question: IQuestion) => {
        const userconf = window.confirm("Are you sure you want to delete this question?");
        if(userconf){
            await client.deleteQuestion(question).then(() => {
                dispatch(deleteQuestion(question));
                dispatch(setQuestions(questions.filter(q => q._id !== question._id)));
            });
        }
    };

    useEffect(() => {
        setLoading(true);
        console.log("Finding Questions by Quiz ID");
        client.findQuestionsByQuizId(quiz._id)
        .then((questions) => {dispatch(setQuestions(questions)); setLoading(false);})
        .catch((err) => {
            if (err.response.status === 404) {
                dispatch(setQuestions([]));
            } else {
                console.error(err);
                setLoading(false);
            }
        });
    }, [quizId, questions]);

    return (
        <div className="container">
            <h2>Edit Quiz</h2>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "details" ? "active" : ""}`} onClick={() => setActiveTab("details")}>Details</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "questions" ? "active" : ""}`} onClick={() => setActiveTab("questions")}>Questions</a>
                </li>
            </ul>
            {activeTab === 'details' && (
                <form>
                    <div className="form-group row m-2">
                        <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="title">Title</label></div>
                        <div className="col"><input type="text" className="form-control" id="title" value={quiz.title} onChange={(e) => updateUpstream({...quiz, title: e.target.value})}/></div>
                    </div>
                    <div className="form-group row m-2">
                        <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="points">Points</label></div>
                        <div className="col"><input type="number" className="form-control" id="points" placeholder="0" value={totalPoints} readOnly/></div>
                    </div>
                    <div className="form-group row m-2">
                        <div className="col m-2"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="quizType">Quiz Type</label></div>
                        <div className="col m-2"><select className="form-control" id="quizType" value={quiz.quizType} onChange={(e) => updateUpstream({...quiz, quizType: e.target.value})}>
                            <option value="Graded Quiz">Graded Quiz</option>
                            <option value="Practice Quiz">Practice Quiz</option>
                            <option value="Graded Survey">Graded Survey</option>
                            <option value="Ungraded Survey">Ungraded Survey</option>
                        </select> </div>
                    </div>
                    <div className="form-group row m-2">
                        <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="selectedAssignmentGroup">Assignment Group</label></div>
                        <div className="col"><select className="form-control" id="selectedAssignmentGroup" value={quiz.assignmentGroup} onChange={(e) => updateUpstream({...quiz, assignmentGroup: e.target.value})}>
                            <option value="Quizzes">Quizzes</option>
                            <option value="Exams">Exams</option>
                            <option value="Assignments">Assignments</option>
                            <option value="Projects">Projects</option>
                        </select>
                        </div>
                    </div>
                    <div className="form-check m-2 row d-flex justify-content-between">
                        <div className="col">
                            <label className="form-check-label" htmlFor="shuffleAnswersCheck"> Shuffle Answers </label>
                            <input className="form-check-input" type="checkbox" value="" id="shuffleAnswersCheck" checked={quiz.shuffleAnswers} onChange={(e) => updateUpstream({ ...quiz, shuffleAnswers: e.target.checked })}/>
                        </div>
                    </div>
                    <div className="form-group row m-2">
                        <div className="col"><label htmlFor="quizTime">Time Limit</label></div>
                        <div className="col"><input 
                            type="number" 
                            className="form-control" 
                            id="quizTime" 
                            placeholder="0" 
                            value={quiz.timeLimit} 
                            onChange={(e) => updateUpstream({ ...quiz, timeLimit: parseInt(e.target.value) || -1 })} />
                            </div>
                    </div>
                    <div className="form-check row m-2">
                        <div className="col">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                value="" 
                                id="multipleAttemptsCheck" 
                                checked={quiz.multipleAttempts} 
                                onChange={(e) => updateUpstream({ ...quiz, multipleAttempts: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="multipleAttemptsCheck">
                                Multiple Attempts?
                            </label>
                        </div>
                    </div>
                    <div className="form-check row m-2">
                        <div className="col">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                value="" 
                                id="showCorrectCheck" 
                                checked={quiz.showCorrectAnswers} 
                                onChange={(e) => updateUpstream({ ...quiz, showCorrectAnswers: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="showCorrectCheck">
                                Show Correct Answers?
                            </label>
                        </div>
                    </div>
                    <div className="form-group row m-2">
                        <div className="col">
                            <label htmlFor="accessCode">Access Code</label>
                        </div>
                        <div className="col">
                            <input 
                                    type="text" 
                                    className="form-control" 
                                    id="accessCode" 
                                    placeholder="(Optional) Enter access code" 
                                    value={quiz.accessCode} 
                                    onChange={(e) => updateUpstream({ ...quiz, accessCode: e.target.value })} 
                                />
                        </div>
                    </div>
                    <div className="form-check row m-2">
                        <div className="col">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                value="" 
                                id="oneQuestionCheck" 
                                checked={quiz.oneQuestionAtATime} 
                                onChange={(e) => updateUpstream({ ...quiz, oneQuestionAtATime: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="oneQuestionCheck">
                                One Question at a Time?
                            </label>
                        </div>
                    </div>
                    <div className="form-check row m-2">
                        <div className="col">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                value="" 
                                id="webcamRequiredCheck" 
                                checked={quiz.webcamRequired} 
                                onChange={(e) => updateUpstream({ ...quiz, webcamRequired: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="webcamRequiredCheck">
                                Webcam Required?
                            </label>
                        </div>
                    </div>
                    <div className="form-check row m-2">
                        <div className="col">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                value="" 
                                id="lockQuestionCheck" 
                                checked={quiz.lockQuestionsAfterAnswering} 
                                onChange={(e) => updateUpstream({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="lockQuestionCheck">
                                Lock Questions after Answering?
                            </label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col col-form-label text-end"><label className="" htmlFor="dueDate">Due Date</label></div>
                        <div className="col">
                            <input 
                                type="date" 
                                className="form-control" 
                                id="dueDate" 
                                value={new Date(quiz.dueDate).toISOString().split('T')[0]}
                                onChange={(e) => updateUpstream({ ...quiz, dueDate: new Date(e.target.value) })} 
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col col-form-label text-end"><label htmlFor="availableDate">Available Date</label></div>
                        <div className="col">
                            <input 
                                type="date" 
                                className="form-control" 
                                id="availableDate" 
                                value={new Date(quiz.availableDate).toISOString().split('T')[0]}
                                onChange={(e) => {
                                    console.log("Available Date", e.target.value);
                                    console.log("Available Date", new Date(e.target.value));
                                    updateUpstream({ ...quiz, availableDate: new Date(e.target.value) });
                                }} 
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col col-form-label text-end"><label htmlFor="untilDate">Until Date</label></div>
                        <div className="col">
                            <input 
                                type="date" 
                                className="form-control" 
                                id="untilDate" 
                                value={new Date (quiz.untilDate).toISOString().split('T')[0]}
                                onChange={(e) => updateUpstream({ ...quiz, untilDate: new Date(e.target.value) })} 
                            />
                        </div>
                    </div>
                </form>
            )}
            {activeTab === 'questions' && (
                <div>
                    <button className="btn btn-primary mt-4 mb-4" onClick={handleAddNewQuestion}>Add New Question</button>
                    {questions.length === 0 && (
                        <div className="alert alert-warning" role="alert">
                            No questions found. Click the button above to add a new question.
                        </div>
                    )}
                    {questions.length > 0 && (
                        <div className="container">
                            <ul className="list-group">
                                {questions.map((question) => (
                                    <li className="list-group-item" key={question._id} onClick={() => dispatch(setQuestion(question))}>
                                        <div className="row">
                                            <div className="col">
                                                <h4>{question.title}</h4>
                                            </div>
                                            <div className="col-auto">
                                                <h4>{question.points} points</h4>
                                            </div>
                                            <div className="col-auto">
                                                <button className="btn btn-primary m-2" onClick={() => handleUpdateQuestion(question)}><FaEdit /></button>
                                                <button className="btn btn-danger m-2" onClick={() => handleDeleteQuestion(question)}><FaBan /></button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <p>Question : {question.question}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            <div className="row btn-row pub-button-bar col-lg-5">
                <button className="btn btn-primary col m-2" onClick={handleSave}>Save</button>
                <button className="btn btn-primary col m-2" onClick={() => navigate(`/Kanbas/courses/${courseId}/quizzes/${quizId}/preview`)}>Preview Quiz</button>
            </div>
        </div>
    );
}