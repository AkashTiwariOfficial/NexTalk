import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../../hookes/auth/useLOGOUT'

export default function Home() {
const {Logout} = useLogout();
  const handleLogout = async () => {
    await Logout();
  }
  return (
    <div>
      <Link to="/register" className='p-5 bg-red-600 m-5'>signup</Link>
         <Link to="/login" className='p-5 bg-red-600'>Login</Link>
           <button onClick={handleLogout} className='p-5 bg-red-600'>Logout</button>
    </div>
  )
}
