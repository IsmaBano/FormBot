import React from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

function page() {
  return (
    <div>
    <div className='p-10 flex gap-4 justify-between'>
      <h2 className='text-2xl font-bold'>Dashboard  </h2>
      <CreateForm/>
      </div>
 
    <FormList/>
 </div>
      
  )
}

export default page