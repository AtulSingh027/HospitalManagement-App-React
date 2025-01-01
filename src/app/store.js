import { configureStore } from "@reduxjs/toolkit";
import DoctorSlicer from "../Slicer/DoctorSlicer";
import PatientSlicer from "../Slicer/PatientSlicer";
import PostSlicer from "../Slicer/PostSlicer";
let store = configureStore({
    reducer: {
        doctors: DoctorSlicer,
        patients: PatientSlicer,
        posts: PostSlicer
    },
})

export default store;