import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function SideNav() {
    const {user}=useUser();
    const menuList=[
        {
            id:1,
            name:"my-form",
            icon:LibraryBig,
            path:"/dashboard"
        },
        {
            id:1,
            name:"Responses",
            icon:MessageSquare,
            path:"/dashboard/responses"
        },
        // {
        //     id:1,
        //     name:"Analytics",
        //     icon:LineChart,
        //     path:"/dashboard/analytics"
        // },
        {
            id:1,
            name:"Upgrade",
            icon:Shield,
            path:"/dashboard/upgrade"
        }
    ]
    const path=usePathname();
    useEffect(()=>{
GetFormList()
    },[path,user])
    const [formlist,setformlist]=useState([]);
    const [per,setper]=useState();
   const GetFormList=async ()=>{
    const result=await db.select().from(JsonForms)
    .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(JsonForms.id));
    //  console.log(result);
    setformlist(result)
    let val=(result.length/3)*100
    while(val>100){
        val=val/100;
    }
 
    setper(val);
   }

  return (
    <div className='h-screen border-r-2   border-gray-500'>
        <div className='p-5'>
            {
                menuList.map((menu,index)=>(
                    <Link href={menu.path} key={index} className={`flex items-center gap-3 p-4 hover:bg-[#AF1740] 
                     hover:text-white rounded-lg cursor-pointer mb-1 ${path==menu.path &&` bg-[#AF1740] text-white`}`}><menu.icon/>
                    {menu.name}</Link>
                ))
            }
        </div>
        <div className="fixed bottom-20  p-3 w-60">
    <button className="bg-[#AF1740] text-white font-semibold px-2 py-2 rounded-lg shadow-lg hover:bg-[#d8758f] transition">
        + Create Form
    </button>
    <div className="py-3">
  <Progress className=" h-4 rounded" value={per} />
  <h2  className='text-sm mt-2 text-gray-500'><strong>{formlist.length}</strong> Out of <strong>unlimited</strong> File Created</h2>
  <h2 className='text-sm mt-2 text-gray-500'>It is totally free to use</h2>
</div>

</div>
    </div>
  )
}

export default SideNav