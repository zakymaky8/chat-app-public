"use client"

import { TUser } from "@/utils/types/type";
import { Dispatch, SetStateAction, useActionState, useState } from "react"
import { getUserSearchResult } from "@/actions/fetches";
import { useRouter } from "next/navigation";
import { updateChatBehaviorPref } from "@/actions/updateChatBehaPref";

type TProps = {
    theme: string | undefined,
    setTheme: Dispatch<SetStateAction<string | undefined>>,
    user: TUser | undefined,
    allowSearch: "allow" | "never",
    setAllowSearch: Dispatch<SetStateAction<"allow" | "never">>
}

const ChatBehaSetting = ({user, theme, setTheme, allowSearch, setAllowSearch}: TProps) => {

    const [key, setKey] = useState("");
    const [selectOn, setSelectOn] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<TUser[]>([]);
    const [result, setResult] = useState<TUser | null>(null)
    const [search_err, setSearchErr] = useState(null);
    const [allowChat, setAllowChat] = useState<string | undefined>(user?.alowedChats)


    async function handleUserSearch() {
        const { data, message, success } = await getUserSearchResult(key);
        if (success !== true) {
            setSearchErr(message)
        }
        setResult(data.user)
        setKey("")
    }

    const router = useRouter()

    const ActionWrapper = async (prev:{success: boolean, message: boolean, redirectUrl: string | null}, formdata: FormData) => {
        const selectedUsersId = selectedUsers.map(user => user._id)
        return updateChatBehaviorPref(user!._id, selectedUsersId, formdata)
    }
    const [state, formAction] = useActionState( ActionWrapper, { success: "", message: "", redirectUrl: "" } )

    if (state.success === false && state.redirectUrl !== null) {
        router.replace(state.redirectUrl)
    }
    if (state.success === true) {
        router.replace("/login")
    }

  return (
    <form
        action={formAction}
        onKeyDown={(e) => {if  (e.key === "Enter") e.preventDefault()}} className="flex flex-col gap-8 items-start border-2 border-yellow-900 p-6">

        <div className="w-full flex justify-between gap-5">
            <label htmlFor="theme">Theme: </label>
            <select name="theme" id="theme" className="bg-black p-2 rounded-lg w-fit" value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="light">Light  {theme == "light" ? "✅" : ""}</option>
                <option value="dark">Dark  {theme == "dark" ? "✅" : ""}</option>
            </select>
        </div>

        <div  className="w-full flex justify-between gap-5">
            <label htmlFor="allowed_chats">Allow Chats: </label>
            <select value={allowChat} name="allowed_chats" id="allowed_chats" className="bg-black p-2 rounded-lg w-fit" defaultValue={"everyone"}
                onChange={(e) => {
                    setAllowChat(e.target.value)
                    if (e.target.value === "selected_users") {
                        setSelectOn(true)
                    } else {
                        setSelectOn(false)
                        setSelectedUsers([])
                    }
                }}>
                <option value="everyone">Everyone</option>
                <option value="nobody_temp">Nobody for now</option>
                <option value="nobody_perm">Nobody forever</option>
                <option value="with_request" disabled>With Request</option>
                <option value="selected_users">Selected Users</option>
            </select>
        </div>
        {
            selectOn &&
            <div className="self-end ml-10 min-h-[250px] h-fit border-2 border-yellow-900 rounded-md p-3">
                <div className="mb-2">
                    <label htmlFor="select" className="text-[14px]">Search to Select: </label>

                    <input
                         value={key}
                         onChange={(e) => setKey(e.target.value)}
                         type="text"
                         name="search_to_select"
                         id="select"
                         placeholder="username"
                         className="pl-2 bg-green-900 bg-opacity-80 rounded-lg h-8 w-32 text-black"
                     />

                    <button
                        type="button"
                        onClick={handleUserSearch}
                        className="border-[1px] hover:border-black border-green-900 w-10 rounded-lg h-8"
                    >👁️</button>

                </div>
                    {
                        (result?.username || result !== null) ?

                        <div className="w-full flex justify-around gap-3 pb-2 pt-2">

                            <div>🔎  <span className="text-green-400 italic">{result?.username}</span></div>

                            <button
                                type="button"
                                onClick={() => {
                                    const exists = !result.username || selectedUsers.some(user => user.username === result.username)
                                    setSelectedUsers(prev => exists ? [...prev] : [...prev, result])
                                    setResult(null)
                                }}
                            >➕</button>

                        </div> : <span className="text-[11px] italic text-red-500">{key === "" ? "" : search_err}</span>

                    }
                <ul className="flex flex-col items-start mt-4">
                    {
                        selectedUsers.length > 0 ? selectedUsers.map((user, index) => {
                            return (
                                <li key={index} className="flex pt-2 gap-5 w-full px- justify-between border-b-[1px] border-[#764710]">
                                    <em>{index + 1}. {user.username}</em>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newSelUsrs = selectedUsers.filter(userr => user.username !== userr.username)
                                            setSelectedUsers(newSelUsrs)
                                        }} className="text-[12px] hover:opacity-70"
                                    >❌</button>
                                </li>
                            )
                        }) : <p className="self-center text-[13px] mt-5 opacity-70">No user selected yet!</p>
                    }
                </ul>
            </div>
        }
        <div className="w-full flex justify-between gap-5">
            <label htmlFor="allow_search">Allow Searching You: </label>
            <select
                value={allowSearch}
                onChange={(e) => setAllowSearch(e.target.value as "allow" | "never")}
                name="allow_search"
                id="allow_search"
                className="bg-black p-2 rounded-lg w-fit"
                >
                <option value="allow">Allow</option>
                <option value="never">Never</option>
            </select>
        </div>
        {
            state.success === false ? <span className="text-red-500 italic text-center">Error: {state.message}!</span> : state.success ? 
            <span className="text-red-500 italic text-center">{state.message}!</span> : ""
        }
        <button type="submit" className="self-end bg-yellow-700 p-2 mt-5 rounded-lg hover:opacity-70">Save Changes</button>
    </form>
  )
}

export default ChatBehaSetting
