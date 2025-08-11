import React from 'react';
import { assets } from '../../assets/assets';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>

      <h1 className='text-2xl md:text-4xl relative font-bold text-gray-800 max-w-3xl mx-auto'>
        Empower your future with the courses designed to 
        <span className='text-blue-600'> fit your choice.</span>
        <img
          src={assets.sketch}
          alt="sketch"
          className='md:block hidden absolute -bottom-7 right-0'
        />
      </h1>

      <p className='text-lg md:text-xl text-gray-500 max-w-2xl mx-auto md:block hidden'>
        We bring together world-class instructors, interactive content, and a vibrant community
        to help you learn and grow. Join us today and take the first step towards your future.
      </p>

      <SearchBar />
    </div>
  );
};

export default Hero;
