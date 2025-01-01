import { createSlice } from "@reduxjs/toolkit";

let content = [
    {
        title: 'What is Cancer?',
        content: 'Cancer refers to a group of diseases in which cells in the body begin to divide uncontrollably and spread to other parts. This uncontrolled growth can form tumors, damage tissue, and lead to severe health complications. Cancer can occur in almost any part of the body, and its causes can vary, including genetic factors, environmental exposures (like smoking or sunburn), and lifestyle choices. Early detection and treatment are crucial, and advances in medical research are constantly improving the outcomes for many cancer patients.',
        author: 'Dr. James Colsan',
        createdAt: '2022-01-01',
        poster: "https://raaheaseman.com/en/wp-content/uploads/2024/10/62233-9-l.jpg"
    },
    {
        title: 'What is Parkinson?',
        content: 'Parkinson\'s disease is a progressive neurological disorder that affects movement control. It occurs when nerve cells in the brain that produce dopamine, a neurotransmitter responsible for controlling movement, begin to deteriorate. Symptoms of Parkinson\'s disease can include tremors, stiffness, slowness of movement, and balance issues. While there is no cure for Parkinson’s, treatments such as medication and physical therapy can help manage symptoms and improve quality of life.',
        author: 'Dr. Jhon Doe',
        createdAt: '2022-01-02',
        poster: "https://lirp.cdn-website.com/69c0b277/dms3rep/multi/opt/Parkinson-s+disease+-+PACE+Hospitals-520e214c-1920w.jpg"
    },
    {
        title: 'What is Alzheimer\'s Disease?',
        content: 'Alzheimer\'s disease is a progressive neurological condition that causes memory loss, confusion, and changes in behavior. It is the most common cause of dementia, a general term for a decline in cognitive function. Alzheimer’s affects the brain’s ability to process information, resulting in difficulties with memory, thinking, and decision-making. While the exact cause is unknown, research suggests genetic, environmental, and lifestyle factors may play a role. Currently, there is no cure, but medications and interventions can help slow the progression of symptoms.',
        author: 'Dr. Nancy Smith',
        createdAt: '2022-01-02',
        poster: "https://txhospitals.in/wp-content/uploads/2023/06/Understanding-Memory-Loss-Alzheimers-disease-the-basics.jpg.png"
    }
];



let PostSlicer = createSlice({
    name: 'posts',
    initialState:content,
    reducers: {
        addPost(state, action) {
            state.push(action.payload);
        },
      
    },
})

export const { addPost } = PostSlicer.actions;
export default PostSlicer.reducer;