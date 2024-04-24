import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { QuizInterface, IQuestion } from "../../client";
import * as client from "../../client";

import { setQuestion, setQuestions } from "../reducer";
import { KanbasState } from "../../../../store";

export default function QuestionEditor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId, quizId, questId } = useParams();
  const questions = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(setQuestion({ ...question, [name]: value }));
  };

  const handleAddChoice = () => {
    const updatedChoices = [...question.choices, ""];
    dispatch(setQuestion({ ...question, choices: updatedChoices }));
  };

  const handleRemoveChoice = (index: number) => {
    const updatedChoices = question.choices.filter(
      (choice: any, i: number) => i !== index
    );
    dispatch(setQuestion({ ...question, choices: updatedChoices }));
  };

  const handleSelectCorrectAnswer = (index: number) => {
    dispatch(setQuestion({ ...question, correctAnswerIndex: index }));
  };

  const handleChangeQuestionType = (e: string) => {
    // Check if the question type is being changed
    if (question.questionType === e) return; // do nothing since the question type is not being changed

    const userConf = window.confirm(
      "Changing the question type will effectively reset the question. Are you sure?"
    );
    userConf &&
      dispatch(
        setQuestion({
          ...question,
          questionType: e,
          choices: e === "TRUEFALSE" ? ["True", "False"] : [],
          correctAnswerIndex: -1,
        })
      );
  };

  const handleSubmit = async () => {
    await client.updateQuestion(question).then((status) => {
      dispatch(
        setQuestions(
          questions.map((q: any) => (q._id === question._id ? question : q))
        )
      );
      navigate(`/Kanbas/courses/${courseId}/quizzes/${quizId}/Edit`);
    });
  };
  
  const handleCancel = async () => {
    navigate(`/Kanbas/courses/${courseId}/quizzes/${quizId}/Edit`);
  }

  return (
    <div className="container">
      <h2>Edit</h2>
      <div className="row">
        <div className="col">
          <form>
            <div className="row form-group">
              <label htmlFor="qtype">Question Type</label>
              <select
                className="form-control"
                name="qtype"
                value={question.questionType}
                onChange={(e) => handleChangeQuestionType(e.target.value)}
              >
                <option value="MULTI">Multiple Choice</option>
                <option value="TRUEFALSE">True/False</option>
                <option value="BLANKS">Fill Blank</option>
              </select>
            </div>
            <div className="row form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                id="title"
                value={question.title}
                onChange={handleChange}
              />
            </div>
            <div className="row form-group">
              <label htmlFor="points">Points</label>
              <input
                type="text"
                className="form-control"
                name="points"
                id="points"
                value={question.points}
                onChange={handleChange}
              />
            </div>
            <div className="row form-group">
              <label htmlFor="question">Question</label>
              <textarea
                className="form-control"
                name="question"
                id="question"
                value={question.question}
                onChange={handleChange}
              />
            </div>
            <div className="row form-group">
              <label>Choices</label>
              <ul className="list-group">
                {question.choices.map((choice: any, index: number) => (
                  <li key={index} className="list-group-item">
                    <div className="container">
                      <div className="row">
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control"
                            id="choice"
                            placeholder="Insert answer here"
                            value={choice}
                            onChange={(e) => {
                              const updatedChoices = [...question.choices];
                              updatedChoices[index] = e.target.value;
                              dispatch(
                                setQuestion({
                                  ...question,
                                  choices: updatedChoices,
                                })
                              );
                            }}
                          />
                        </div>
                        {question.questionType !== "BLANKS" && (
                          <div className="col-2 form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              id={`correct${index}`}
                              name="correctAnswer"
                              checked={question.correctAnswerIndex === index}
                              onChange={() => handleSelectCorrectAnswer(index)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`correct${index}`}
                            >
                              Correct?
                            </label>
                          </div>
                        )}
                        <div className="col-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleRemoveChoice(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" onClick={handleSubmit}>
            {" "}
            Save{" "}
          </button>
          <button className="btn btn-primary" onClick={handleAddChoice}>
            {" "}
            Add Option{" "}
          </button>
          <button className="btn btn-primary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
