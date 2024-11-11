"use client"
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function Header() {
  const path=usePathname();
  const {user,isSignedIn}=useUser();
  return (!path.includes('aiform')) &&(
    <header className="navbar bg-gray-900 text-white shadow-lg p-4 border-gray-500 border-b-2">
      <div className="flex-1">
        <a href="/" className="text-[#3B1E54] font-extrabold text-3xl hover:text-[#AF1740] transition duration-200">
          Form<span className="text-[#AF1740]">Bot</span>
        </a>
      </div>
      {isSignedIn?
 <div className="flex-none gap-4">
  <Link href={"/dashboard"}>
  <button className="btn border border-[#AF1740] text-white font-semibold hover:bg-[#AF1740] transition duration-200 ml-6">
   Dashboard
 </button>
  </Link>
 <UserButton/>
      </div>: 
      <SignInButton>
   <div className="flex-none">
        <button className="btn bg-[#AF1740] text-white font-semibold hover:bg-[#AF1740] transition duration-200 ml-6">
          Get Started
        </button>
      </div>
      </SignInButton>
   
      }
     
    </header>
  );
}

export default Header;

