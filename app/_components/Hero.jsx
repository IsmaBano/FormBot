import { AtomIcon, Edit, Share2 } from 'lucide-react'
import React from 'react'

function Hero() {
  return (
    <div>
      <section className="bg-gray-900 text-white">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-[#a3415b] to-[#AF1740] bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        Effortless Forms,

        <span className="sm:block">  Powerful Results. </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
      Craft intuitive forms that engage users and capture the data you need, making every interaction count for your business
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded border bg-[#AF1740] border-[#AF1740] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="/dashboard"
        >
          + Create AI Form
        </a>

        <a
          className="block w-full rounded border border-[#AF1740] px-12 py-3 text-sm font-medium text-white hover:bg-[#AF1740] focus:outline-none focus:ring active:bg-[#AF1740] sm:w-auto"
          href="#sect"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
  <section id='sect' className="text-white">
  <div className="mx-auto max-w-screen-xl px-4 py-56 ">
    <div className="mx-auto max-w-lg text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">How it Works</h2>

      <p className="mt-4 text-gray-300">
      AI can analyze the context of a form and suggest the necessary fields based on user input or context. It can automate the generation of fields such as text inputs, checkboxes, dropdowns, etc.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <a
        className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
       <AtomIcon className='h-8 w-8'/>

        <h2 className="mt-4 text-xl font-bold text-white">Write prompt for your form</h2>

        <p className="mt-1 text-sm text-green-200">
          write the detailing of the prompt what topic you want for form......
        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
      <Edit className='h-8 w-8'/>

        <h2 className="mt-4 text-xl font-bold text-white">Edit Your form </h2>

        <p className="mt-1 text-sm text-green-200">
         Edit the fild and placeholder name what you want to keep if you are not liking suggestion field......
        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
      <Share2 className='h-8 w-8' />

        <h2 className="mt-4 text-xl font-bold text-white">Share & Start Accepting Responses</h2>

        <p className="mt-1 text-sm text-green-200">
          keep the track of responses and share it to the people for it use.....
        </p>
      </a>

    
    </div>

    <div className="mt-12  text-center">
      <a
        href="/sign-in"
        className="inline-block rounded bg-[#AF1740] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#571b2b] focus:outline-none focus:ring focus:ring-purple-400"
      >
        Get Started Today
      </a>
    </div>
  </div>
</section>
</section>


    </div>
  )
}

export default Hero