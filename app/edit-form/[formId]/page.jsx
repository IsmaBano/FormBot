"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUi from "../_components/FormUi";
import { toast } from "sonner";
import Controller from "../_components/Controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RWebShare } from "react-web-share";

function EditForm() {
  const params = useParams();
  const { user } = useUser();
  const route = useRouter();
  const [record,setrecord]=useState();
  const [jsonForm, setJsonForm] = useState(null); // Initialize with null
  const [updateTrigger,setupdateTrigger]=useState();
  const [selectedTheme,setselectedTheme]=useState("light");
  const [selectedBackground,setselectedBackground]=useState("None");


  const onFieldUpdate=(value,index)=>{
    jsonForm.fields[index].fieldLabel=value.fieldLabel;
    jsonForm.fields[index].placeholder=value.placeholder;
    setupdateTrigger(Date.now())

  }
  const updatecontrollerfield=async (value,columnName)=>{
    const result = await db
    .update(JsonForms).set({
      [columnName]:value
    })
    .where(
      and(
        eq(JsonForms.id, record?.id),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
      ))
      toast("updated!!!!");
  }
  const updateJsonFormonDb=async ()=>{
    console.log("record",record);
    const result = await db
    .update(JsonForms).set({
      jsonform:jsonForm
    })
    .where(
      and(
        eq(JsonForms.id, record?.id),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
      ))
      toast("updated!!!!");
  }

  const deleteField=(indextoremove)=>{
   const result=jsonForm.fields.filter((item,index)=>index!=indextoremove)
   jsonForm.fields=result;
   setupdateTrigger(Date.now())
  }
useEffect(()=>{
 setJsonForm(jsonForm);
 updateJsonFormonDb();
},[updateTrigger])

  useEffect(() => {
    if (user && params?.formId) {
      GetFormData();
    }
  }, [user, params?.formId]);

  const GetFormData = async () => {
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(
          and(
            eq(JsonForms.id, params?.formId),
            eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        )
  
      if (result[0]?.jsonform) {
        try {
          setrecord(result[0]);
        
          const jsonString = result[0].jsonform;
        console.log("JSON String:", jsonString); // Log the JSON string
        setJsonForm(JSON.parse(jsonString));
        setselectedTheme(result[0].theme);
        setselectedBackground(result[0].background);
        } catch (e) {
          toast("error...");
          console.log("Error parsing JSON data:", e);
        }
      } else {
        console.log("No jsonform data found for the given formId");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div data-theme="light" className="p-5">
      <div className="flex justify-between">
      <h2
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold  "
        onClick={() => route.back()}
      >
        <ArrowLeft />
        Back
      </h2>
      <div className="flex gap-2">
        <Link href={"/aiform/"+record?.id} target="_blank">
      <Button className="flex gap-2"> <SquareArrowOutUpRight className="h-5 w-5"/> Live Preview</Button>
      </Link>
      <RWebShare
        data={{
          text: jsonForm?.formHeading+", biuld your form using formbot",
          url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+record?.id,
          title: jsonForm?.formTitle,
        }}
        onClick={() => console.log("shared successfully!")}
      >
          <Button className="flex gap-2 !bg-green-600 hover:!bg-green-300"> <Share2 className="h-5 w-5"/> Share</Button>
      </RWebShare>
      
     
      </div>
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-5 border rounded-lg shadow-md mx-4">
          <Controller selectedTheme={(value)=>
            {setselectedTheme(value),
            updatecontrollerfield(value,'theme')}
            }
            setSignInenable={(value)=>{
                updatecontrollerfield(value,'enabledSignIn')
            }}
            
             
             selectedBackground={(value)=>
            {
              updatecontrollerfield(value,'background')
              setselectedBackground(value)}}/>
        </div>
        <div className="md:col-span-2 border rounded-lg p-4 flex items-center justify-center" style={{backgroundImage:selectedBackground}}>
          {jsonForm ? (
            <FormUi editable={true} selectedTheme={selectedTheme} jsonForm={jsonForm} onFieldUpdate={onFieldUpdate } deleteField={(index)=>deleteField(index)} formId={record?.id} enabledSignIn={record?.enabledSignIn} />
          ) : (
            <p>Loading form data...</p>
          )}

        </div>
      </div>
    </div>
  );
}

export default EditForm;
