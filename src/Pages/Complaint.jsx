import { useState, useEffect } from "react";

export default function Complaint() {
  // State for complaints data
  const [complaints, setComplaints] = useState([]);
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General",
    description: "",
    urgency: "Medium"
  });
  // State for search
  const [searchKeyword, setSearchKeyword] = useState("");
  // State for submitted complaint ID
  const [complaintID, setComplaintID] = useState("");
  // State for showing result card
  const [showResultCard, setShowResultCard] = useState(false);
  // State for dark mode
  const [darkMode, setDarkMode] = useState(false);
  
  // Load complaints from localStorage on component mount
  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(storedComplaints);
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate random complaint ID
    const newComplaintID = "CMP-" + Math.floor(Math.random() * 90000 + 10000);
    setComplaintID(newComplaintID);
    
    // Create new complaint object
    const newComplaint = {
      id: newComplaintID,
      name: formData.name,
      email: formData.email,
      category: formData.category,
      description: formData.description,
      urgency: formData.urgency
    };
    
    // Update complaints list
    const updatedComplaints = [...complaints, newComplaint];
    setComplaints(updatedComplaints);
    
    // Save to localStorage
    localStorage.setItem("complaints", JSON.stringify(updatedComplaints));
    
    // Reset form and show result
    setFormData({
      name: "",
      email: "",
      category: "General",
      description: "",
      urgency: "Medium"
    });
    setShowResultCard(true);
    
    // Launch confetti animation
    launchConfetti();
    
    // Hide result card after 5 seconds
    setTimeout(() => {
      setShowResultCard(false);
    }, 5000);
  };
  
  // Handle search
  const handleSearch = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };
  
  // Filter complaints based on search keyword
  const filteredComplaints = complaints.filter(complaint => 
    complaint.name.toLowerCase().includes(searchKeyword) || 
    complaint.category.toLowerCase().includes(searchKeyword)
  );
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Confetti animation function
  const launchConfetti = () => {
    const duration = 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };
    
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 30 * (timeLeft / duration);
      
      // Since we don't have direct access to confetti library in React, 
      // we'll use a placeholder comment. In a real app, you'd use a proper
      // confetti library like react-confetti
      console.log("Confetti animation playing");
      
    }, 250);
  };
  
  return (
    <div className=  {`ml-64 mt-16 p-3 bg-gray-50   min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <header className="py-6 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Hospital Complaint System</h1>
            <div className="flex items-center">
              <span className="mr-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={toggleDarkMode} 
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Complaint Form */}
          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-6">Submit a Complaint</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                >
                  <option value="General">General</option>
                  <option value="Billing">Billing</option>
                  <option value="Medical Care">Medical Care</option>
                  <option value="Staff Behavior">Staff Behavior</option>
                  <option value="Facilities">Facilities</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                  required
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Urgency
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value="Low"
                      checked={formData.urgency === "Low"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Low
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value="Medium"
                      checked={formData.urgency === "Medium"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Medium
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value="High"
                      checked={formData.urgency === "High"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    High
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-150"
              >
                Submit Complaint
              </button>
            </form>
            
            {/* Success card */}
            {showResultCard && (
              <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg border border-green-200 animate-fade-in">
                <h3 className="font-bold text-lg">Complaint Submitted!</h3>
                <p>Your complaint ID is: <span className="font-mono font-bold">{complaintID}</span></p>
                <p className="mt-2 text-sm">We'll review your complaint shortly.</p>
              </div>
            )}
          </div>
          
          {/* Admin Table */}
          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Complaint Records</h2>
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchKeyword}
                onChange={handleSearch}
                className={`px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Category</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Urgency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint, index) => (
                      <tr key={complaint.id} className={`animate-fade-in ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{complaint.id}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{complaint.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{complaint.email}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{complaint.category}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          <span 
                            className={`px-2 py-1 rounded-full text-xs 
                              ${complaint.urgency === 'High' ? 'bg-red-100 text-red-800' : 
                                complaint.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-green-100 text-green-800'}`}
                          >
                            {complaint.urgency}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500">
                        No complaints found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      <footer className={`py-4 mt-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Hospital Complaint Management System</p>
        </div>
      </footer>
    </div>
  );
}