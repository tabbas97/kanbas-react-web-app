import { IQuestion } from "../client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { questions : IQuestion[], question : IQuestion } = {
    questions: [],
    question: {
        _id: "",
        quizId: "",
        questionType: "",
        title: "New Question",
        points: "0",
        question: "",
        choices: [],
        correctAnswerIndex: -1
    }
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions(state, action) {
            state.questions = action.payload;
        },
        setQuestion(state, action) {
            state.question = action.payload;
        },
        addQuestion(state, action) {
            state.questions = [...state.questions, action.payload];
        },
        // Send only the questionId to deleteQuestion
        deleteQuestion(state, action) {
            state.questions = state.questions.filter(question => question._id !== action.payload);
        },
        updateQuestion(state, action) {
            state.questions = state.questions.map(question => {
                if (question._id === action.payload._id) {
                    return action.payload;
                }
                return question;
            });
        }
    }
});

export const { setQuestions, setQuestion, addQuestion, deleteQuestion, updateQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
