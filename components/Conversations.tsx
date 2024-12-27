"use client"

import { TUser } from "@/utils/types/type"
import { getTokenFromCookies, TChats } from "@/utils/types/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ChatMsg from "./ChatMsg"
import WriteMessage from "./WriteMessage"

export type TData = {currentUser: TUser | null, targetedUser: TUser | null, chatCollections: TChats[]}


const Conversations = ({chatId}: {chatId: string}) => {

    const [data, setData] = useState<TData>({chatCollections: [], currentUser: null, targetedUser: null})

    const router = useRouter()
    useEffect(() => {
        async function getConversations() {
            const token = getTokenFromCookies()
            const res = await fetch(`http://localhost:1234/chats?target=${chatId}`, {
                headers: {
                "authorization": `Bearer ${token}`,
                "content-type": "application/json"
              }
            });
            if (!res.ok) {
              router.replace("login")
            }
            setData( await res.json())
        }
        getConversations()
    }, [data])
  return (
    <div className="relative flex flex-col h-max min-h-[500px] justify-between">
      <h3 className="self-center text-[14px] p-[2px] sticky top-0 pl-4 pr-4 mt-[2px] bg-[rgb(6,39,12)] rounded-lg">{data.targetedUser?.username}</h3>
      <ul className="flex flex-col gap-3 p-3 mb-20">

        {
          data.chatCollections.length !==0 ?
          data.chatCollections.map(chat => {
            return <ChatMsg key={chat._id} chatdata={chat} />
          }) : <li className='text-yellow-600 text-center'>No chat history!</li>
        }
      </ul>
      <WriteMessage setData={setData} targetedUser={data.targetedUser} currentUser={data.currentUser} />
    </div>
  )
}

export default Conversations
