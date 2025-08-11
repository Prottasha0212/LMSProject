import React from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import {useClerk , UserButton, useUser} from '@clerk/clerk-react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Navbar = () => {

  const {navigate,isEducator} = useContext(AppContext);
  const isCourseListPage = location.pathname.includes('/course-list');

  const {openSignIn} = useClerk();
  const {user} = useUser();

  const handleBecomeEducator = () => {
    navigate('/educator');
  };

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-grey-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <div className="flex items-center gap-3">
        <img onClick ={()=> navigate('/')} src={assets.logo} alt="Logo" className='w-10 h-10 lg:w-12 lg:h-12 cursor-pointer' />
        <h1 className="text-xl font-semibold text-gray-800">LMS Project</h1>
      </div>
      <div className='hidden md:flex items-center gap-5 text-grey-500'>
        <div className='flex items-center gap-5'>
    
           { user && 
            <>
            <button onClick = {()=>{navigate('/educator')}}>{isEducator ? 'Educator Dashboard': 'Become Educator'}</button>
            | <Link to='/my-enrollments'>My Enrollments</Link>
            </>
            }

  
        </div>
        { user ? <UserButton/>:
        <button onClick={()=> openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>}
      </div>
      {/* for phone  */}

      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>

        <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
          { user && 
            <>
            <button onClick = {()=>{navigate('/educator')}}>{isEducator ? 'Educator Dashboard': 'Become Educator'}</button>
            | <Link to='/my-enrollments'>My Enrollments</Link>
            </>
            }
        </div>
        {

          user ? <UserButton/>  
          : <button onClick={()=> openSignIn()}><img src={assets.user_icon} alt=""/></button>
 }
      </div>
    </div>
  )
}

export default Navbar

