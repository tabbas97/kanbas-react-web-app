import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import * as client from "./client";
import QuizzesList from "./List";
import Quiz from "./Quiz";

export default function Quizzes() {
    return (
        <div className="container-fluid">
        <Routes>
            <Route path="/" element={<QuizzesList/>} />
            <Route path=":quizId/*" element={<Quiz />} />
        </Routes>
        </div>
    );
};
