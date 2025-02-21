"use client"

import { TUser } from "@/utils/types/type"
import { Dispatch, SetStateAction, useActionState } from "react"
import { useRouter } from "next/navigation"
import {  updateUserInfoAction } from "@/actions/updateBasicInfo"

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

    const router = useRouter()

    const ActionWrapper = async (prev:{success: boolean, message: boolean, redirectUrl: string | null, data: null}, formdata: FormData) => {
        return updateUserInfoAction(user!._id, "basic", formdata)
    }
    const [state, formAction] = useActionState( ActionWrapper, { success: "", message: "", redirectUrl: "", data: null } )

    if (state.success === false && state.redirectUrl !== null) {
        router.replace(state.redirectUrl)
    }

  return (
    <form
        action={formAction}
        onKeyDown={(e) => {if  (e.key === "Enter") e.preventDefault()}} className="flex flex-col gap-2 border-2 border-yellow-900 p-6">
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
            (state.success === false && state.redirectUrl === null) ? <span className="text-red-500 italic text-center">Error: {state.message}!</span> : state.success === true ? 
            <span className="text-red-500 italic text-center">{state.message}! (Logout and Login to see the changes)</span> : ""
        }
        <button type="submit" className="self-end bg-yellow-700 p-2 mt-5 rounded-lg hover:opacity-70">Save Changes</button>
    </form>
  )
}

export default ChangeBasicInfo
