"use client"

import Image from "next/image"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import sendMessageIcon from "../public/send.svg"
import { TUser } from "@/utils/types/type"
import { TData } from "./Conversations"
import { socket, TChats } from "@/utils/types/utils"

type TProps = {
  chat_pair: [string, string]
  data: TData,
  setData: Dispatch<SetStateAction<TData>>,
  setIsReplyOn: Dispatch<SetStateAction<boolean>>,
  isReplyOn: boolean,
  setToBeReplied: Dispatch<SetStateAction<TChats | undefined>>,
  toBeReplied: TChats | undefined,
  targetedUser: TUser | null,
  currentUser: TUser | null
}



const WriteMessage = ({chat_pair, targetedUser, currentUser, setIsReplyOn, isReplyOn, toBeReplied, setToBeReplied}: TProps) => {
  const [value, setValue] = useState("")

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    socket.emit("send message", {
      currentUserId: currentUser?._id,
      targetedUserId: targetedUser?._id,
      chat_msg: value,
      replied_to: toBeReplied ? toBeReplied._id : null,
      chat_pair
    })
    setValue("")
    setIsReplyOn(false)
    setToBeReplied(undefined)
  }

  return (
    <form onSubmit={sendMessage} className={`${isReplyOn ? "pt-8" : "pt-2"} flex -mt-[45px] justify-between bg-black p-2 pl-4 gap-4 sticky bottom-0 w-full`} >

      {
        isReplyOn  &&
        <div className="absolute w-[96%] border-b-[1px] border-blue-950 pb-[3px] bottom-[52px] left-2 text-[11px] flex gap-2 z-10 items-center justify-between">
          <div className="flex gap-2 items-center px-[2px] rounded-sm">
            <span>replying to</span>
            <p
              className="border-t-[4px] border-[#3f4f70] bg-slate-800 bg-opacity-80 rounded px-4">
                  {toBeReplied!.messageText!.length > 25 ? toBeReplied!.messageText?.slice(0, 25) + "..." : toBeReplied!.messageText}
            </p>
          </div>
          <span
            onClick={() => {
              setIsReplyOn(false)
              setToBeReplied(undefined)
            } }
            className="text-red-400 cursor-pointer hover:text-red-200"
              >cancel
          </span>
        </div>
      }

      <input
          className={`grow  h-[40px] bg-black focus:outline-none`}
          type="text"
          name="chat_msg"
          id="chat_msg"
          placeholder="Write Message"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

      <button type="submit" title="send" style={{display: `${value ? "block" : "none"}`}}>
            <Image className="bg-white rounded-[50%] p-0 h-8 w-8" src={sendMessageIcon} alt="send" />
      </button>

    </form>
  )
}

export default WriteMessage
