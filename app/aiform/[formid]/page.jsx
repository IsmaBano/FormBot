"use client"
import FormUi from '@/app/edit-form/_components/FormUi';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function LiveAiForm() {
    const [record, setRecord] = useState(null);
    const [jsonForm, setJsonForm] = useState(null);
    const params = useParams();

    useEffect(() => {
        if (params) {
            GetFormData();
        }
    }, [params]);

    const GetFormData = async () => {
        try {
            const result = await db
                .select()
                .from(JsonForms)
                .where(eq(JsonForms.id, params?.formid));
            if (result[0]?.jsonform) {
                setRecord(result[0]);

                const jsonString = result[0].jsonform;
                console.log("JSON String:", jsonString);
                setJsonForm(JSON.parse(jsonString));
            }
        } catch (error) {
            console.log("Error fetching form data:", error);
        }
    };

   

    return (
        <div className='p-10 flex justify-center items-center' style={{ backgroundImage: record?.background }}>
            <FormUi
                jsonForm={jsonForm}
                onFieldUpdate={() => console.log}
                selectedTheme={record?.theme}
                deleteField={() => console.log}
                editable={false}
                formId={record?.id}
            enabledSignIn={record?.enabledSignIn}
            />
            <Link href="/" className='flex gap-2 items-center bg-black text-white px-3 py-1 rounded-full fixed bottom-5 left-5'>
                <Image src={'/logo1.png'} alt='logo' width={50} height={50}/>
                Build your own AI form
            </Link>
        </div>
    );
}

export default LiveAiForm;
