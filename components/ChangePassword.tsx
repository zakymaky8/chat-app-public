"use client"

import { FormEvent, useState } from "react";
import { TProps } from "./ChangeBasicInfo"
import { getTokenFromCookies } from "@/utils/types/utils";
import { socket } from "./WriteMessage";
import { useRouter } from "next/navigation";

const ChangePassword = ({profileInfo, setProfileInfo, user}: TProps) => {
        const [err, setErr] = useState(null);
        const [success, setSuccess] = useState(null);
        const router = useRouter()
    
    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formdata = new FormData(e.target as HTMLFormElement);
        const changeData = {
            old_password: formdata.get("old_password"),
            new_password: formdata.get("new_password"),
        }
        const token = getTokenFromCookies()
        const res = await fetch("http://localhost:1234/update_user_info?type=pwd", {
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
        <h5 className="text-xl mb-8">Change Password</h5>
        <div className="mb-2 flex justify-between items-center">
            <label htmlFor="pwd">Old Password: </label>
            <input
                value={profileInfo.old_password} onChange={(e) => setProfileInfo({...profileInfo, old_password: e.target.value})}
                className="bg-black p-2 rounded-lg w-fit" placeholder="Old password" type="password" name="old_password" id="pwd" />
        </div>
        <div className="mb-2 flex justify-between items-center">
            <label htmlFor="npwd">New Password: </label>
            <input
                value={profileInfo.new_password} onChange={(e) => setProfileInfo({...profileInfo, new_password: e.target.value})}
                className="bg-black p-2 rounded-lg w-fit" placeholder="New password" type="password" name="new_password" id="npwd" />
        </div>
        {
            err ? <span className="text-red-500 italic text-center">Error: {err}!</span> : success ? 
            <span className="text-red-500 italic text-center">{success}!</span> : ""
        }

        <button type="submit" className="self-end bg-yellow-700 p-2 mt-5 rounded-lg hover:opacity-70">Save Changes</button>
    </form>
  )
}

export default ChangePassword
