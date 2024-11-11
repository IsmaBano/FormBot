"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/configs/AiModal";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const PROMPT = ".On the basis of description please give  formTitle, formHeading,along with fieldName,fieldTitle, placeholder, fieldLabel, fieldType, and field required for each field type in valid JSON format only not in text form whic should not contain any comments or double inverted comma or ivalid symbols inside text which are not accepted in json.";

function CreateForm() {
  const [opendialog, setOpendialog] = useState(false);
  const [input, setInput] = useState("");
  const [loading,setloading]=useState();
  const { user  } = useUser();
  const route=useRouter();
  const formHandle = async () => {
    setloading(true);
    try {
      const result = await chatSession.sendMessage(`Description: ${input} ${PROMPT}`);
      console.log("Initial result:", result);
  
      // Extract and parse JSON from the response
      // let responseData;
      let textResponse
      if (typeof result.response.text === 'function') {
         textResponse = await result.response.text();
        textResponse = textResponse
        .replace(/```json|```/g, '')
        .replace(/'/g, '"')
        .trim();
        console.log("Text responseData:", textResponse);
      }
  
      // Insert into the database if parsing was successful
      if (textResponse) {
        const resp = await db.insert(JsonForms)
          .values({
            jsonform: textResponse,
            createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
            createdAt: moment().format("DD/MM/yyyy"),
          }).returning({ id: JsonForms.id });
  
        console.log("New form:", resp);
        if (resp[0]?.id) {
          route.push("edit-form/" + resp[0].id);
        }
      }
    } catch (error) {
      console.log("Error in formHandle:", error);
    } finally {
      setloading(false);
    }
  };
  

  return (
    <div>
      <button
        onClick={() => setOpendialog(true)}
        className="bg-[#AF1740] text-white font-semibold mx-4 px-4 py-2 rounded-lg shadow-lg hover:bg-[#d8758f] transition"
      >
        + Create Form
      </button>
      <Dialog open={opendialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new form</DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write Description of your Form"
              />
              <div className="gap-3 flex my-3 justify-end">
                <Button variant="destructive" onClick={() => setOpendialog(false)}>
                  Cancel
                </Button>
                <Button 
                disabled={loading}
                onClick={formHandle}> {loading?<Loader2 className="animate-spin"/>
                :'Create'
                }</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  );
}

export default CreateForm;
