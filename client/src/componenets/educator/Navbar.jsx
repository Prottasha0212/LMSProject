import React from 'react'
import {dummyEducatorData} from '../../assets/assets';
import {UserButton,useUser} from '@clerk/clerk-react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const educatorData =dummyEducatorData
  const {user} = useUser();

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <Link to = '/' className='flex items-center gap-3'>
      {/* <img src={assets.logo} alt="Logo" classname='w-28 lg:w-32'/> */}
      <img src={assets.logo} alt="Logo" className='w-10 h-10 lg:w-12 lg:h-12' />
      <h1 className="text-xl font-semibold text-gray-800">LMS Project</h1>
      </Link>
      <div className='flex items-center gap-3'>
        <p>Hi!{user ? user.fullName: 'Developers'}</p>
        {user ? <UserButton/> : <img className='w-8 h-8 rounded-full object-cover' src={assets.profile_img}/>}
      </div>
    </div>
  )
}

export default Navbar

