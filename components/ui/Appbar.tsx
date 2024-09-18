"use client"

import { signOut } from "next-auth/react"

export const Appbar = ()=>{
    return (
        <div className="flex bg-slate-950 items-center p-2 justify-between w-full">
            <h1 className="ml-4 mt-2 text-2xl">logo</h1>
            <div className="text-lg">
                <span className="m-2 text-gray-500 hover:text-gray-400 hover:cursor-pointer py-1 px-2 rounded-md mr-4">settings</span>
                <span onClick={()=> signOut({callbackUrl : "/" , redirect : true})} className="m-2 text-gray-500 hover:text-gray-400 hover:cursor-pointer py-1 px-2 rounded-md mr-4">Logout</span>
            </div>
        </div>
    )
}