"use client"

import { useActionState } from "react";
import { TProps } from "./ChangeBasicInfo"
import { redirect, useRouter } from "next/navigation";
import { updateUserInfoAction } from "@/actions/updateBasicInfo";

const ChangePassword = ({profileInfo, setProfileInfo, user}: TProps) => {
    const router = useRouter()

    const ActionWrapper = async (prev:{success: boolean, message: boolean, redirectUrl: string | null, data: null}, formdata: FormData) => {
        return updateUserInfoAction(user!._id, "pwd", formdata)
    }
    const [state, formAction] = useActionState( ActionWrapper, { success: "", message: "", redirectUrl: "", data: null } )

    if (state.success === false && state.redirectUrl !== null) {
        router.replace(state.redirectUrl)
    }
    if (state.success === true) {
        redirect("/login")
    }
  return (
    <form
        action={formAction}
        onKeyDown={(e) => {if  (e.key === "Enter") e.preventDefault()}} className="flex flex-col gap-2 border-2 border-yellow-900 p-6">
        <h5 className="text-xl mb-8">Change Password</h5>
        <div className="mb-2 flex justify-between items-center">
            <label htmlFor="pwd">Old Password: </label>
            <input
                value={profileInfo.old_password} onChange={(e) => setProfileInfo({...profileInfo, old_password: e.target.value})}
                className="bg-black p-2 rounded-lg w-fit" placeholder="********" type="password" name="old_password" id="pwd" />
        </div>
        <div className="mb-2 flex justify-between items-center">
            <label htmlFor="npwd">New Password: </label>
            <input
                value={profileInfo.new_password} onChange={(e) => setProfileInfo({...profileInfo, new_password: e.target.value})}
                className="bg-black p-2 rounded-lg w-fit" placeholder="********" type="password" name="new_password" id="npwd" />
        </div>
        {
            state.success === false ? <span className="text-red-500 italic text-center">Error: {state.message}!</span> : state.success === true ? 
            <span className="text-red-500 italic text-center">{state.message}!</span> : ""
        }

        <button type="submit" className="self-end bg-yellow-700 p-2 mt-5 rounded-lg hover:opacity-70">Save Changes</button>
    </form>
  )
}

export default ChangePassword
