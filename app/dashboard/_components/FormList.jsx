"use client";
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import FormListItem from './FormListItem';

function FormList() {
    const { user } = useUser();
    const [formlist, setFormlist] = useState([]);

    const GetFormList = async () => {
        try {
            const result = await db
                .select()
                .from(JsonForms)
                .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(JsonForms.id));
            setFormlist(result);
        } catch (error) {
            console.log('Error fetching form list:', error);
        }
    };

    useEffect(() => {
        if (user) {
            GetFormList();
        }
    }, [user]);

    return (
        <div className='mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4'>
            {formlist?.map((form, index) => {
                let parsedJsonForm = null;
                try {
                    parsedJsonForm = form.jsonform ? JSON.parse(form.jsonform) : null;
                } catch (error) {
                    console.log(`Error parsing JSON for form at index ${index}:`, error);
                }

                return (
                    <div key={index} className='w-full p-4'>
                        <FormListItem 
                            formRecord={form} 
                            jsonform={parsedJsonForm} 
                            refreshData={GetFormList} 
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default FormList;
