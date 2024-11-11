"use client"
import { SignedIn } from '@clerk/nextjs'
import React, { useState } from 'react'
import SideNav from './_components/SideNav'

function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex ">
      <SignedIn>
       
        {isSidebarOpen && (
          <div
            className="fixed  inset-0 bg-opacity-50 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}

       
        <div
          className={`fixed md:w-64 h-full  z-50 transform transition-transform overflow-hidden ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <div className="">
            <button
              className="mb-4 md:hidden text-gray-500"
              onClick={closeSidebar}
            >
              
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <SideNav />
          </div>
        </div>

       
        <div className="flex-1 md:ml-64">
          <button
            className="p-4 md:hidden text-gray-500"
            onClick={toggleSidebar}
          >
         
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className=" p-4">{children}</div>
        </div>
      </SignedIn>
    </div>
  );
}

export default DashboardLayout;
