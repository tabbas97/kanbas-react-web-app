import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { QuizInterface } from "../../client";
import * as client from "../../client";

export default function QuizDetail({ quiz }: { quiz: QuizInterface }) {
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();

  const getDateString = (date: Date) => {
    const isoString = date.toISOString();
  };

  const getDefaultDate = () => {
    return new Date().toLocaleDateString();
  };

  const handle_SaveQuiz = async () => {
    console.log("Navigating out");
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };

  const handle_EditQuiz = async (quiz: QuizInterface) => {
    // console.log(quiz);
    // console.log(courseId);
    // console.log(quiz);
    console.log("QUIZ DETAILS: Handle Edit Quiz : ", quiz.availableDate);
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Edit`);
  };

  const handle_PublishQuiz = async (quiz: QuizInterface) => {
    const updatedQuiz = {
      ...quiz,
      published: true,
    };
    console.log("Updated quiz : ", updatedQuiz);
    await client.updateQuiz(updatedQuiz).then(() => {
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
    });
  };

  const handle_SaveAndPublishQuiz = async (quiz: QuizInterface) => {
    handle_PublishQuiz(quiz);
    handle_SaveQuiz();
  };

  const handle_UnPublishQuiz = async (quiz: QuizInterface) => {
    quiz.published = false;
    const updatedQuiz = {
      ...quiz,
      published: false,
    };
    await client.updateQuiz(updatedQuiz).then(() => {
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
    });
  };

  console.log("Quiz Detail", quiz);
  console.log("Quiz Detail", quiz.availableDate);
  // console.log("QUIZDETAIL MAIN : ", new Date().toLocaleDateString());
  console.log(
    "QUIZDETAIL MAIN -- : ",
    new Date(quiz.availableDate).toISOString().split("T")[0]
  );
  // console.log("QUIZDETAIL MAIN : ", quiz.dueDate);
  // console.log("QUIZDETAIL MAIN : ", new Date(quiz.dueDate));
  // console.log("QUIZDETAIL MAIN : ", quiz.untilDate);
  // console.log("QUIZDETAIL MAIN : ", new Date(quiz.untilDate));

  return (
    <div className="container">
      <div className="m-2">
        <h2>Quiz Details</h2>
      </div>
      <div className="row btn-row pub-button-bar col-lg-6">
        <button
          className="col btn btn-primary m-2"
          onClick={() => handle_SaveQuiz}
        >
          Save
        </button>
        <button
          className="col btn btn-primary m-2"
          onClick={() => handle_EditQuiz(quiz)}
        >
          Edit
        </button>
        {quiz.published ? (
          <button
            className="col btn btn-primary m-2"
            onClick={() => handle_UnPublishQuiz(quiz)}
          >
            Unpublish
          </button>
        ) : (
          <button
            className="col btn btn-primary m-2"
            onClick={() => handle_PublishQuiz(quiz)}
          >
            Publish
          </button>
        )}
      </div>
      <div className="row">
        <div className="col">
          <form>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="qTitle">Title</label></div>
              <div className="col"><input id="qTitle" type="text" className="form-control-plaintext" value={quiz.title} readOnly /></div>
            </div>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="qType">Quiz Type</label></div>
              <div className="col"><input id="qType" type="text" className="form-control-plaintext" value={quiz.quizType} readOnly /></div>
            </div>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="qPoints">Points</label></div>
              <div className="col"><input id="qPoints" type="text" className="form-control-plaintext" value={quiz.points} readOnly /></div>
            </div>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="answerShuffle">Shuffle Answers</label></div>
              <div className="col"><input id="answerShuffle" type="checkbox" className="form-control-plaintext" checked={quiz.shuffleAnswers} readOnly /></div>
            </div>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="assGroup">Assignment Group</label></div>
              <div className="col"><input id="assGroup" type="text" className="form-control-plaintext" value={quiz.assignmentGroup} readOnly /></div>
            </div>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="tLimit">Time Limit</label></div>
              <div className="col"><input id="tLimit" type="text" className="form-control-plaintext" value={quiz.timeLimit} readOnly /></div>
            </div>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="mulAttempts">Multiple Attempts</label></div>
              <div className="col"><input id="mulAttempts" type="checkbox" className="form-control-plaintext" checked={quiz.multipleAttempts} readOnly /></div>
            </div>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="showCorrAnswers">Show Correct Answers</label></div>
              <div className="col"><input id="showCorrAnswers" type="checkbox" className="form-control-plaintext" checked={quiz.showCorrectAnswers} readOnly /></div>
            </div>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="qAccCode">Access Code</label></div>
              <div className="col"><input id="qAccCode" type="text" className="form-control-plaintext" value={quiz.accessCode} readOnly /></div>
            </div>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="qOQAT">One Question At A Time</label></div>
              <div className="col"><input id="qOQAT" type="checkbox" className="form-control-plaintext" checked={quiz.oneQuestionAtATime} readOnly /></div>
            </div>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="qWCamReq">Webcam Required</label></div>
              <div className="col"><input id="qWCamReq" type="checkbox" className="form-control-plaintext" checked={quiz.webcamRequired} readOnly /></div>
            </div>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="qLQAA">Lock Questions After Answering</label></div>
              <div className="col"><input id="qLQAA" type="checkbox" className="form-control-plaintext" checked={quiz.lockQuestionsAfterAnswering} readOnly /></div>
            </div>
            <div className="form-group row mt-2">
              <div className="col">
                <label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="qDueDate">Due Date</label>
              </div>
              <div className="col">
                <input id="qDueDate" type="date" className="form-control-plaintext" value={new Date(quiz.dueDate).toLocaleDateString()} readOnly />
              </div>
            </div>
            <div className="form-group row mt-2">
              <div className="col">
                <label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="qAvDate">Available Date</label>
              </div>
              <div className="col">
                <input id="qAvDate" type="date" className="form-control-plaintext" value={new Date(quiz.availableDate).toISOString().split("T")[0]} readOnly />
              </div>
            </div>
            <div className="form-group row mt-2">
              <div className="col">
                <label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="qUntil">Until Date</label>
              </div>
              <div className="col">
                <input id="qUntil" type="date" className="form-control-plaintext" value={new Date(quiz.untilDate).toDateString()} readOnly />
              </div>
            </div>
            <div className="form-group row mt-2">
              <div className="col"><label className="col-form-label text-end col-lg-7 col-sm-4" htmlFor="qPublished">Published</label></div>
              <div className="col"><input id="qPublished" type="checkbox" className="form-control-plaintext" checked={quiz.published} readOnly /></div>
            </div>
          </form>
        </div>
      </div>
      <div className="row btn-row pub-button-bar col-lg-6">
        <button className="btn btn-primary col m-2" onClick={() => handle_SaveQuiz()}> Save </button>
        <button className="btn btn-primary col m-2" onClick={() => handle_SaveAndPublishQuiz(quiz)}> Save & Publish </button>
        <button className="btn btn-primary col m-2" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Preview`)}> Preview </button>
      </div>
    </div>
  );
}
