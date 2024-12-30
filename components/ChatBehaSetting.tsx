"use client"

import { TUser } from "@/utils/types/type";
import { getTokenFromCookies } from "@/utils/types/utils";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { socket } from "./WriteMessage";

type TProps = {
    theme: string | undefined,
    setTheme: Dispatch<SetStateAction<string | undefined>>,
    user: TUser | undefined
}

const ChatBehaSetting = ({user, theme, setTheme}: TProps) => {

    const [key, setKey] = useState("");
    const [selectOn, setSelectOn] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<TUser[]>([]);
    const [result, setResult] = useState<TUser | null>(null)
    const [err, setErr] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter()
    const [allowChat, setAllowChat] = useState<string | undefined>(user?.alowedChats)
    const [allowSearch, setAllowSearch] = useState(user?.preferences?.canTheySearchYou ? "allow" : "never")



    async function handleUserSearch() {
        const token = getTokenFromCookies();
        const res = await fetch(`http://localhost:1234/search?search_key=${key}`, {headers: {"authorization": `Bearer ${token}`,"content-type": "application/json"}})
        if (!res.ok) setResult(null)
        const {userResult} = await res.json()
        setResult(userResult)
    }

    // useEffect(() => {
    //     async function getSelectedUsersForChat() {
    //         const token = getTokenFromCookies();
    //         const res = await fetch("http://localhost:1234/get_users_by_id", {
    //             method: "POST",
    //             headers: {
    //                 "authorization": `Bearer ${token}`,
    //                 "content-type": "application/json"
    //             },
    //             body: JSON.stringify({users: user?.allowedUsersToChat})
    //         })
    //         if (!res.ok) {
    //             const { error } = await res.json()
    //             setErr(error)
    //         }
    //         const { users } = await res.json()
    //         setSelectedUsers(users)
    //     }
    //     getSelectedUsersForChat()
    // }, []) // buggy

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formdata = new FormData(e.target as HTMLFormElement);
        const changeData = {
            theme: formdata.get("theme"),
            allowed_chats: formdata.get("allowed_chats"),
            allow_search: formdata.get("allow_search"),
            selectedUsersForChat: selectedUsers.map(user => user._id)
        }

        const token = getTokenFromCookies();
        const res = await fetch("http://localhost:1234/update_user_info?type=behavior", {
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
    <form onKeyDown={(e) => {if  (e.key === "Enter") e.preventDefault()}} onSubmit={handleSubmit} className="flex flex-col gap-8 items-start border-2 border-yellow-900 p-6">
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
                <option value="nobody">Nobody</option>
                <option value="with_request" disabled>With Request</option>
                <option value="selected_users">Selected Users</option>
            </select>
        </div>
        {
            selectOn &&
            <div className="self-end ml-10 min-h-[250px] h-fit border-2 border-yellow-900 rounded-md p-3">
                <div className="mb-2">
                    <label htmlFor="select">Search to Select: </label>
                    <input value={key} onChange={(e) => setKey(e.target.value)} type="text" name="search_to_select" id="select" className="pl-2 bg-green-900 bg-opacity-80 rounded-lg h-8 w-36 text-black"/>
                    <button type="button" onClick={handleUserSearch} className="border-[1px] hover:border-black border-green-900 w-10 rounded-lg h-8">👁️</button>
                </div>
                {
                    (result?.username || result !== null) ?
                    <div className="w-full flex justify-around gap-3 pb-2 pt-2">
                        <div>🔎Result: <span className="text-green-400 italic">{result.username}</span></div>
                        <button type="button" onClick={() => {
                            const exists = !result.username || selectedUsers.some(user => user.username === result.username)
                            setSelectedUsers(prev => exists ? [...prev] : [...prev, result])
                        }}>➕Add</button>
                    </div> : <span className="text-[13px] text-center">No user found</span>

                }
                <hr />
                <ul className="flex flex-col items-center">
                    {
                        selectedUsers.map((user, index) => {
                            return (
                                <li key={index} className="flex pt-2 gap-5">
                                    <strong>{index + 1}. {user.username}</strong>
                                    <button type="button" onClick={() => {
                                        const newSelUsrs = selectedUsers.filter(userr => user.username !== userr.username)
                                        setSelectedUsers(newSelUsrs)
                                    }} className="text-[12px]">❌</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        }
        <div className="w-full flex justify-between gap-5">
            <label htmlFor="allow_search">Allow Searching You: </label>
            <select value={allowSearch} onChange={(e) => setAllowSearch(e.target.value)} name="allow_search" id="allow_search" className="bg-black p-2 rounded-lg w-fit">
                <option value="allow">Allow</option>
                <option value="never">Never</option>
            </select>
        </div>
        {
            err ? <span className="text-red-500 italic text-center">Error: {err}!</span> : success ? 
            <span className="text-red-500 italic text-center">{success}!</span> : ""
        }
        <button type="submit" className="self-end bg-yellow-700 p-2 mt-5 rounded-lg hover:opacity-70">Save Changes</button>
    </form>
  )
}

export default ChatBehaSetting
