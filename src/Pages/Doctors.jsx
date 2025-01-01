import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  Star, 
  Stethoscope, 
  MapPin, 
  Clock, 
  Briefcase, 
  GraduationCap, 
  Check 
} from 'lucide-react'

export default function Doctors() {
  const navigate = useNavigate()

  // Get doctors from Redux store
  const DoctorsList = useSelector(state => state.doctors)
  console.log(DoctorsList)

  const [selectedSpecialty, setSelectedSpecialty] = useState('All')

  // Unique specialties
  const specialties = ['All', ...new Set(DoctorsList.map(doctor => doctor.specialty))]

  // Filter doctors based on specialty
  const filteredDoctors = selectedSpecialty === 'All' 
    ? DoctorsList 
    : DoctorsList.filter(doctor => doctor.specialty === selectedSpecialty)

  return (
    <div className="ml-64 mt-16 p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Our Medical Experts</h1>
        <p className="text-xl text-gray-600">Dedicated professionals committed to your health and well-being</p>
      </div>

      {/* Specialty Filter */}
      <div className="mb-8 flex space-x-4">
        {specialties.map((specialty) => (
          <button 
            key={specialty}
            onClick={() => setSelectedSpecialty(specialty)}
            className={`
              px-4 py-2 rounded-full transition-all 
              ${selectedSpecialty === specialty 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-blue-100'
              }
              border shadow-sm flex items-center space-x-2
            `}
          >
            <Stethoscope className="w-4 h-4" />
            <span>{specialty}</span>
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-3 gap-8">
        {filteredDoctors.map((doctor, index) => (
          <div 
            key={index} 
            className="bg-white border rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
          >
            {/* Doctor Card Header */}
            <div className="relative">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-56 object-cover group-hover:scale-105 transition"
              />
              <div className="absolute top-4 right-4 bg-white/80 rounded-full px-3 py-1 flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="font-semibold text-gray-800">{doctor.rating}</span>
              </div>
            </div>

            {/* Doctor Details */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">{doctor.name}</h2>
              <div className="flex items-center text-gray-600 mb-4">
                <Stethoscope className="w-5 h-5 mr-2 text-blue-500" />
                <span>{doctor.specialty}</span>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div className="bg-blue-50 rounded-lg p-2">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <span className="text-sm font-medium">{doctor.exp} Years</span>
                </div>
                <div className="bg-green-50 rounded-lg p-2">
                  <Briefcase className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <span className="text-sm font-medium">{doctor.appointments} Appts</span>
                </div>
                <div className="bg-purple-50 rounded-lg p-2">
                  <MapPin className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                  <span className="text-sm font-medium">{doctor.location}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button onClick={()=>{
                  navigate(`/BookApointment/${doctor.name}`)
                  
                }}  className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center">
                  Book Appointment
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 rounded-lg hover:bg-gray-200 transition flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}