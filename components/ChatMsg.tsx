import { TChats } from "@/utils/types/utils"

const ChatMsg = ({chatdata}: {chatdata: TChats}) => {
  return (
    <div className="flex flex-col gap-4 bg-[#08233c] bg-opacity-80 p-2 pt-3 pl-3 ml-4 mr-4 rounded-lg" style={{boxShadow: "inset 1px 1px 3px 0 black"}}>
      <p className=" text-[14px]">{chatdata.messageText}</p>
      <div className="flex justify-between">
        <span className="text-[10px] text-yellow-600">{chatdata.createdAt}</span>
        <span>:</span>
      </div>
    </div>
  )
}

export default ChatMsg
