import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  User, Calendar, Phone, Clock, 
  MessageSquare, Search, Heart, 
  Filter, AlertCircle, ChevronLeft,
  ChevronRight, SortAsc
} from 'lucide-react'

export default function Patients() {
  const patients = useSelector(state => state.patients)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  
  const patientsPerPage = 6

  // Load simulation
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'healthy' && patient.isHealthy) ||
      (filterStatus === 'unhealthy' && !patient.isHealthy)
    return matchesSearch && matchesFilter
  })

  // Sort patients
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    switch(sortBy) {
      case 'date':
        return new Date(a.appointmentDate) - new Date(b.appointmentDate)
      case 'name':
        return a.name.localeCompare(b.name)
      case 'doctor':
        return a.doctorName.localeCompare(b.doctorName)
      default:
        return 0
    }
  })

  // Pagination
  const indexOfLastPatient = currentPage * patientsPerPage
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage
  const currentPatients = sortedPatients.slice(indexOfFirstPatient, indexOfLastPatient)
  const totalPages = Math.ceil(sortedPatients.length / patientsPerPage)

  // Format date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className="ml-64 mt-2 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Patients Overview</h1>
          <p className="text-gray-600">Manage and monitor patient information</p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex space-x-4">
          <div className="bg-white rounded-lg shadow p-4 w-48">
            <div className="text-gray-600 mb-1">Total Patients</div>
            <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 w-48">
            <div className="text-gray-600 mb-1">Today's Appointments</div>
            <div className="text-2xl font-bold text-green-600">
              {patients.filter(p => new Date(p.appointmentDate).toDateString() === new Date().toDateString()).length}
            </div>
          </div>
        </div>
      </div>

      {/* Search, Sort and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients or doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div className="flex space-x-4 items-center">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="doctor">Sort by Doctor</option>
            </select>
            
            <button 
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                filterStatus === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>All</span>
            </button>
            <button 
              onClick={() => setFilterStatus('healthy')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                filterStatus === 'healthy' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Healthy</span>
            </button>
            <button 
              onClick={() => setFilterStatus('unhealthy')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                filterStatus === 'unhealthy' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              <span>Needs Attention</span>
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      ) : (
        <>
          {/* Patients Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {currentPatients.map(patient => (
              <div 
                key={patient.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{patient.name}</h3>
                        <div className="text-gray-500 flex items-center mt-1">
                          <span className="mr-4">{patient.age} years</span>
                          <span>{patient.gender}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${
                      patient.isHealthy ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {patient.isHealthy ? 'Healthy' : 'Needs Attention'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-blue-500" />
                      {patient.phone}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {formatDate(patient.appointmentDate)}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      {patient.appointmentTime}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <User className="w-4 h-4 mr-2 text-blue-500" />
                      {patient.doctorName}
                    </div>
                    <div className="col-span-2 flex items-center text-gray-600">
                      <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
                      {patient.query}
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-4">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                      View Details
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition">
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-4 items-center">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Empty State */}
          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No patients found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}