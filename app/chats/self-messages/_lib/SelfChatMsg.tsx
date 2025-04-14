"use client"

import { TUser } from "@/utils/types/type"
import { TChats } from "@/utils/types/utils"
import edit from "../../../../public/edit.svg"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"

import { decideWhichFormat } from "@/utils/lib/utils"
import SelfEditMessage from "./SelfEditMsg"
import SelfDeleteMsg from "./SelfDeleteMsg"



const SelfChatMsg = ({chatdata, current, setMessages}: {chatdata: TChats, current: TUser| null, setMessages: Dispatch<SetStateAction<TChats[]>>}) => {

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div
      className={ `flex flex-col gap-4
                  ${chatdata.user_id === current?._id ? "bg-[#08233c] self-end" : "bg-[#031009] self-start"}
                  ${current?.preferences.theme === "dark" ? "border-2" : ""}
                   w-max max-w-[80%]  bg-opacity-80 p-2 pt-4 px-6 ml-4 mr-4 rounded-lg`}
      style={{boxShadow: "inset 1px 1px 3px 0 black"}}>

      {
        isEditMode ? <SelfEditMessage  setMessages={setMessages} originalValue={chatdata.messageText} msgId={chatdata._id} setIsEditMode={setIsEditMode}/> :
        <p className=" text-[14px] break-words">{chatdata.messageText}</p>
      }
      <div className="flex justify-between gap-6">

        <span className="text-[10px] text-yellow-600">{decideWhichFormat(chatdata.createdAt)}</span>

        { chatdata.isUpdated && <span className="text-[9px] text-green-400">edited</span> }

        <div className="text-[10px] flex gap-[6px] items-center">
          <button onClick={() => setIsEditMode(!isEditMode)} className="-mt-[6px]">
            <Image src={edit} className="cursor-pointer h-[18px] w-[18px] bg-[green] rounded-[50%] hover:brightness-200" alt="edit"/>
          </button>
          <SelfDeleteMsg setMessages={setMessages} msgId={chatdata._id} />
        </div>

      </div>
    </div>
  )
}

export default SelfChatMsg
