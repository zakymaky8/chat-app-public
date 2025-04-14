"use client"

import { TUser } from "@/utils/types/type"
import { socket, TChats } from "@/utils/types/utils"
import del from "../public/deletemsg.svg"
import edit from "../public/edit.svg"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"
import { TData } from "./Conversations"
import EditMessage from "./EditMessage"
import { decideWhichFormat } from "@/utils/lib/utils"

type TProps = {
    setData: Dispatch<SetStateAction<TData>>,
    chatdata: TChats,
    current: TUser| null,
    target: TUser | null,
    isReplyOn: boolean,
    setIsReplyOn:  Dispatch<SetStateAction<boolean>>,
    setToBeReplied: Dispatch<SetStateAction<TChats | undefined>>,
    allChats: TChats[],

}

const ChatMsg = ({chatdata, current, target, setIsReplyOn, setToBeReplied, allChats}: TProps) => {

  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogeShown, setIsDialogShown] = useState(false)

  const user = chatdata.user_id === current?._id ? current : target;
  const repliedChat = allChats.find(chat => chat._id === chatdata.replied_to)
  const repliedUser = repliedChat?.user_id === current?._id ? current : target

  function deleteMessage() {
      socket.emit("delete message", {
        msgId: chatdata._id,
        target: target?._id,
        current: current?._id,
        chat_pair: [current!._id, target!._id]
      })
  }
  return (
    <div className={`flex flex-col gap-4 ${chatdata.user_id === current?._id ? "bg-[#08233c] self-end" : "bg-[#031009] self-start"} ${current?.preferences.theme === "dark" ? "border-2" : ""} min-w-[170px] w-max max-w-[80%] bg-opacity-80 p-2 px-6 ml-4 mr-4 rounded-lg`} style={{boxShadow: "inset 1px 1px 3px 0 black"}}>
      <h4 className="text-[11px] cursor-pointer hover:underline text-yellow-500 italic self-end">{user?.username === current?.username ? `You: ${user?.username}` : `Friend: ${user?.username}`}</h4>

      {
        repliedChat &&
        <div className="text-gray-300 bg-white bg-opacity-10 rounded text-[12px] p-1">
          <h3 className="text-yellow-600">{repliedUser?.username}</h3>
          <span>{repliedChat!.messageText!.length > 25 ? repliedChat!.messageText?.slice(0, 25) + "..." : repliedChat!.messageText}</span>
        </div>
      }

      {
        isEditMode ? <EditMessage chat_pair={[current!._id, target!._id]} current={current?._id} target={target?._id} originalValue = {chatdata.messageText} msgId={chatdata._id} setIsEditMode={setIsEditMode}/> :
        <p className=" text-[14px] break-words">{chatdata.messageText}</p>
      }
      <div className="flex justify-between gap-6">
        <span className="text-[10px] text-yellow-600 self-end">{decideWhichFormat(chatdata.createdAt)}</span>

        { chatdata.isUpdated && <span className="text-[9px] text-green-400 self-end">edited</span> }


        <div className="flex gap-1 items-center self-end">

          <button
            title="reply to this message"
            className="cursor-pointer  h-[20px] w-[20px] hover:opacity-100 opacity-70 rounded-[50%] hover:brightness-150 text-[17px]"
            onClick={() => {
              setIsReplyOn(true)
              setToBeReplied(chatdata)
            } }
              >🗨️
          </button>
          {
            chatdata.user_id === current?._id &&
            <>
              <button onClick={() => setIsEditMode(!isEditMode)} className="pt-[7px]">
                <Image src={edit} className="cursor-pointer h-[18px] w-[18px] bg-[green] rounded-[50%] hover:brightness-200 brightness-150" alt="edit"/>
              </button>


              <button onClick={() => setIsDialogShown(true)} className="pt-[7px]">
                <Image src={del} className="cursor-pointer h-[18px] w-[18px] bg-[#dc341b] p-[1px] rounded-[50%] hover:brightness-150" alt= "delete" />
              </button>
            </>
          }
        </div>
        {
          isDialogeShown &&
          <>
            <div className="gap-10 z-20 flex flex-col bg-green-900 opacity-100 min-w-[300px] rounded-lg text-white p-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col gap-1">
                  <span>You are deleting</span>
                  <span
                    className="border-t-[4px] border-[#3f4f70] p-1 bg-slate-800 bg-opacity-80 rounded text-red-500 italic">
                      {chatdata.messageText!.length > 30 ? chatdata.messageText?.slice(0, 30) + "..." : chatdata.messageText}
                  </span>
              </div>
              <div className="flex justify-between">
                  <button onClick={() => setIsDialogShown(false)} className="hover:opacity-80">Cancel</button>
                  <button onClick={deleteMessage} className="text-red-500 hover:opacity-80">Delete</button>
              </div>
            </div>
            <div
              onClick={()=>{
              setIsDialogShown(false)
              }}
              className={`
                  fixed right-0 top-0 w-screen z-10
                  min-h-screen bg-[#07283e] opacity-50
                  ${(isDialogeShown) ? "block" : "hidden"}
              `}>
          </div>
          </>
        }

      </div>
    </div>
  )
}

export default ChatMsg
