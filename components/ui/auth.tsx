"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"
// import { Eye } from "./Signup"

export const Signin = ()=>{

    const [input, setInput] = useState({
        email : "",
        password : ""
    })


    const [err , setErr] = useState(false)

    const route = useRouter()

    const [visible,setVisible] = useState(false)

    function handleChange(e: any){
        const {name , value} = e.target
        setInput((prev: any)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }

    async function handleSubmit(){
        const res = await signIn('credentials', {
            email: input.email,
            password: input.password,
            redirect: false,
            // callbackUrl : "/chats"
        });

         if(!res?.error){
            route.push("/home")
         } else {
            setErr(true)
         }

    }

    return (
        <div className=" w-screen bg-slate-900 h-screen flex flex-col justify-center items-center p-6">
                    <div style={{width: "28rem"}} className="bg-slate-800 rounded-2xl pb-6">
                        <h1 className="text-4xl p-8 w-full text-left text-gray-400 font-semibold">Login</h1>
                        <input onChange={handleChange} className="bg-transparent ml-8 w-96 rounded-lg focus:ring-indigo-900 text-lg text-gray-300" name="email" placeholder="Enter email" type="email" required/>
                        <div className="flex items-center">
                            <input onChange={handleChange} className="bg-transparent ml-8 w-96 rounded-lg focus:ring-indigo-900 text-lg text-gray-300 my-8" name="password" placeholder="Enter password" type={visible ? "text" : "password"} required/>
                            <Eye visible={visible} setVisible={setVisible}/>
                        </div>
                        <div className={err ? "text-red-600 text-sm pl-8 my-2" : " hidden" }>Incorrect credentials!!</div>
                        <button onClick={handleSubmit} className="bg-indigo-900 p-2 text-lg rounded-xl  ml-8">Signup</button>
                        <span onClick={()=>route.push("/signup")} className="ml-8 hover:underline-offset-4 hover:underline hover:text-indigo-300 hover:cursor-pointer text-gray-400">Create account?</span>
                    </div>

                </div>
    )
}



export const Signup = ()=>{

    const [input, setInput] = useState({
        email : "",
        password : "",
        confirmPwd : ""
    })

    const route = useRouter()
    const [visible,setVisible] = useState(false)
    const [match, setMatch] = useState(true)

    function handleChange(e: any){
        const {name , value} = e.target
        setInput((prev: any)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }

    function handleSubmit(){
        if(input.password !== input.confirmPwd){
            setMatch(false)
            return
        }
        axios.post("http://localhost:3000/api/user" , input).then(()=>{
            alert("signup successful. Redirecting to Login page")
            route.push("http://localhost:3000/signin")
        })
    }

    return (
    <div style={{height : "27rem" , width: "28rem"}} className="bg-slate-800 rounded-lg">
        <h1 className="text-4xl p-8 w-full text-left text-gray-400 font-semibold">Create Account!</h1>
        <input onChange={handleChange} className="bg-transparent p-2 border border-slate-600 ml-8 w-96 rounded-lg focus:ring-indigo-900 text-lg text-gray-300" name="email" placeholder="Enter email" type="email" required/>
        <div className="flex items-center">
            <input onChange={handleChange} className="bg-transparent p-2 border border-slate-600 ml-8 w-96 rounded-lg focus:ring-indigo-900 text-lg text-gray-300 my-8" name="password" placeholder="Enter password" type={visible ? "text" : "password"} required/>
            <Eye visible={visible} setVisible={setVisible}/>
        </div>
        <div className="flex items-center">
            <input onChange={handleChange} className="bg-transparent p-2 border border-slate-600 ml-8 w-96 rounded-lg focus:ring-indigo-900 text-lg text-gray-300" name="confirmPwd" placeholder="Confirm password" type={visible ? "text" : "password"} required/>
            <Eye visible={visible} setVisible={setVisible}/>
        </div>
        {match ? <div></div> : <div className="text-red-600 text-sm">password doesnot match!!</div> }
        <button onClick={handleSubmit} className="bg-indigo-900 p-2 text-lg rounded-xl my-6 ml-8">Signup</button>
        <span onClick={()=>route.push("/signin")} className="ml-8 hover:underline-offset-4 hover:underline hover:text-indigo-300 hover:cursor-pointer text-gray-400">Already have an account?</span>
    </div>

    )
}


interface EyePropType {
    visible : boolean
    setVisible : Function
}


export const Eye = ({visible,setVisible} : EyePropType)=>{


        return (
            <img onClick={()=> setVisible(!visible) } style={{width : "1.5rem" , height :"1.5rem" , left : "63rem"}} className="absolute" src={visible ?  "https://img.icons8.com/sf-regular-filled/48/visible.png" : "https://img.icons8.com/ios-glyphs/30/hide.png"} alt="visible"/>
        )
}