import { createSlice } from "@reduxjs/toolkit";
// import { assignments } from "../../Database";

// Ref assignment
// {
//     "_id": "A101",
//     "title": "Propulsion Assignment",
//     "course": "RS101",
//     "description": "This is a propulsion assignment",
//     "dueDate": "2021-09-30",
//     "points": 100,
//     "availableFrom": "2021-09-01",
//     "availableTo": "2021-09-30",
// }
const initialState = {
    assignments: [] as { _id: string, title: string, course: string}[],
    assignment: {
        id: "NEW ID",
        title: "",
        course: ""
    }
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
        addAssignment: (state, action) => {
            state.assignments = [
                { ...action.payload, _id: new Date().getTime().toString() },
                ...state.assignments,
            ];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) => {
                if (assignment._id === action.payload._id) {
                    return action.payload;
                } else {
                    return assignment;
                }
            });
        },
        setAssignment: (state, action) => {
            console.log("setAssignment", action.payload);
            state.assignment = action.payload;
        }
    }
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;