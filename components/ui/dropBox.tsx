
"use client";

import axios from "axios";
import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { deleteFile, getParsedData, getSignedURL } from "@/app/create/actions";

export function Dropbox() {

  const [file , setFile] = useState<File | null >()
  // const [uploadedFileId , setUploadedFileId] = useState<string | null>()
  function handleChange(e : React.ChangeEvent<HTMLInputElement>){
      if(!e.currentTarget.files){
          return
      }
      const file = e.currentTarget.files.item(0)
      if(file?.type === "text/csv"){
          console.log(file)
          setFile(file)
      } else {
          console.log("please upload CSV files only")
      }
  }

  async function handleSubmit(){
    console.log("submit was clicked!")
    // setUploadedFileId(uuidv4())
    const uploadedFileId = await uuidv4()
    if(!file){
      return
    }

    const signedURLResult = await getSignedURL(uploadedFileId)
    if (signedURLResult.failure !== undefined) {
      console.error(signedURLResult.failure)
      return
    }

    const { url } = signedURLResult.success

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    })

    await getParsedData(uploadedFileId)

    await deleteFile(uploadedFileId)
  }

  async function handleGetFile(){
    

    // console.log(file)
  }

  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

  return (

    <div className="w-full h-full bg-slate-900 flex flex-col justify-center gap-6 px-10 items-center">
            {/* {/* {JSON.stringify(session)} */}
        <div className="flex w-full h-full max-h-80 rounded-3xl p-6 bg-slate-800 items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex items-center w-full h-full rounded-xl hover:bg-slate-700 border-2 border-dashed hover:border-gray-400 border-gray-500 text-center flex justify-center items-center hover:cursor-pointer font-normal justify-center"
            >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
                >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">CSV file</p>
            </div>
            <FileInput onChange={handleChange} id="dropzone-file" className="hidden" />
          </Label>
        </div>

        <button onClick={handleSubmit} className="p-2 bg-indigo-900 hover:bg-indigo-800 rounded-lg">submit</button>
        <button onClick={handleGetFile}>getFile</button>
    </div>
  );
}
