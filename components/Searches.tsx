"use client"

import Search from '@/components/Search'
import { TUser } from '@/utils/types/type'
import Link from 'next/link'
import { useState } from 'react'


const Searches = ({ currentUser }: { currentUser: TUser }) => {
    const [userData, setUserData] = useState<TUser | null>(null)
    const [isLoading, setIsLoading] = useState(false)
  return (
    <div className='rounded-lg self-center bg-yellow-950 m-10 flex flex-col gap-14 p-8' style={{boxShadow: "3px 3px 6px 0 black"}}>
        <Search setUserData={setUserData} setIsLoading={setIsLoading}/>
        <div className='flex flex-col items-center gap-7'>
           <h4 className='opacity-80'>User according to your search key</h4>
           <ul className='bg-green-800 p-5 min-w-72 gap-2 w-[40%] flex flex-col items-center'>

           {
              isLoading  ?
                <span className='spinner slef-center'></span> : userData?.username ?
                <div className='w-full flex justify-between'>
                  <span>👉 {userData.username}</span>
                  {
                    (userData.preferences.alowedChats === "everyone") || (userData.preferences.alowedChats === "selected_users" && userData.allowedUsersToChat.includes(currentUser._id as never)) ?
                    <Link href={`/chats/${userData._id}#chats`} className='hover:text-[#040d14] hover:underline text-[#08233c]'>Chat</Link> :
                    <span className='text-black'>Not allowed</span>

                  }
                </div>
                :

              <span className="text-yellow-600">No user Yet!</span>}
           </ul>
        </div>
    </div>
  )
}

export default Searches