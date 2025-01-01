"use client"

import { TUser } from "@/utils/types/type"
import { TChats } from "@/utils/types/utils"
import del from "../public/deletemsg.svg"
import edit from "../public/edit.svg"
import Image from "next/image"
import { socket } from "./WriteMessage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TData } from "./Conversations"
import EditMessage from "./EditMessage"



const ChatMsg = ({setData, chatdata, current, target}: {setData: Dispatch<SetStateAction<TData>>, chatdata: TChats, current: TUser| null, target: TUser | null}) => {

  const [isEditMode, setIsEditMode] = useState(false);

  const getAuthor = () => chatdata.user_id === current?._id ? current : target;
  const user = getAuthor();

  useEffect(() => {
    socket.on("get reminants", (message) => {
      setData(prev => {
        return {...prev, chatCollections: message}
      })
    })
    return () => {
      socket.off("get reminants")
    }
  }, [])

  function deleteMessage() {
    const allowdeletion = confirm("are you sure you wanted to delete this message?")
    if (allowdeletion ) {
      socket.emit("delete message", {
        msgId: chatdata._id,
        target: target?._id,
        current: current?._id
      })
    }
  }
  return (
    <div className={`flex flex-col gap-4 ${chatdata.user_id === current?._id ? "bg-[#08233c] self-end" : "bg-[#031009] self-start"} ${current?.preferences.theme === "dark" ? "border-2" : ""} w-[80%] bg-opacity-80 p-2 pl-3 ml-4 mr-4 rounded-lg`} style={{boxShadow: "inset 1px 1px 3px 0 black"}}>
      <h4 className="text-[11px] -mb-[10px] cursor-pointer hover:underline text-yellow-500 italic self-end">{user?.username === current?.username ? `You: ${user?.username}` : `Friend: ${user?.username}`}</h4>
      {
        isEditMode ? <EditMessage setData={setData} current={current?._id} target={target?._id} originalValue = {chatdata.messageText} msgId={chatdata._id} setIsEditMode={setIsEditMode}/> :
        <p className=" text-[14px] break-words">{chatdata.messageText}</p>
      }
      <div className="flex justify-between">
        <span className="text-[10px] text-yellow-600">{chatdata.createdAt}</span>

        { chatdata.isUpdated && <span className="text-[9px] text-green-400">edited</span> }

        {
          chatdata.user_id === current?._id &&
        <div className="text-[10px] flex gap-1">
          <button onClick={() => setIsEditMode(!isEditMode)}>
            <Image src={edit} className="cursor-pointer h-[18px] w-[18px] bg-[green] rounded-[50%] hover:brightness-200" alt="edit"/>
          </button>
          <button onClick={deleteMessage}>
            <Image src={del} className="cursor-pointer h-[18px] w-[18px] bg-[#dc341b] p-[1px] rounded-[50%] hover:brightness-200" alt= "delete" />
          </button>
        </div>
        }

      </div>
    </div>
  )
}

// target bg color bg-[#08233c]
// current bg-[#116b3b]
export default ChatMsg
