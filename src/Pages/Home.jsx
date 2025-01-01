import React from 'react'
import { 
  Calendar, 
  Clock, 
  Stethoscope, 
  UserPlus, 
  MessageSquare, 
  ShieldCheck 
} from 'lucide-react'

const Home = () => {
  return (
    <div className="ml-64 mt-2 p-6 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="bg-white shadow-md rounded-lg p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome to The Life Hospital</h1>
            <p className="text-xl text-gray-600">Your Health, Our Priority - Compassionate Care, Advanced Treatment</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-full">
            <Stethoscope className="w-16 h-16 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white border rounded-lg shadow-md p-6 hover:shadow-xl transition-all group">
          <Calendar className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Book Appointment</h3>
          <p className="text-gray-500 mb-4">Schedule a consultation with our experts</p>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Schedule Now
          </button>
        </div>

        <div className="bg-white border rounded-lg shadow-md p-6 hover:shadow-xl transition-all group">
          <Clock className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Check Wait Time</h3>
          <p className="text-gray-500 mb-4">Real-time updates on department wait times</p>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
            View Times
          </button>
        </div>

        <div className="bg-white border rounded-lg shadow-md p-6 hover:shadow-xl transition-all group">
          <UserPlus className="w-12 h-12 text-purple-600 mb-4 group-hover:scale-110 transition" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">New Patient</h3>
          <p className="text-gray-500 mb-4">Register and create your patient profile</p>
          <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition">
            Register
          </button>
        </div>

        <div className="bg-white border rounded-lg shadow-md p-6 hover:shadow-xl transition-all group">
          <MessageSquare className="w-12 h-12 text-orange-600 mb-4 group-hover:scale-110 transition" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Virtual Consult</h3>
          <p className="text-gray-500 mb-4">Connect with doctors online</p>
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
            Start Consult
          </button>
        </div>
      </div>

      {/* Hospital Information Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* News and Updates */}
        <div className="bg-white border rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Hospital News</h2>
            <a href="#" className="text-blue-600 hover:underline">View All</a>
          </div>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h4 className="font-semibold text-gray-700 mb-2">New Cardiac Care Unit Opened</h4>
              <p className="text-gray-500 text-sm">State-of-the-art facilities for advanced heart treatments</p>
            </div>
            
            <div className="border-b pb-4">
              <h4 className="font-semibold text-gray-700 mb-2">COVID-19 Vaccination Drive</h4>
              <p className="text-gray-500 text-sm">Free vaccinations for all eligible individuals</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Telehealth Services Expanded</h4>
              <p className="text-gray-500 text-sm">More specialties now available online</p>
            </div>
          </div>
        </div>

        {/* Patient Safety & Support */}
        <div className="bg-white border rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <ShieldCheck className="w-10 h-10 text-green-600 mr-4" />
            <h2 className="text-2xl font-bold text-gray-800">Patient Safety Commitment</h2>
          </div>
          
          <div className="space-y-4 text-gray-600">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
              <p>Strict infection control protocols</p>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
              <p>24/7 patient support and counseling</p>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
              <p>Advanced medical equipment and technology</p>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
              <p>Personalized care and compassionate approach</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home