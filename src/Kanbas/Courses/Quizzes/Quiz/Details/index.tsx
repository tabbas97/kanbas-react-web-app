import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { QuizInterface } from "../../client";
import * as client from "../../client";

export default function QuizDetail({quiz} : {quiz : QuizInterface}) {

    const navigate = useNavigate();
    const { courseId, quizId } = useParams();

    const getDateString = (date: Date) => {
        const isoString = date.toISOString();

    }

    const getDefaultDate = () => {
        return new Date().toLocaleDateString();
    }

    const handle_SaveQuiz = async (quiz: QuizInterface) => {
        // console.log("QUIZ DETAILS: Handle Save Quiz : ", quiz.availableDate.toISOString());
        // console.log("QUIZ DETAILS: Handle Save Quiz : ", quiz.dueDate);
        // console.log("QUIZ DETAILS: Handle Save Quiz : ", quiz.untilDate);
        // await client.updateQuiz(quiz).then(() => {
            // navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
        // });
        console.log("QUIZ NAVIGATING BACK: ", quiz);
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    }

    const handle_EditQuiz = async (quiz: QuizInterface) => {
        // console.log(quiz);
        // console.log(courseId);
        // console.log(quiz);
        console.log("QUIZ DETAILS: Handle Edit Quiz : ", quiz.availableDate);
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Edit`);
    }

    const handle_PublishQuiz = async (quiz: QuizInterface) => {
        const updatedQuiz = {
            ...quiz,
            published: true
        };
        await client.updateQuiz(updatedQuiz).then(() => {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
        });
    }

    const handle_UnPublishQuiz = async (quiz: QuizInterface) => {
        const updatedQuiz = {
            ...quiz,
            published: false
        };
        await client.updateQuiz(updatedQuiz).then(() => {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
        });
    }

    console.log("Quiz Detail", quiz);
    console.log("Quiz Detail", quiz.availableDate);
    // console.log("QUIZDETAIL MAIN : ", new Date().toLocaleDateString());
    console.log("QUIZDETAIL MAIN -- : ", new Date(quiz.availableDate).toISOString().split("T")[0]);
    // console.log("QUIZDETAIL MAIN : ", quiz.dueDate);
    // console.log("QUIZDETAIL MAIN : ", new Date(quiz.dueDate));
    // console.log("QUIZDETAIL MAIN : ", quiz.untilDate);
    // console.log("QUIZDETAIL MAIN : ", new Date(quiz.untilDate));

    return (
        <div className="container">
            <div>
                <h2>Quiz Details</h2>
            </div>
            <div className="row btn-row pub-button-bar">
                <button className="btn btn-primary" onClick={() => handle_SaveQuiz(quiz)}>Save</button>
                <button className="btn btn-primary" onClick={() => handle_EditQuiz(quiz)}>Edit</button>
                {quiz.published ? (
                    <button className="btn btn-primary" onClick={() => handle_UnPublishQuiz(quiz)}>Unpublish</button>
                ) : (
                    <button className="btn btn-primary" onClick={() => handle_PublishQuiz(quiz)}>Publish</button>
                )}
            </div>
            <div className="row">
                <div className="col-12">
                    <form>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="qTitle">Title</label>
                            <input id="qTitle" type="text" className="form-control-plaintext" value={quiz.title} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="qType">Quiz Type</label>
                            <input id="qType" type="text" className="form-control-plaintext" value={quiz.quizType} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="qPoints">Points</label>
                            <input id="qPoints" type="text" className="form-control-plaintext" value={quiz.points} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="answerShuffle">Shuffle Answers</label>
                            <input id="answerShuffle" type="checkbox" className="form-control-plaintext" checked={quiz.shuffleAnswers} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="assGroup">Assignment Group</label>
                            <input id="assGroup" type="text" className="form-control-plaintext" value={quiz.assignmentGroup} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="tLimit">Time Limit</label>
                            <input id="tLimit" type="text" className="form-control-plaintext" value={quiz.timeLimit} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="mulAttempts">Multiple Attempts</label>
                            <input id="mulAttempts" type="checkbox" className="form-control-plaintext" checked={quiz.multipleAttempts} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="showCorrAnswers">Show Correct Answers</label>
                            <input id="showCorrAnswers" type="checkbox" className="form-control-plaintext" checked={quiz.showCorrectAnswers} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="qAccCode">Access Code</label>
                            <input id="qAccCode" type="text" className="form-control-plaintext" value={quiz.accessCode} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="qOQAT">One Question At A Time</label>
                            <input id="qOQAT" type="checkbox" className="form-control-plaintext" checked={quiz.oneQuestionAtATime} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="qWCamReq">Webcam Required</label>
                            <input id="qWCamReq" type="checkbox" className="form-control-plaintext" checked={quiz.webcamRequired} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="qLQAA">Lock Questions After Answering</label>
                            <input id="qLQAA" type="checkbox" className="form-control-plaintext" checked={quiz.lockQuestionsAfterAnswering} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="qDueDate">Due Date</label>
                            <input id="qDueDate" type="date" className="form-control-plaintext" value={new Date(quiz.dueDate).toLocaleDateString()} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="qAvDate">Available Date</label>
                            <input id="qAvDate" type="date" className="form-control-plaintext" value={new Date(quiz.availableDate).toISOString().split("T")[0]} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="qUntil">Until Date</label>
                            <input id="qUntil" type="date" className="form-control-plaintext" value={new Date(quiz.untilDate).toDateString()} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label text-end col-lg-4 col-sm-4" htmlFor="qPublished">Published</label>
                            <input id="qPublished" type="checkbox" className="form-control-plaintext" checked={quiz.published} readOnly />
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {/* Save */}
                    <button className="btn btn-primary" onClick={() => handle_SaveQuiz(quiz)}>Save</button>
                    {/* Preview */}
                    <button className="btn btn-primary" onClick={() => navigate(
                        `/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview`
                    )}>Preview</button>
                </div>
            </div>
        </div>
    );
}
