import { createSlice } from "@reduxjs/toolkit";


let DocList = [
    {
        name: 'Dr. John Doe',
        specialty: 'Cardiologist',
        image: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
        location: 'New York, NY',
        fee:4500,
        rating: 4.5,
        appointments: 200,
        exp: 5,
        bio: 'Dr. John Doe is a renowned cardiologist with a passion for heart health. He specializes in the treatment of heart conditions, including heart attack, heart failure, and coronary artery disease.',
        services: ['Cardiology Consultation', 'Cardiology Diagnostic', 'Cardiology Treatment'],
        education:[
            {degree: 'MBBS', institution: 'Harvard Medical School', year: 2015},
            {degree: 'MD', institution: 'University of California, San Francisco', year: 2021},
        ],
        fullTime: true,
    },        
    {
        name: 'Dr. James Colsan',
        specialty: 'Neuro',
        image: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
        location: 'New York, NY',
        fee:4500,
        rating: 4.5,
        appointments: 200,
        exp: 5,
        bio: 'Dr. John Doe is a renowned cardiologist with a passion for heart health. He specializes in the treatment of heart conditions, including heart attack, heart failure, and coronary artery disease.',
        services: ['Cardiology Consultation', 'Cardiology Diagnostic', 'Cardiology Treatment'],
        education:[
            {degree: 'MBBS', institution: 'Harvard Medical School', year: 2015},
            {degree: 'MD', institution: 'University of California, San Francisco', year: 2021},
        ],
        fullTime: true,
    },        
    {
        name: 'Dr. Nancy Smith',
        specialty: 'Ortho',
        image: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
        location: 'New York, NY',
        fee:4500,
        rating: 4.5,
        appointments: 200,
        exp: 5,
        bio: 'Dr. John Doe is a renowned cardiologist with a passion for heart health. He specializes in the treatment of heart conditions, including heart attack, heart failure, and coronary artery disease.',
        services: ['Cardiology Consultation', 'Cardiology Diagnostic', 'Cardiology Treatment'],
        education:[
            {degree: 'MBBS', institution: 'Harvard Medical School', year: 2015},
            {degree: 'MD', institution: 'University of California, San Francisco', year: 2021},
        ],
        fullTime: true,
    }

]

let DoctorSlice = createSlice({
    name: 'doctor',
    initialState: DocList,
    reducers: {
        setDoctors(state, action) {
            state.doctors = action.payload;
        },
    },
});


export const { setDoctors } = DoctorSlice.actions;
export default DoctorSlice.reducer;
