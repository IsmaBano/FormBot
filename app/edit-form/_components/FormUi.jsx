import { Input } from '@/components/ui/input'
import React, { useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from '@/components/ui/checkbox'
import FieldEdit from './FieldEdit'
import { Button } from '@/components/ui/button'
import { userResponses } from '@/configs/schema'
import moment from 'moment/moment'
import { db } from '@/configs'
import { toast } from 'sonner'
import { SignInButton, useUser } from '@clerk/nextjs'
 

function FormUi({ jsonForm, onFieldUpdate,deleteField,selectedTheme,editable ,formId,enabledSignIn}) {
  const [formData,setFormData]=useState({});
  let formRef=useRef();
const {user,isSignedIn}=useUser()

const handleInputChange=(event)=>{
  const {name,value}=event.target;
  setFormData({
    ...formData,
    [name]:value
  })
}
const handleselectchange=(name,value)=>{
 
  setFormData({
    ...formData,
    [name]:value
  })
}
const handlecheckboxchange=(fieldName,itemName,value)=>{
 console.log(fieldName,itemName,value);
 const list=formData?.[fieldName]?formData?.[fieldName]:[];
  console.log(list);
  if(value){
    list.push({
      label:itemName,
      value:value
    })
    setFormData({
      ...formData,
      [fieldName]:list
    })
  } else{
    const result=list.filter((item)=>item.label==itemName)
    setFormData({
      ...formData,
      [fieldName]:result
    })
  }
  console.log(formData)
}

 const onFormSubmit= async(e)=>{
  e.preventDefault();
  
 const result = await db.insert(userResponses)
 .values({
   jsonResponse: formData,
   createdAt: moment().format("DD/MM/yyyy"),
   formRef:formId
 });
 console.log("form id",formId)
 console.log(result)
 if(result){
  formRef.reset();
  toast('Response Submitted succesfully!');
 } else{
  toast('Internal Server error!');
 }

 }

  return (
    <form onSubmit={onFormSubmit}
    ref={(e)=>formRef=e} data-theme={selectedTheme} className='border justify-center items-center p-5  md:w-[600px]  '>
      <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
      <h2 className='text-sm text-gray-400 text-center'>{jsonForm?.formHeading}</h2>
      {
        jsonForm?.fields?.map((field, index) => (
          <div key={index} className='flex'>
            {
              field.fieldType == "select" ?
              <div className='my-3 w-full'>
              <label className='text-xs text-gray-500 '>{field?.fieldLabel}</label>
                <Select required={field?.required} onValueChange={(v)=>handleselectchange(field?.fieldName,v)}>
                  <SelectTrigger className="w-full bg-transparent">
                    <SelectValue placeholder={field?.fieldName} />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      field?.options?.map((item, index) => (
                        Array.isArray(item)
                        ? item.map((subItem, subIndex) => (
                            <SelectItem key={subIndex} value={subItem.value}>{subItem.label}</SelectItem>
                          ))
                        : <SelectItem key={index} value={item}>{item}</SelectItem>
                        
                      ))
                    }
                  </SelectContent>
                </Select>
                </div> :field.fieldType=="radio"?
                  <div className='my-3 w-full'>
                  <label className='text-xs text-gray-500'>{field?.fieldLabel}</label>
                  <RadioGroup required={field?.required}  >
                    {
                      field.options.map((option,index)=>(
                        <div className="flex items-center space-x-2 " key={index}>
                        <RadioGroupItem value={option} id={index} onClick={()=>handleselectchange(field.fieldName,option)}/>
                        <Label >{option}</Label>
                      </div>
                      ))
                    }
                  </RadioGroup>
                </div>:
                field.fieldType=="checkbox"?<div className='my-3 w-full'>
                  <label className='text-xs text-gray-500'>
                    {field?.label}
                  </label>
                   {
                     field.options?field.options.map((option,index)=>(
                        <div className="flex gap-2">
                        <Checkbox required={field?.required} onCheckedChange={(v)=>handlecheckboxchange(field.fieldLabel,option?.fieldLabel,v)} />
                        <h2  className='text-xs text-gray-500'>{option?.fieldLabel}</h2>
                      </div>
                      )):
                      <div className="flex gap-2">
                      <Checkbox required={field?.required} onCheckedChange={(v)=>handlecheckboxchange(field.fieldLabel,field?.fieldLabel,v)}/>
                      <h2  className='text-xs text-gray-500'>{field?.fieldLabel}</h2>
                    </div>
                    }
                  </div>

                : <div className='my-3 w-full'>
              <label className='text-xs text-gray-500'>{field?.fieldLabel}</label>
              <Input required={field?.required} type={field?.type} placeholder={field?.placeholder} name={field?.fieldName} onChange={(e)=>handleInputChange(e)} />
            </div>
            }
            {
              editable&&
              <div>
            <FieldEdit defaultValue={field} onUpdate={(value)=>onFieldUpdate(value,index)} deleteField={()=>deleteField(index)}/>
            </div>
            }
          
          </div>
        ))
      }

      {
        !enabledSignIn?<button type='submit' className="btn btn-primary  text-white font-semibold  transition duration-200 ml-6">
        Submit
       </button>:
        isSignedIn? <button type='submit' className="btn btn-primary  text-white font-semibold  transition duration-200 ml-6">
        Submit
       </button>:
       <Button>
        <SignInButton mode='modal'>Signin before submitting</SignInButton>
       </Button>
      }
      
    </form>
  )
}

export default FormUi