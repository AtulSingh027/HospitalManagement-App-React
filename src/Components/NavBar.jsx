import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import AskAi from "../Utils/AskAi.js"
import { 
  Home as HomeIcon, 
  Calendar, 
  UserPlus, 
  Users, 
  MessageCircle, 
  HelpCircle, 
  User2,
  Send
} from 'lucide-react'

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [AiRes, setAiRes] = useState('')

  async function SearchAi(e) {
    e.preventDefault();
    let AiQuery = e.target[0].value;
    let Res = await AskAi(AiQuery);
    console.log(Res);
    setAiRes(Res);
  }

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white shadow-md z-50 flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold text-blue-600 flex items-center">
          <span className="mr-2">🏥</span>
          The Life Hospital
        </div>
        
        <div className="relative ml-10">
          <input 
            type="text" 
            placeholder="Search patients, doctors, records..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex space-x-4">
          <button className="text-gray-600 hover:text-blue-600 relative">
            <HelpCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </button>
          <Popup 
            position="bottom right" 
            trigger={
              <button className="text-gray-600 hover:text-blue-600 relative">
                <MessageCircle className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </button>
            }
          >
            <div className="bg-white rounded-lg shadow-xl w-96 p-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ask AI Assistant</h3>
                <p className="text-sm text-gray-600">Get quick answers to your medical queries</p>
              </div>
              
              <form onSubmit={SearchAi} className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="What would you like to know?" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
              
              {AiRes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-800 leading-relaxed">
                    {AiRes}
                  </div>
                </div>
              )}
            </div>
          </Popup>
        </div>
        
        <div className="border-l pl-4">
          <button className="flex items-center space-x-2 bg-blue-100 px-3 py-2 rounded-full hover:bg-blue-200 transition">
            <User2 className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Dr. Smith</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar