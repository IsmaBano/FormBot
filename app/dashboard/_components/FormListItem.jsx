import { Button } from '@/components/ui/button'
import { Edit, Share, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { RWebShare } from 'react-web-share'


function FormListItem({ formRecord, jsonform ,refreshData}) {
  const {user}=useUser();
  const deleteForm=async()=>{
    const result=await db.delete(JsonForms)
    .where(and(eq(JsonForms.id,formRecord.id),eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress)))
  if(result){
    toast("succesfully deleted!")
    refreshData();
  }
  }
  return (
    <div className='bg-[#191F25] shadow-lg rounded-lg p-4  hover:animate-subtle-tilt '> 
      <div className='flex justify-between'>
        <h2></h2>
       
        <AlertDialog>
          <AlertDialogTrigger > <h2><Trash className='h-5 w-5 text-red-500 cursor-pointer hover:scale-105 transition-all' /></h2></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction style={{ backgroundColor: "#AF1740" }} onClick={()=>deleteForm()} >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
      <h2 className='text-2xl text-[#e7daf8]'>{jsonform?.formTitle}</h2>
      <h2 className='text-sm '>{jsonform?.formHeading}</h2>
      <hr className='my-4'></hr>
      <div className='flex gap-2 justify-between'>
      <RWebShare
        data={{
          text: jsonform?.formHeading+", biuld your form using formbot",
          url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+formRecord?.id,
          title: jsonform?.formTitle,
        }}
        onClick={() => console.log("shared successfully!")}
      >
           <Button variant="outline" size="sm" className="!bg-transparent hover:!text-white"> <Share />Share
           </Button>
      </RWebShare>
     
        <Link href={'/edit-form/' + formRecord?.id}>
          <Button size="sm" className="!bg-[#AF1740] hover:!bg-[#f77497]" >
            <Edit />Edit
          </Button>
        </Link>

      </div>

    </div>
  )
}

export default FormListItem