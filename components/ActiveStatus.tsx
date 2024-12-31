"use client"

import { TUser } from "@/utils/types/type"
const ActiveStatus = ({user}: {user: TUser}) => {
  return (
    <>
      {user.isActive ? <span className='text-yellow-300 text-[11px] w-fit rounded-[50%] pl-2 pr-2 p-[6px] ml-5 bg-[green]'>active</span> : <span className="text-10px text-black opacity-70">Offline</span> }
    </>
  )
}

export default ActiveStatus
