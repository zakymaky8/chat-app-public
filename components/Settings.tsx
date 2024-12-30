"use client"

import { TUser } from "@/utils/types/type"
import { getTokenFromCookies } from "@/utils/types/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import ChatBehaSetting from "./ChatBehaSetting"
import ChangeBasicInfo from "./ChangeBasicInfo"
import ChangePassword from "./ChangePassword"

type TProfileInfo = {
    firstname: string | undefined,
    lastname: string | undefined,
    username: string | undefined,
    email: string | undefined,
    old_password: string | undefined,
    new_password: string | undefined
}

const Settings = () => {
    const [user, setUser] = useState<TUser>()
    const [profileInfo, setProfileInfo] = useState<TProfileInfo>({firstname: "", lastname: "", username: "", email: "", old_password: "", new_password: ""})
    const [theme, setTheme] = useState<string | undefined>("")

    useEffect(() => {
        async function getUserData() {
            const token = getTokenFromCookies();
            const res = await fetch("http://localhost:1234/current_user", { headers: { "authorization": `Bearer ${token}`, "content-type": "application/json"}})
            if (!res.ok) alert("Error fetching logged in user data")
            const { current } = await res.json()
            setTheme(current?.preferences.theme)
            setUser(current);
            setProfileInfo({ firstname: current.firstName, lastname: current.lastName, username: current.username, email: current.email, old_password: "", new_password: ""})
        }
        getUserData()
    }, [])

    
    
  return (
    <div className='rounded-lg self-center bg-yellow-950 mt-16 flex flex-col gap-14 p-6 mb-16 min-w-fit items-center m-5' style={{boxShadow: "3px 3px 6px 0 black"}}>
        <Link id="#setting" href="#setting" className='opacity-80 text-center text-2xl'>Settings</Link>
        <ChatBehaSetting user={user} setTheme={setTheme} theme={theme} />

        <details className="flex flex-col gap-1">
            <summary className="p-2 mb-5 cursor-pointer hover:opacity-70">Change Profile Information</summary>
            <div className="flex flex-col gap-10">
                <ChangeBasicInfo user={user} profileInfo={profileInfo} setProfileInfo={setProfileInfo} />
                <ChangePassword user={user} profileInfo={profileInfo} setProfileInfo={setProfileInfo} />
            </div>
        </details>
    </div>
  )
}

export default Settings