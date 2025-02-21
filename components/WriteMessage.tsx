"use client"

import Image from "next/image"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import sendMessageIcon from "../public/send.svg"
import io from "socket.io-client"
import { TUser } from "@/utils/types/type"
import { TData } from "./Conversations"

export const socket = io("http://localhost:1234")

const WriteMessage = ({targetedUser, currentUser}: {data: TData, setData: Dispatch<SetStateAction<TData>> ,targetedUser: TUser | null, currentUser: TUser | null}) => {
  const [value, setValue] = useState("")

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    socket.emit("send message", {
      currentUserId: currentUser?._id,
      targetedUserId: targetedUser?._id,
      chat_msg: value
    })
    setValue("")
  }

  return (
    <form onSubmit={sendMessage} className="flex -mt-[45px] justify-between bg-black p-2 pl-4 gap-4 sticky bottom-0 w-full" >
      <input
          className="grow h-[35px] bg-black focus:outline-none"
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
