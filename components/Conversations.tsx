/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { TUser } from "@/utils/types/type"
import { socket, TChats } from "@/utils/types/utils"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import ChatMsg from "./ChatMsg"
import WriteMessage from "./WriteMessage"
import { getConversationByTwo } from "@/actions/fetches"

export type TData = {currentUser: TUser | null, targetedUser: TUser | null, chatCollections: TChats[]}

function haveSameElements(arr1: [string, string], arr2: [string, string]) {
  const sa1 = arr1.sort()
  const sa2 = arr2.sort()

  return sa1.every((a,i:number) => sa2[i] === a);
}


const Conversations = ({chatId, curUs}: {chatId: string, curUs: TUser}) => {

    const [data, setData] = useState<TData>({chatCollections: [], currentUser: null, targetedUser: null})
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const [isReplyOn, setIsReplyOn] = useState(false)
    const [toBeReplied, setToBeReplied] = useState<TChats>()

    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy(0, scrollRef.current.scrollHeight);
      }
    }, [data])

    useEffect(() => {

        socket.on("get message", async (message) => {
          if (haveSameElements(message.chat_pair, [curUs._id, chatId])) {
            setData(prev => {
              return {...prev, chatCollections: message.chatCollections}
            })
          }
        })

        socket.on("get updated", async (message) => {
          if (haveSameElements(message.chat_pair, [curUs._id, chatId])) {
            setData(prev => {
              return {...prev, chatCollections: message.chatCollections}
            })
          }
        })

        socket.on("get reminants", async (message) => {
          if (haveSameElements(message.chat_pair, [curUs._id, chatId])) {
            setData(prev => {
              return {...prev, chatCollections: message.chatCollections}
            })
          }
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
    <div
      className={`flex ${data.currentUser?.preferences.theme === "light" ? "bg-yellow-950 bg-opacity-90" : "bg-black"}
                flex-col grow overflow-auto border-t-[2px] border-opacity-65 border-black`}
      style={{scrollbarWidth: "none"}} ref={scrollRef}>

      <div className="relative flex flex-col  h-full justify-between pb-0">
        <div className="self-center text-[12px] p-[2px] sticky top-0  pl-4 pr-4  bg-[rgb(6,39,12)] gap-4 flex justify-between w-full">
          <h4 className="text-center text-white text-opacity-70">You: <strong className="text-yellow-500 italic">{data.currentUser?.username}</strong></h4>
          <h4 className="text-center text-white text-opacity-70">With: <strong className="text-yellow-500 italic">{data.targetedUser?.username}</strong></h4>
        </div>
        <ul className="flex flex-col gap-3 p-3 mb-20 mt-10">

          {isLoading  ? <span className="self-center spinner"></span> : data.chatCollections.length !==0 ?
            data.chatCollections.map(chat => {
              return <ChatMsg
                        allChats={data.chatCollections}
                        isReplyOn={isReplyOn}
                        setToBeReplied={setToBeReplied}
                        setIsReplyOn={setIsReplyOn}
                        setData={setData}
                        key={chat._id}
                        chatdata={chat}
                        current={data.currentUser}
                        target={data.targetedUser}
                      />
                }) : <li className='text-yellow-600 text-center'>No Chat History!</li>
          }
        </ul>

        {

          (
            data.targetedUser?.preferences.alowedChats==="everyone" &&
            data.currentUser?.preferences.alowedChats === "everyone"
          ) ||

          (
            data.currentUser?.preferences.alowedChats === "everyone" &&
            data.targetedUser?.preferences.alowedChats==="selected_users" && (data.targetedUser.allowedUsersToChat as string[]).includes(data.currentUser!._id)
          ) ||

          (
            data.targetedUser?.preferences.alowedChats === "everyone" &&
            data.currentUser?.preferences.alowedChats==="selected_users" && (data.currentUser.allowedUsersToChat as string[]).includes(data.targetedUser!._id)
          ) ||

          (
            data.targetedUser?.preferences.alowedChats==="selected_users" &&
            (data.targetedUser.allowedUsersToChat as string[]).includes(data.currentUser!._id) && data.currentUser?.preferences.alowedChats==="selected_users" && (data.currentUser.allowedUsersToChat as string[]).includes(data.targetedUser!._id)
          ) ?

          <WriteMessage
              data={data}
              setData={setData}
              setIsReplyOn={setIsReplyOn}
              isReplyOn={isReplyOn}
              setToBeReplied={setToBeReplied}
              toBeReplied={toBeReplied}
              targetedUser={data.targetedUser}
              currentUser={data.currentUser}
              chat_pair={[curUs._id, chatId]}
          /> :
          <span
            className="-mt-[45px] bg-black p-2 pb-3 pl-4 gap-4 text-center sticky -bottom-1 text-red-600 w-full text-[13px]"
              >Chat Restricted (check your setting)!
          </span>

        }
      </div>
    </div>
  )
}

export default Conversations
