"use client"
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import FormListItemResp from './_components/FormListItemResp';

function Responses() {
    const {user}=useUser();
    const [formList,setFormList]=useState([])
    const GetFormList=async ()=>{
        const result=await db.select().from(JsonForms)
        .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress));
        
         setFormList(result)
        
       }
       useEffect(()=>{
       user&&GetFormList()
       },[user])
  return (
    <div className='p-10 '>
    <h2 className='text-2xl font-bold'>Responses  </h2>
   <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1'>
    {
      formList?.map((form,index)=>(
        
        <FormListItemResp key={form.id} formRecord={form} jsonForm={JSON.parse(form.jsonform)}/>
      ))
    }
   </div>
    
    </div>
  )
}

export default Responses