"use client"

import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react"
import { socket } from "./WriteMessage"


const EditMessage = ({originalValue, current, target, msgId, setIsEditMode}: {originalValue: string | undefined, current: string | undefined, target: string | undefined, msgId: string, setIsEditMode: Dispatch<SetStateAction<boolean>>}) => {
    const  [editValue, setEditValue] = useState(originalValue)
    const refObj = useRef<HTMLInputElement|null>(null)
      useEffect(() => {
        refObj?.current?.focus()
      }, [])

    function sendEdittedMessage(e: FormEvent<HTMLFormElement>) {
        setIsEditMode(false)
        e.preventDefault()
        if (originalValue !== editValue) {
            socket.emit("edit message", {
                msgId: msgId,
                current: current,
                target: target,
                updatedText: editValue
            })
        } else {

        }
    }

  return (
    <form onSubmit={sendEdittedMessage} className="flex gap-[10px] items-center">
      <input
        type="text"
        name="edit"
        id="edit"
        ref={refObj}
        value={editValue}
        onChange={e => setEditValue(e.target.value)}
        className='p-1 bg-inherit text-[#8db5dc] focus:border-[1px]'
      />
      <button className="text-[14px] pr-1">{originalValue !==  editValue ? "Edit" : "Close"}</button>
    </form>
  )
}

export default EditMessage
