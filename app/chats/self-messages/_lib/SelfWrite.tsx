/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Image from "next/image"
import {  Dispatch, SetStateAction, useActionState, useEffect, useState } from "react"
import sendMessageIcon from "../../../../public/send.svg"
import { createSelfChat } from "@/actions/self-chat-actions"
import { useRouter } from "next/navigation"
import { TChats } from "@/utils/types/utils"
import { getSelfConversations } from "@/actions/fetches"


const SelfWrite = ({ setMessages }: { setMessages: Dispatch<SetStateAction<TChats[]>> }) => {
  const [value, setValue] = useState("")
  const [state, action] = useActionState(createSelfChat, { success: "", message: "" })
  const router = useRouter()

  if (state.success === false) {
    alert(state.message)
  }

  useEffect(() => {
    async function operateIt() {
      if (state.success === true) {
        const { data: {messages} } = await getSelfConversations()
        setValue("")
        setMessages(messages)
        state.success = ""
        router.refresh();
      }
    }
    operateIt()
  }, [state])

  return (
    <form action={action}  className="flex -mt-[45px] justify-between bg-black p-2 pl-4 gap-4 sticky bottom-0 w-full" >
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

export default SelfWrite
