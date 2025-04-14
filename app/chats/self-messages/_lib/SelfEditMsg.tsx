/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { getSelfConversations } from "@/actions/fetches"
import { updateSelfChat } from "@/actions/self-chat-actions"
import { TChats } from "@/utils/types/utils"
import { Dispatch, SetStateAction, useActionState, useEffect, useRef, useState } from "react"

type TProps = {
  originalValue: string | undefined,
  msgId: string,
  setIsEditMode: Dispatch<SetStateAction<boolean>>,
  setMessages: Dispatch<SetStateAction<TChats[]>>
}


const SelfEditMessage = ({originalValue, msgId, setIsEditMode, setMessages}: TProps) => {
    const  [editValue, setEditValue] = useState(originalValue)
    const refObj = useRef<HTMLTextAreaElement|null>(null)
      useEffect(() => {
        refObj?.current?.focus()
      }, [])

    const actionwrapper = async (prev: {success: boolean, message?: string}, formdata: FormData) => {
      if (editValue !== originalValue) {
        return await updateSelfChat(msgId, formdata)
      }
      else {
        setIsEditMode(false)
        return {
          success: "",
          message: ""
        }
      }
    }
    const [state, action] = useActionState(actionwrapper, { success: "", message: "" })

    if (state.success === false) {
      alert(state.message)
    }

    useEffect(() => {
      if (typeof state.success === "boolean") {
        setIsEditMode(false)
      }
      async function operateIt() {
        if (state.success === true) {
          const { data: {messages} } = await getSelfConversations()
          setMessages(messages)
          state.success = ""
        }
      }
      operateIt()
    }, [state])

  return (
    <form action={action} className="flex gap-[10px] items-center">
      <textarea
        name="chat_msg"
        id="edit"
        ref={refObj}
        value={editValue}
        onChange={e => setEditValue(e.target.value)}
        className='text-[#8db5dc] focus:border-[1px] min-h-[120px] w-[350px] bg-[#06192a] p-2 resize-none rounded'
        style={{scrollbarWidth: "none", boxShadow: "inset 0 0 3px 0 gray"}}
      ></textarea>
      <button className="text-[14px] pr-1">{originalValue !==  editValue ? "Edit" : "Close"}</button>
    </form>
  )
}

export default SelfEditMessage
