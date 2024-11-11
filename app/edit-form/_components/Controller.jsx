import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Themes from '@/app/_data/Themes'
import GradientBg from '@/app/_data/GradientBg'
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
  

function Controller({selectedTheme,selectedBackground,setSignInenable}) {
  const [showmore,setshowmore]=useState(6);
  return (
    <div>
       <h3 className='font-semibold'>Select Themes</h3>
        <Select onValueChange={(value)=>selectedTheme(value)}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    {
      Themes.map((theme,index)=>(
        <div key={index}>
           <SelectItem value={theme.theme} >
            <div className='gap-2 flex'>
            <div className='flex'>
              <div className="h-5 w-5 rounded-l-sm" style={{backgroundColor:theme.primary}}></div>
              <div className="h-5 w-5" style={{backgroundColor:theme.secondary}}></div>
              <div className="h-5 w-5" style={{backgroundColor:theme.accent}}></div>
              <div className="h-5 w-5 rounded-r-sm" style={{backgroundColor:theme.neutral}}></div>
              
            </div>
            {theme.theme}
            </div>
           </SelectItem>
        </div>
      ))
    }
   
  </SelectContent>
</Select>
   
   <h2 className='mt-8 my-1 font-semibold'>Background</h2>
   <div className='grid grid-cols-3 gap-3'>
    {
      GradientBg.map((bg,index)=>(index<showmore)&&(
        <div key={index} onClick={()=>selectedBackground(bg.gradient)} className='w-full h-[80px] cursor-pointer rounded-lg hover:border hover:border-black flex items-center justify-center' style={{background:bg.gradient}}>
          {index==0 && 'None'} 
          </div>
      ))
    }
   </div>
   <Button className="w-full my-1" onClick={()=>showmore>6?setshowmore(6):setshowmore(20)} size="sm" variant="ghost">{showmore>6?'show Less':'Show More'}</Button>
    <div className='flex gap-2 my-4 items-center mt-10'>
      <Checkbox onCheckedChange={(e)=>setSignInenable(e)} /><h2>Enable social authentication before submit</h2>
    </div>
    </div>

  )
}

export default Controller