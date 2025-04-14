"use client"

import { TUser } from "@/utils/types/type"
import { socket } from "@/utils/types/utils"
import {  useState } from "react"


const DeleteChat = ({user, curuser}: {user: TUser, curuser: TUser}) => {

    const [isDialogShown, setIsDialogShown] = useState(false);

    function deleteChat() {
        socket.emit("delete chat",
                        {
                            current: curuser._id,
                            target: user._id,
                            type: "both"
                        })
    }


    return (
        <>
            <button
                onClick={() => setTimeout(() => setIsDialogShown(!isDialogShown), 300)} className='cursor-pointer bg-red-900 hover:brightness-125 text-[19px] rounded-[50%] p-1 pl-[5px] pr-[5px]'
                title='delete all chat'>
            🗑️</button>
             {
                isDialogShown &&
                <>
                    <div className="gap-10 flex flex-col bg-green-900 opacity-100 z-20 min-w-[300px] rounded-lg text-white p-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex gap-4 items-center">
                            <label htmlFor="checkbox">Will be deleted to <span className="text-red-500 italic">{user.username}</span> as well!</label>
                        </div>
                        <p className="text-[11px] italic text-yellow-600 -mt-6">Deleting this chat does not have a way to back up</p>
                        <div className="flex justify-between">
                            <button onClick={() => setIsDialogShown(!isDialogShown)}>Cancel</button>
                            <button onClick={deleteChat} className="text-red-600 hover:opacity-80">Delete</button>
                        </div>
                    </div>
                    <div
                        onClick={()=>{
                        setIsDialogShown(false)
                        }}
                        className={`
                            fixed right-0 top-0 w-screen z-10
                            min-h-screen bg-[#07283e] opacity-50
                            ${(isDialogShown) ? "block" : "hidden"}
                        `}>
                    </div>
                </>
                
            }
        </>

    )
}

export default DeleteChat
