"use client"

import { socket } from "./WriteMessage"
import { TUser } from "@/utils/types/type"
import { getTokenFromCookies } from "@/utils/types/utils"
import { Dispatch, SetStateAction, useEffect, useState } from "react"


const DeleteChat = ({user, setChatList}: {user: TUser, setChatList: Dispatch<SetStateAction<TUser[]>>}) => {

    const [isChecked, setIsChecked] = useState(false)
    const [isDialogShown, setIsDialogShown] = useState(false);

    useEffect(() => {
        socket.on("get chat list", (message) => {
            if (message) {
                setChatList([...message.chatList])
            }
        })
    })

    function deleteChat(user: TUser) {
        const token = getTokenFromCookies()
        socket.emit("delete chat", {target: user._id, token: token, type: isChecked ? "self" : "both"})
    }


    return (
        <>
            <button
                onClick={() => setTimeout(() => setIsDialogShown(!isDialogShown), 300)} className='cursor-pointer bg-red-900 hover:brightness-150 text-[19px] rounded-[50%] p-1 pl-[5px] pr-[5px]'
                title='delete all chat'>
            🗑️</button>
            {
                isDialogShown &&
                <div className="border-[5px] gap-14 border-green-300 flex flex-col bg-yellow-300 opacity-100 z-50 rounded-lg text-black p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex gap-4 items-center">
                        <input type="checkbox" className="w-6 self-center h-6 accent-green-700" name="type" id="checkbox" onChange={() => setIsChecked(!isChecked)} />
                        <label htmlFor="checkbox">Delete for <span className="text-red-500 italic">{user.username}</span> too!</label>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={() => deleteChat(user)} className="text-red-600 hover:opacity-80">Delete</button>
                        <button onClick={() => setIsDialogShown(!isDialogShown)}>Cancel</button>
                    </div>
                </div>
            }
        </>

    )
}

export default DeleteChat
