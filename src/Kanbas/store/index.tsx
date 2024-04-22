import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/Reducer";
import assignmentsReducer from "../Courses/Assignments/reducer";
import questionsReducer from "../Courses/Quizzes/Quiz/reducer";

export interface KanbasState {
    modulesReducer: {
        modules: any[];
        module: any;
    },
    assignmentsReducer: {
        assignments: any[];
        assignment: any;
    },
    questionsReducer: {
        questions: any[];
        question: any;
    }
}

const store = configureStore({
    reducer: {
        modulesReducer,
        assignmentsReducer,
        questionsReducer
    }
})

export default store;