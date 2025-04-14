/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { TUser } from "@/utils/types/type"
import { socket } from "@/utils/types/utils";
import { useEffect, useState } from "react";

const ActiveStatus = ({user}: {user: TUser}) => {
  const [isActive, setIsActive] = useState(user.isActive)

  useEffect(() => {

      socket.on("get_new_online_status", (message) => {
        if (user._id === message.user._id) {
          setIsActive(message.user.isActive)
        }
      })
    }, [])

  return (
    <>
      {isActive ? <span className='text-yellow-300 text-[11px] w-fit rounded-[50%] pl-2 pr-2 p-[6px] ml-5 bg-[green]'>active</span> : <span className="text-10px text-black opacity-70">Offline</span> }
    </>
  )
}

export default ActiveStatus
