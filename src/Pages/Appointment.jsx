import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, MessageSquare, Phone, User, Heart, UserCheck } from 'lucide-react';

import { useDispatch } from 'react-redux';
import {setPatient} from "../Slicer/PatientSlicer";

import { Check } from 'lucide-react';  // Add this import at the top

export default function Appointment() {
  let SelectedDoctor = useParams().DoctorName
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    appointmentDate: '',
    appointmentTime: '',
    query: '',
    doctorName: SelectedDoctor,
    isHealthy: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  function saveData() {
    console.log(formData);
    dispatch(setPatient(formData));
  }

  return (
    <div className="ml-64 mt-2 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-3">Book Appointment</h1>
        <p className="text-xl text-gray-600">Welcome to our {SelectedDoctor} Clinic!</p>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          {/* Name Field */}
          <div className="mb-6">
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Age and Gender Fields */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <UserCheck className="w-5 h-5 mr-2 text-blue-500" />
                Age
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter your age"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <Phone className="w-5 h-5 mr-2 text-blue-500" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Doctor Name Field */}
          <div className="mb-6">
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Doctor Name
            </label>
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter doctor's name"
              required
            />
          </div>

          {/* Date and Time Fields */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Appointment Date
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                Appointment Time
              </label>
              <input
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
          </div>

          {/* Health Status Field */}
          <div className="mb-6">
            <label className="flex items-center text-gray-700 font-medium mb-2 cursor-pointer">
              <Heart className="w-5 h-5 mr-2 text-blue-500" />
              <input
                type="checkbox"
                name="isHealthy"
                checked={formData.isHealthy}
                onChange={handleChange}
                className="mr-2"
              />
              I am currently healthy with no major health concerns
            </label>
          </div>

          {/* Query Field */}
          <div className="mb-6">
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-500" />
              Health Concerns
            </label>
            <textarea
              name="query"
              value={formData.query}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-32 resize-none"
              placeholder="Please describe your health concerns or reason for visit"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            onClick={saveData}
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-medium text-lg flex items-center justify-center space-x-2"
          >
            <Calendar className="w-5 h-5" />
            <span>Book Appointment</span>
          </button>
        </form>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in">
            <Check className="w-5 h-5 mr-2" />
            Appointment booked successfully!
          </div>
        )}
      </div>
    </div>
  );
}