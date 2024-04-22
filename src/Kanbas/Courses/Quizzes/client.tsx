import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
export const COURSES_API = `${BASE_API}/api/courses`;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;

const axiosWithCredentials = axios.create({
    withCredentials: true
});

export interface QuizInterface {
    _id: string;
    title: string;
    quizType: string;
    points: number;
    shuffleAnswers: boolean;
    assignmentGroup: string;
    timeLimit: number;
    multipleAttempts: boolean;
    showCorrectAnswers: boolean;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate: Date;
    availableDate: Date;
    untilDate: Date;
    published: boolean;
    courseId: string;
};

export const createQuiz = async (quiz: any) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}`, quiz);
    return response.data;
};

export const findAllQuizzes = async () => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/`);
    return response.data;
};

export const findQuizById = async (id: any) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${id}`);
    return response.data;
};

export const findQuizzesByCourseId = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    console.log("FINDQ_BY_C:", response.data);
    return response.data;
}

export const updateQuiz = async (quiz: any) => {
    console.log("UPDATE QUIZ CLIENT: ", quiz);
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    console.log("UPDATE QUIZ CLIENT RESP: ", response.data);
    return response.data;
};

export const deleteQuiz = async (quiz: QuizInterface) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quiz._id}`);
    return response.data;
}

export const QUESTIONS_API = `${BASE_API}/api/questions`;

export interface IQuestion {
    _id: string,
    quizId: string;
    questionType: string;
    title: string;
    points: string;
    question: string;
    choices: string[];
    correctAnswerIndex: number;
}

export const createQuestion = async (question: any) => {
    const response = await axiosWithCredentials.post(`${QUESTIONS_API}`, question);
    return response.data;
};

export const findQuestionsByQuizId = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
}

export const findQuestionById = async (questionId: string) => {
    const response = await axiosWithCredentials.get(`${QUESTIONS_API}/${questionId}`);
    return response.data;
}

export const updateQuestion = async (question: IQuestion) => {
    const response = await axiosWithCredentials.put(`${QUESTIONS_API}/${question._id}`, question);
    return response.data;
};

export const deleteQuestion = async (question: IQuestion) => {
    const response = await axiosWithCredentials.delete(`${QUESTIONS_API}/${question._id}`);
    return response.data;
}