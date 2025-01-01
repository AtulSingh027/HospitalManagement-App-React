import React from 'react'
import { useNavigate } from 'react-router-dom'

import { HomeIcon,Calendar,Users,UserPlus,InfoIcon } from 'lucide-react'
const SideBar = () => {
    const menuItems = [
      { icon: HomeIcon, label: 'Home', path: '/' },
      { icon: Calendar, label: 'Feed', path: '/feed' },
      { icon: Users,    label: 'Doctors', path: '/doctors' },
      { icon: UserPlus, label: 'Patients', path: '/patients' },
      { icon:InfoIcon , label: 'About', path: '/about' },
    ]

    let Navigate = useNavigate();
  
    return (
      <div className="fixed left-0 top-16 bottom-0 w-64 bg-gray-50 border-r shadow-lg p-4 pt-8">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <button 
              onClick={()=>{
                Navigate(item.path)
              }}
              key={index} 
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    )
  }

  export default SideBar