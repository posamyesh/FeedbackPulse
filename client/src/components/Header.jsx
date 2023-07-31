import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./payments";
//import authUser from '../reducers/authReducer'
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); //it will check if we click button then it set true
  const toggleMenu = () =>{
    setIsMenuOpen(!isMenuOpen);
  }
  useEffect(() =>{
    const handleScroll = () => {
      const header = document.querySelector('.header');
      //const scrollPosition = window.scrollY;
      //const headerHeight = header.offsetHeight;
      //const headerOpacity = Math.min(scrollPosition*100/headerHeight, 75);
      if (header) {
        if(window.scrollY > 0) {
          header.classList.add('bg-opacity-80');
        }
        else{
          header.classList.remove('bg-opacity-80');
        } 
       } 
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const users = useSelector((state) =>state.auth.users);
  const loading = useSelector((state) =>state.auth.loading);
  let content;
 
  if(loading){
   content = <p className="text-xl py-2 px-5">Loading....</p>
  }
  
  else if(users.length!==0){
    content = <a href="/api/logout" className=" text-xl hover:text-red-500  py-2 px-5 font-semibold block text-gray-900 rounded hover:bg-white">Logout</a>;
  }
  else{
    content = <a href="/auth/google" className=" text-xl hover:text-red-500 py-2 px-5 font-semibold block text-gray-900 rounded hover:bg-white">Login</a>
  }
    return(
        
<nav className=" header bg-gradient-to-r from-red-500 to bg-red-300 m-1 rounded shadow-md">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to= {users.length!==0? "/surveys" : "/"} className="flex items-center">
        <img src="https://www.svgrepo.com/show/137590/email.svg" className="h-8 mr-2" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold tracking-wider dark:text-white">FedbackPulse</span>
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={isMenuOpen? 'true' : 'false'} onClick={toggleMenu}>
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className={`${
          isMenuOpen ? 'block gap-5 rounded bg-gray-300  md:bg-inherit lg:bg-inherit mt-2 w-full' : 'hidden'
        } w-full md:block md:w-auto`}
        id="navbar-default" >
      <ul className="sm:bg-grey-200 font-medium flex flex-col md:flex-row md:space-x-3 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 h-full">
        <li>
          <Link to= {users.length!==0? "/surveys" : "/"} className="text-xl  hover:text-red-500 py-2 px-5 block rounded text-gray-900 hover:bg-white  dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
        </li>
        {users.length !== 0 && (
          <ul className="flex flex-col gap-3  px-5 md:flex-row md:items-center">
            <li className="mr-4 md:inline-block ">
              <Payments />
            </li>
            <li className="tracking-wider md:inline-block hover:text-white hover:font-semibold">CREDITS: {users.credits}</li>
          </ul>
          
        )}
        <li>
          {content}
        </li>
      </ul>
    </div>
  </div>
</nav>

    );
}

export default Header;