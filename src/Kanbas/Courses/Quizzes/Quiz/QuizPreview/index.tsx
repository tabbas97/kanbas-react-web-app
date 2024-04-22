import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizInterface, IQuestion } from "../../client";

export default function QuizPreview({
  quiz,
  questions,
}: {
  quiz: QuizInterface;
  questions: IQuestion[];
}) {
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();
  const [activeQuestion, setactiveQuestion] = useState(0);

  return (
    <div className="container">
      <h2>Quiz Preview : {quiz.title}</h2>

      {quiz.oneQuestionAtATime && questions.length > 0 && (
        <div>
          <div className="card">
            <div className="card-header">
              <div className="row">
                <h3 className="col-8">Question - {activeQuestion + 1}</h3>
                <h4 className="col-4 text-end">
                  {questions[activeQuestion].title}
                </h4>
              </div>
            </div>
            <div className="card-body">
              {questions !== null && (
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <p>{questions[activeQuestion].question}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <ul className="list-group">
                        {questions[activeQuestion].choices.map(
                          (choice, index) => (
                            <li key={index} className="list-group-item">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="choice"
                                  id={index.toString()}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={index.toString()}
                                >
                                  {choice}
                                </label>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={() => setactiveQuestion(activeQuestion - 1)}
                  disabled={activeQuestion === 0}
                >
                  Previous
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={() => setactiveQuestion(activeQuestion + 1)}
                  disabled={activeQuestion === questions.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="row mt-20">
            <div className="col">
              <h3>Questions</h3>
            </div>
          </div>
          <div className="row">
            <div className="col list-group">
              {questions.map((q, index) => (
                <button
                  key={index}
                  type="button"
                  className={`list-group-item ${
                    activeQuestion === index ? "active" : ""
                  }`}
                  onClick={() => setactiveQuestion(index)}
                >
                  Question - {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {!quiz.oneQuestionAtATime && questions.length > 0 && (
        <div className="container">
          <div className="list-group">
            {questions.map((question, index) => (
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <h3 className="col-8">Question - {index + 1}</h3>
                    <h4 className="col-4 text-end">{question.points}</h4>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <p>{question.question}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <ul className="list-group">
                        {question.choices.map((choice, index) => (
                          <li key={index} className="list-group-item">
                            <div className="form-check" key={index}>
                              <input
                                type="radio"
                                className="form-check-input"
                                name="choice"
                                value={choice}
                                checked={question.correctAnswerIndex === index}
                                id={index.toString()}
                              />
                                <label
                                    className="form-check-label"
                                    htmlFor={index.toString()}
                                >
                                    {choice}
                                </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="row">
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(`/Kanbas/courses/${courseId}/quizzes/${quizId}/Edit`)
            }
          >
            Exit Preview
          </button>
        </div>
      </div>
    </div>
  );
}
