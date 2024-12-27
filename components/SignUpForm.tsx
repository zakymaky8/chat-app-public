"use client"

import { usePathname, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"



const SignUpForm = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [err, setErr] = useState("")
    const [regResMsg, setRegResMsg] = useState("")
    
    if (regResMsg !== "") {
      alert(regResMsg)
    }
    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement);
        const USERDATA = {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            cpwd: formData.get("cpwd"),
        }

        const res  = await fetch(`http://localhost:1234/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(USERDATA)
        })
        if (!res.ok) {
            setErr("Registration Error try again")
            router.replace(pathname)
        } else {
          const { message } = await res.json()
            setRegResMsg(message)
            router.push("/login")
        }
    }
    return (
      <form onSubmit={handleSubmit} className="flex gap-4 items-end flex-col rounded-lg p-8 pl-10 pr-10 min-w-[350px] bg-[#08233c]">
        <div>
          <label htmlFor="fname">First Name: </label>
          <input required className=" mt-3 w-[200px] h-8 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="First name" type="text" name="firstname" id="fname" />
        </div>
        <div>
          <label htmlFor="lname">Last Name: </label>
          <input required className=" mt-3 w-[200px] h-8 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="Last name" type="text" name="lastname" id="lname" />
        </div>
        <div>
          <label htmlFor="uname">Username </label>
          <input required className=" mt-3 w-[200px] h-8 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="Username" type="text" name="username" id="uname" />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input required className=" mt-3 w-[200px] h-8 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="Email" type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="pwd">Password: </label>
          <input required className="mt-3 w-[200px] h-8 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="password" type="password" name="password" id="pwd" />
        </div>
        <div>
          <label htmlFor="cpwd">Confirm Password: </label>
          <input required className="mt-3 w-[200px] h-8 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="Confirm password" type="password" name="cpwd" id="cpwd" />
        </div>
        {err && <span className="text-red-500 text-[13px] self-center">Error: {err}!</span> }
        <button type="submit" className="hover:opacity-70 self-center">Sign Up</button>
      </form>
    )
  }
  
  export default SignUpForm