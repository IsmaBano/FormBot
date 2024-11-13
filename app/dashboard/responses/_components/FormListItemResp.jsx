import { Button } from '@/components/ui/button'
import { db } from '@/configs'
import { userResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';

function FormListItemResp({ jsonForm, formRecord }) {

  const [loading, setloading] = useState(false)
  const [count,setCount]=useState(0)
  useEffect(()=>{
       getResponseCount(formRecord.id)
  },[formRecord.id])


   async function getResponseCount(formId) {
    try {
      if (!formId) {
        console.error("Invalid formId provided.");
        setCount(0);
        return;
      }
      const ans=await db.select().from(userResponses)
      .where(eq(userResponses?.formRef, formId));
     
        
      const len=ans.length;
      
      setCount(len);
    } catch (error) {
      console.log('Error fetching response count:', error);
      setCount(0);
    }
  }


  const exportData = async () => {
    let jsonData=[];
    setloading(true)
    const result=await db.select().from(userResponses)
    .where(eq(userResponses.formRef, formRecord.id))
  
     console.log("export data result",result);
     
      const len=result.length
     if(result){
      result.forEach((item)=>{
      const jsonItem=JSON.parse(item.jsonResponse)
      jsonData.push(jsonItem)
      })
      setloading(false)
      console.log(jsonData)
      exportToExcel(jsonData)
     }
  }
  // convert json to excel
  const exportToExcel=(jsonData)=>{
    const worksheet=XLSX.utils.json_to_sheet(jsonData);
    const workbook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1")
    XLSX.writeFile(workbook,jsonForm?.formTitle+".xlsx")

  }

  return (

    <div className='bg-[#191F25] shadow-lg rounded-lg p-4 m-4  hover:animate-subtle-tilt '>

      <h2 className='text-2xl text-[#e7daf8]'>{jsonForm?.formTitle}</h2>
      <h2 className='text-sm '>{jsonForm?.formHeading}</h2>
      <hr className='my-4'></hr>
      <div className='flex gap-2 justify-between'>
        <h2 className='text-sm'> <strong>{count}</strong> Responses</h2>
        <Button className="!bg-[#AF1740] hover:!bg-[#f77497]"
          onClick={() => exportData()}
        >{loading ? <Loader className='animate-spin' /> : 'Export'}</Button>

      </div>

    </div>
  )
}

export default FormListItemResp