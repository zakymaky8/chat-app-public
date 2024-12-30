"use client"

import { TUser } from "@/utils/types/type"
// import { Dispatch, SetStateAction } from "react"
// import { socket } from "./WriteMessage"

// setChatList: Dispatch<SetStateAction<TUser[]>>
const ActiveStatus = ({user}: {user: TUser}) => {
    // // const [isActive, setIsActive] = useState(user.isActive)
    // useEffect(() => {
    //     socket.on("get offline", users => {
    //             setChatList(users)
    //     })
    //     socket.on("get online", users => {
    //         setChatList(users)
    //     })
    //     return () => {
    //         socket.off("get offline")
    //         socket.off("get online")
    //     }
    // }, [])
  return (
    <>
      {user.isActive && <span className='text-yellow-300 text-[11px] w-fit rounded-[50%] pl-2 pr-2 p-[6px] ml-5 bg-[green]'>active</span> }
    </>
  )
}

export default ActiveStatus
