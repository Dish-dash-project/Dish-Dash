import React from 'react'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Dish-Dash</h1>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="/menu" className="text-gray-600 hover:text-gray-900">Menu</a>
            <a href="/orders" className="text-gray-600 hover:text-gray-900">Orders</a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">Login</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
