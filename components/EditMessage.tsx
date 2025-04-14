"use client"

import { socket } from "@/utils/types/utils"
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react"

type TProps = {
  originalValue: string | undefined,
  current: string | undefined,
  target: string | undefined,
  msgId: string,
  setIsEditMode: Dispatch<SetStateAction<boolean>>,
  chat_pair: [string, string]
}


const EditMessage = ({originalValue, current, target, msgId, setIsEditMode, chat_pair}: TProps) => {
    const  [editValue, setEditValue] = useState(originalValue)
    const refObj = useRef<HTMLTextAreaElement|null>(null)
      useEffect(() => {
        refObj?.current?.focus()
      }, [])

    function sendEdittedMessage(e: FormEvent<HTMLFormElement>) {
        setIsEditMode(false)
        e.preventDefault()
        console.log(chat_pair);
        if (originalValue !== editValue) {
            socket.emit("edit message", {
                msgId: msgId,
                current: current,
                target: target,
                updatedText: editValue,
                chat_pair: chat_pair
            })
        } else {

        }
    }

  return (
    <form onSubmit={sendEdittedMessage} className="flex gap-[10px] items-center">
      <textarea
        name="edit"
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

export default EditMessage
