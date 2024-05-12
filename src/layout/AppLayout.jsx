import React from 'react'
// Dependency
import { Outlet } from 'react-router-dom'
// Components
import Header from '../components/Header'

const AppLayout = () => {
  return (
    <div className='bg-gray-950 text-white min-h-screen'>
      <div className='container px-6 py-4 mx-auto'>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout