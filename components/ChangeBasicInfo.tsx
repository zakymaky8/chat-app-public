"use client"

import { TUser } from "@/utils/types/type"
import { getTokenFromCookies } from "@/utils/types/utils"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { socket } from "./WriteMessage"
import { useRouter } from "next/navigation"

export type TProps = {
    profileInfo: TProfileInfo,
    setProfileInfo: Dispatch<SetStateAction<TProfileInfo>>,
    user: TUser | undefined
}

export type TProfileInfo = {
    firstname: string | undefined,
    lastname: string | undefined,
    username: string | undefined,
    email: string | undefined,
    old_password: string | undefined,
    new_password: string | undefined
}

const ChangeBasicInfo = ({profileInfo, setProfileInfo, user}: TProps) => {

    const [err, setErr] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter()

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formdata = new FormData(e.target as HTMLFormElement);
        const changeData = {
            firstname: formdata.get("firstname"),
            lastname: formdata.get("lastname"),
            username: formdata.get("username"),
            email: formdata.get("email"),
        }
        const token = getTokenFromCookies()
        const res = await fetch("http://localhost:1234/update_user_info?type=basic", {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${token}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(changeData)
        })
        if (!res.ok) {
            const { error } = await res.json()
            setErr(error)
        } else {
            const { message } = await res.json();
            setSuccess(message)
            setTimeout( ()=>{
                socket.emit("go offline", user?._id)
                document.cookie = `token=${null}; path=/; secure`
                router.push("/login")
            }, 1000);
        }
    }
  return (
    <form onKeyDown={(e) => {if  (e.key === "Enter") e.preventDefault()}} onSubmit={handleSubmit} className="flex flex-col gap-2 border-2 border-yellow-900 p-6">
        <h5 className="text-xl mb-8">Change Basic Info</h5>
        <div className="mb-2 flex justify-between items-center">
            <label htmlFor="fname">First Name: </label>
            <input
                value={profileInfo.firstname} onChange={(e) => setProfileInfo({...profileInfo, firstname: e.target.value})}
                className="bg-black p-2 rounded-lg w-fit" placeholder="New First name" type="text" name="firstname" id="fname" />
        </div>
        <div className="mb-2 flex justify-between items-center">
            <label htmlFor="lname">Last Name: </label>
            <input
                value={profileInfo.lastname} onChange={(e) => setProfileInfo({...profileInfo, lastname: e.target.value})}
                className="bg-black p-2 rounded-lg w-fit" placeholder="New Last name" type="text" name="lastname" id="lname" />
        </div>
        <div className="mb-2 flex justify-between items-center">
            <label htmlFor="uname">Username </label>
            <input
                value={profileInfo.username} onChange={(e) => setProfileInfo({...profileInfo, username: e.target.value})}
                className="bg-black p-2 rounded-lg w-fit" placeholder="Update Username" type="text" name="username" id="uname" />
        </div>
        <div className="mb-2 flex justify-between items-center">
            <label htmlFor="email">Email: </label>
            <input
                value={profileInfo.email} onChange={(e) => setProfileInfo({...profileInfo, email: e.target.value})}
                className="bg-black p-2 rounded-lg w-fit" placeholder="Update Email" type="email" name="email" id="email" />
        </div>
        {
            err ? <span className="text-red-500 italic text-center">Error: {err}!</span> : success ? 
            <span className="text-red-500 italic text-center">{success}!</span> : ""
        }
        <button type="submit" className="self-end bg-yellow-700 p-2 mt-5 rounded-lg hover:opacity-70">Save Changes</button>
    </form>
  )
}

export default ChangeBasicInfo
