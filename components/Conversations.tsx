"use client"

import { TUser } from "@/utils/types/type"
import { getTokenFromCookies, TChats } from "@/utils/types/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ChatMsg from "./ChatMsg"
import WriteMessage, { socket } from "./WriteMessage"

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
              },
            });
            if (!res.ok) {
              socket.emit("go offline", data?.currentUser?._id)
              document.cookie = `token=${null}; path=/; secure`
              router.replace("/login")
            }
            setData( await res.json())
        }
        getConversations()
    }, [data])
  return (
    <div className="relative flex flex-col min-h-[502px] h-max justify-between">
      <div className="self-center text-[12px] p-[2px] sticky top-0  pl-4 pr-4 mt-[2px] bg-[rgb(6,39,12)] gap-4 flex justify-between w-full">
        <h4 className="text-center text-white text-opacity-70">You: <strong className="text-yellow-500 italic">{data.currentUser?.username}</strong></h4>
        <h4 className="text-center text-white text-opacity-70">With: <strong className="text-yellow-500 italic">{data.targetedUser?.username}</strong></h4>
      </div>
      <ul className="flex flex-col gap-3 p-3 mb-20">

        {
          data.chatCollections.length !==0 ?
          data.chatCollections.map(chat => {
            return <ChatMsg setData={setData} key={chat._id} chatdata={chat} current = {data.currentUser} target={data.targetedUser} />
          }) : <li className='text-yellow-600 text-center'>No chat history!</li>
        }
      </ul>
      <WriteMessage data={data} setData={setData} targetedUser={data.targetedUser} currentUser={data.currentUser} />
    </div>
  )
}

export default Conversations
