import { createSlice } from "@reduxjs/toolkit";


let PatientData = [
    {
        name: 'Nitin Doe',
        age:23,
        gender:'Male',
        phone: '123-456-7890',
        appointmentDate:'2015-01-01',
        appointmentTime:'10:00',
        query: "I need help with my heart condition. I'm looking for a cardiologist who specializes in heart attack and heart failure.",
        doctorName: 'Jhon Doe',
        isHealthy: true,
    },
    {
        name: 'Omkar Colsan',
        age:27,
        gender:'Male',
        phone: '987-654-3210',
        appointmentDate:'2015-02-01',
        appointmentTime:'12:00',
        query: "I need help with my heart condition. I'm looking for a cardiologist who specializes in heart attack and heart failure.",
        doctorName: 'Jane Doe',
        isHealthy: false,
    },
    {
        name: 'Pushpendra Smith',
        age:25,
        gender:'Female',
        phone: '456-789-0123',
        appointmentDate:'2015-03-01',
        appointmentTime:'14:00',
        query: "I need help with my heart condition. I'm looking for a cardiologist who specializes in heart attack and heart failure.",
        doctorName: 'John Doe',
        isHealthy: false,

    },
]

let PatientSlicer = createSlice({
    name: 'patient',
    initialState: PatientData,
    reducers: {
        setPatient(state, action) {
            state.push(action.payload);

        },
    },
})

export const { setPatient } = PatientSlicer.actions;
export default PatientSlicer.reducer;