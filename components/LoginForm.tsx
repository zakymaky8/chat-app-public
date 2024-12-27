"use client"

import { usePathname, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"


const LoginForm = () => {
    const router = useRouter()
        const pathname = usePathname()
        const [err, setErr] = useState("")
    
        async function handleSubmit(e:FormEvent<HTMLFormElement>) {
            e.preventDefault()
    
            const formData = new FormData(e.target as HTMLFormElement);
            const USERDATA = {
                email_uname: formData.get("email_uname"),
                password: formData.get("password"),
            }
    
            const res  = await fetch(`http://localhost:1234/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(USERDATA)
            })
            if (!res.ok) {
                const { error } = await res.json()
                setErr(error)
                router.replace(pathname)
            } else {
                const { token } = await res.json()
                document.cookie = `token=${token}; path=/; secure`
                // document.cookie = `token=${token}; path=/; secure`
                router.replace("/chats#chats")
            }
        }
    return (
      <form onSubmit={handleSubmit} className="flex gap-10 flex-col rounded-lg p-8 pl-10 pr-10 bg-[#08233c]">
        <div>
          <label htmlFor="email_uname">Username or email: </label><br />
          <input className=" mt-3 w-[200px] h-10 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="username or email" type="text" name="email_uname" id="email_uname" />
        </div>
        <div>
          <label htmlFor="pwd">Password: </label><br />
          <input className="mt-3 w-[200px] h-10 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="password" type="password" name="password" id="pwd" />
        </div>
        {err && <span className="text-red-500 text-[13px] self-center">Error: {err}!</span> }
        <button type="submit" className="hover:opacity-70">Log in</button>
      </form>
    )
  }
  
  export default LoginForm
  