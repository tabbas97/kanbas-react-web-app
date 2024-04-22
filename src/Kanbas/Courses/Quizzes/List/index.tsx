import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { QuizInterface } from "../client";
import * as client from "../client";
import { FaBan, FaCalendar, FaCheckCircle, FaEllipsisV, FaRocket } from "react-icons/fa";

export default function QuizzesList() {
    const  {courseId} = useParams();
    const nowDate = new Date();
    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState<QuizInterface[]>([]);
    const [activeQuiz, setActiveQuiz] = useState<QuizInterface>();
    const [showMenu, setShowMenu] = useState(false);

    const defaultDate = new Date().getDate();

    console.log("Quiz Default Date : ", defaultDate);

    const handleNewQuiz = () => {
        const newQuiz = {
            title: "New Quiz",
            quizType: "Graded Quiz",
            points: 0,
            assignmentGroup: "Quizzes",
            shuffleAnswers: true,
            timeLimit: 20,
            multipleAttempts: false,
            showCorrectAnswers: false,
            accessCode: "",
            oneQuestionAtATime: true,
            webcamRequired: false,
            lockQuestionsAfterAnswering: false,
            dueDate: defaultDate,
            availableDate: defaultDate,
            untilDate: defaultDate,
            courseId: courseId,
            published: false, 
        }
        
        // Can't force type -> id missing
        client.createQuiz(newQuiz).then((quiz) => {
            navigate(`/Kanbas/courses/${courseId}/quizzes/${quiz._id}/Edit`);
        });
    };

    const handleEditQuiz = (quiz: QuizInterface) => {
        navigate(`/Kanbas/courses/${courseId}/quizzes/${quiz._id}/Edit`);
    }

    const handleDeleteQuiz = (quiz: QuizInterface) => {
        // Get confirmation from user
        const userConf = window.confirm("Are you sure you want to delete this quiz?");

        if (userConf) {   
            client.deleteQuiz(quiz).then(() => {
                setQuizzes(quizzes.filter((q) => q._id !== quiz._id));
            });
        } 
        // else do nothing
    }

    const handlePublishQuiz = (quiz: QuizInterface) => {
        const userConf = window.confirm("Are you sure you want to publish this quiz?");

        if (userConf) {
            client.updateQuiz({...quiz, published: true}).then((updatedQuiz) => {
                setQuizzes(quizzes.map((q) => q._id === updatedQuiz._id ? updatedQuiz : q));
            });
        }
    }

    const toggleMenu = (quiz: QuizInterface) => {
        setShowMenu(!showMenu);
        setActiveQuiz(quiz);
    }

    useEffect(() => {
        client.findQuizzesByCourseId(courseId ?? "").then((quizzes) => {
            setQuizzes(quizzes);
        });
    }
    , [courseId]);

    return (
        <div className="container">
            <h1>Quizzes</h1>
            <button className="btn btn-primary" onClick={handleNewQuiz}>New Quiz</button>
            {quizzes.length === 0 ? <p>No quizzes found</p> : 
                (
                <div className="container">
                    <ul className="list-group">
                        {quizzes.map((quiz) => {
                            return (
                                <li key={quiz._id} className="list-group-item align-items-center">
                                    <div className="row">
                                        <div className="col-1">
                                            <FaEllipsisV className="me-2" onClick={() => toggleMenu(quiz)}/>
                                        </div>
                                        <div className="col-11">
                                            <div className="row">
                                                <div className="col-11"> 
                                                    { quiz.published === true ? (
                                                            <FaRocket className="me-2 text-success" />
                                                        ) : (
                                                            <FaRocket className="me-2 text-secondary" />
                                                    )}
                                                    
                                                    <Link className="me-auto" to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>{quiz.title}</Link>
                                                </div>
                                                <div className="col-1">
                                                    { quiz.published === true ? (
                                                                <FaCheckCircle className="text-success"/>
                                                            ) : (
                                                                <FaBan className="text-danger"/>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                {new Date(quiz.availableDate) > nowDate ? (
                                                        ("Not available until " + new Date(quiz.availableDate).toLocaleDateString())
                                                    ) : new Date(quiz.dueDate) > nowDate ? (
                                                        "Available"
                                                    ) : (
                                                        "Closed"
                                                )}
                                                </div>
                                                <div className="col-4">
                                                    <FaCalendar className="text-secondary"/>
                                                    {" Due Date: " + new Date(quiz.dueDate).toLocaleDateString()}
                                                </div>
                                                <div className="col-4">
                                                    {quiz.points + " pts" + " | 0 Questions"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                {showMenu && activeQuiz === quiz && (
                                                    <div className="ms-auto">
                                                        <button className="btn btn-sm btn-success me-2" onClick={() => handleEditQuiz(quiz)}>
                                                            Edit
                                                        </button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteQuiz(quiz)}>
                                                            Delete
                                                        </button>
                                                        { quiz.published === true ? (
                                                                <button className="btn btn-sm btn-warning me-2" onClick={() => handlePublishQuiz(quiz)}>
                                                                    Unpublish
                                                                </button>
                                                            ) : (
                                                                <button className="btn btn-sm btn-info me-2" onClick={() => handlePublishQuiz(quiz)}>
                                                                    Publish
                                                                </button>
                                                        )}
                                                    </div>
                                                )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                )
            }
        </div>
    );
}
