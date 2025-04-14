/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { TUser } from "@/utils/types/type"
import Link from "next/link"
import { useState } from "react"
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

const Settings = ({user}: {user: TUser}) => {
    const [profileInfo, setProfileInfo] = useState<TProfileInfo>({firstname: user.firstName, lastname: user.lastName, username: user.username, email: user.email, old_password: "", new_password: ""})
    const [theme, setTheme] = useState<string | undefined>(user.preferences.theme)
    const [allowSearch, setAllowSearch] = useState<"allow" | "never">(user.preferences?.canTheySearchYou ? "allow" : "never")

  return (
    <div className='w-max rounded-lg self-center bg-green-950 mt-16 flex flex-col gap-14 p-6 mb-16 min-w-fit items-center m-5' style={{boxShadow: "3px 3px 6px 0 black"}}>
        <Link id="#setting" href="#setting" className='opacity-80 text-center text-2xl'>Settings</Link>
        <ChatBehaSetting
            allowSearch={allowSearch}
            setAllowSearch={setAllowSearch} user={user} setTheme={setTheme} theme={theme} />

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