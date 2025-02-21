"use client"

import { TUser } from "@/utils/types/type"
import { TChats } from "@/utils/types/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ChatMsg from "./ChatMsg"
import WriteMessage, { socket } from "./WriteMessage"
import { getConversationByTwo } from "@/actions/fetches"

export type TData = {currentUser: TUser | null, targetedUser: TUser | null, chatCollections: TChats[]}


const Conversations = ({chatId}: {chatId: string}) => {

    const [data, setData] = useState<TData>({chatCollections: [], currentUser: null, targetedUser: null})
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {

        socket.on("get message", (message) => {
          setData(prev => {
            return {...prev, chatCollections: message}
          })
        })

        socket.on("get updated", (message) => {
          setData(prev => {
            return {...prev, chatCollections: message}
          })
        })

        socket.on("get reminants", (message) => {
          setData(prev => {
            return {...prev, chatCollections: message}
          })
        })

        async function getConversations() {
          const { success, redirectUrl, data } = await getConversationByTwo(chatId);
          if (!success && redirectUrl !==null) {
            setIsLoading(false)
            router.replace(redirectUrl)
          }
          setIsLoading(false)
          setData(data)
      }
      getConversations()

      return () => {
        socket.off("get message")
        socket.off("get updated")
        socket.off("get reminants")
    }

    }, [chatId, router])
  return (
    <div className={`flex ${data.currentUser?.preferences.theme === "light" ? "bg-yellow-950" : "bg-black"} flex-col grow overflow-auto border-t-[4px] border-opacity-55 border-black`} style={{scrollbarWidth: "none"}}>
      <div className="relative flex flex-col min-h-[502px] h-max justify-between">
        <div className="self-center text-[12px] p-[2px] sticky top-0  pl-4 pr-4 mt-[2px] bg-[rgb(6,39,12)] gap-4 flex justify-between w-full">
          <h4 className="text-center text-white text-opacity-70">You: <strong className="text-yellow-500 italic">{data.currentUser?.username}</strong></h4>
          <h4 className="text-center text-white text-opacity-70">With: <strong className="text-yellow-500 italic">{data.targetedUser?.username}</strong></h4>
        </div>
        <ul className="flex flex-col gap-3 p-3 mb-20">

          {isLoading  ? <span className="self-center spinner"></span> : data.chatCollections.length !==0 ?
            data.chatCollections.map(chat => {
              return <ChatMsg setData={setData} key={chat._id} chatdata={chat} current = {data.currentUser} target={data.targetedUser} />
            }) : <li className='text-yellow-600 text-center'>No chat history!</li>
          }
        </ul>

        {
          data?.currentUser?.preferences.alowedChats === "nobody" ?
          <span>User Restrictions for chat</span> :
          <WriteMessage
              data={data}
              setData={setData}
              targetedUser={data.targetedUser}
              currentUser={data.currentUser}
          />

        }
      </div>
    </div>
  )
}

export default Conversations
