import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { QuizInterface } from "../client";
import * as client from "../client";

import { setQuestion, setQuestions } from "./reducer";
import { KanbasState } from "../../../store";

import QuestionEditor from "./QuestionEditor";
import QuizPreview from "./QuizPreview";
import QuizDetail from "./Details";
import QuizEditor from "./Editor";

export default function Quiz() {
    const dispatch = useDispatch();

    const { courseId, quizId } = useParams<{courseId: string, quizId : string}>();
    const [quiz, setQuiz] = useState<QuizInterface>(
        {
            _id: "",
            title: "",
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
            dueDate: new Date(Date.now()),
            availableDate: new Date(Date.now()),
            untilDate: new Date(Date.now()),
            courseId: courseId || "",
            published: false,
        }
    );

    console.log("Quiz Default on STart", quiz);

    const questions = useSelector((state: KanbasState) => state.questionsReducer.questions);

    useEffect(() => {
        client.findQuizById(quizId).then((data) => {
            setQuiz(data);
            client.findQuestionsByQuizId(data._id).then((quests) => {
                dispatch(setQuestions(quests));
            });
        });
    }, [quizId]);

        // console.log("Quiz Index", quiz, questions);

    return (
        <div className="container">
            <h2>Quiz : {quiz.title}</h2>
            <Routes>
                <Route path="/" element={<QuizDetail quiz={quiz}/>} />
                <Route path="Edit" element={<QuizEditor quiz={quiz} updateUpstream={setQuiz}/>} />
                <Route path="/questions/:questId/Edit" element={<QuestionEditor />} />
                <Route path="Preview" element={<QuizPreview quiz={quiz} questions={questions} />} />
            </Routes>
        </div>
    );
};
