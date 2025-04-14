/* eslint-disable react-hooks/exhaustive-deps */
"use client"


import Image from "next/image"
import del from "../../../../public/deletemsg.svg"
import { deleteSelfChat } from "@/actions/self-chat-actions"
import { Dispatch, SetStateAction, useActionState, useEffect } from "react"
import { getSelfConversations } from "@/actions/fetches"
import { TChats } from "@/utils/types/utils"


const SelfDeleteMsg = ({ msgId, setMessages }: { msgId: string, setMessages: Dispatch<SetStateAction<TChats[]>> }) => {

    const actionwrapper = async (prev: {success: boolean, message?: string}) => {
        console.log(prev)
        return await deleteSelfChat(msgId)
    }

    const [ state, action ] = useActionState( actionwrapper, { success: "", message: "" } )

    if (state.success === false) {
        alert(state.message)
    }

    useEffect(() => {
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
    <form action={action}>
        <button>
            <Image
                src={del}
                className="cursor-pointer h-[18px] w-[18px] bg-[#dc341b] p-[1px] rounded-[50%] hover:brightness-200"
                alt= "delete"
            />
        </button>
    </form>
  )
}

export default SelfDeleteMsg