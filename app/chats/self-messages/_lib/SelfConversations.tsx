/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { TUser } from "@/utils/types/type"
import { TChats } from "@/utils/types/utils"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { getCurrentUser, getSelfConversations } from "@/actions/fetches"
import SelfWrite from "./SelfWrite"
import SelfChatMsg from "./SelfChatMsg"


const SelfConversations = () => {

    const [messages, setMessages] = useState<TChats[]>([])
    const [curUser, setCurUser] = useState<TUser>()
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy(0, scrollRef.current.scrollHeight);
      }

    }, [messages])
    useEffect(() => {

        if (scrollRef.current) {
          scrollRef.current.scrollBy(0, scrollRef.current.scrollHeight);
        }

        async function getConversations() {
          const { success, redirectUrl, data: { messages:msgs } } = await getSelfConversations();
          const { data:{current} } = await getCurrentUser();
          setCurUser(current)
          if (!success && redirectUrl !==null) {
            setIsLoading(false)
            router.replace(redirectUrl)
          }
          setIsLoading(false)
          setMessages(msgs)
      }
      getConversations()

    }, [])
  return (
    <div className={`flex ${curUser?.preferences.theme === "light" ? "bg-yellow-950" : "bg-black"}
                    flex-col grow overflow-auto border-t-[2px] border-opacity-65 border-black`}
        style={{scrollbarWidth: "none"}} ref={scrollRef}>
      <div className="relative flex flex-col h-full justify-between">
        <h4 className="self-center text-[12px] p-[2px] sticky top-0  pl-4 pr-4 bg-[rgb(6,39,12)] gap-4 flex justify-between w-full">
            Messages With Self
        </h4>

        <ul className="flex flex-col gap-3 p-3 mb-20 pt-10">

          {isLoading  ? <span className="self-center spinner"></span> : messages.length > 0 ?
            messages.map(chat => {
              return <SelfChatMsg setMessages={setMessages}  key={chat._id} chatdata={chat} current = {curUser!} />
            }) : <li className='text-yellow-600 text-center'>There are no messages!</li>
          }
        </ul>
        <SelfWrite setMessages={setMessages} />
      </div>
    </div>
  )
}

export default SelfConversations
