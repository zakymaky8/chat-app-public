"use client"

import Search from '@/components/Search'
import { TUser } from '@/utils/types/type'
import { useState } from 'react'


const Searches = () => {
    const [userData, setUserData] = useState<TUser | null>(null)
    const [isLoading, setIsLoading] = useState(false)
  console.log(userData?.username)
  return (
    <div className='rounded-lg self-center bg-yellow-950 m-10 flex flex-col gap-14 p-8' style={{boxShadow: "3px 3px 6px 0 black"}}>
        <Search setUserData={setUserData} setIsLoading={setIsLoading}/>
        <div className='flex flex-col items-center gap-7'>
           <h4 className='opacity-80'>User according to your search key</h4>
           <ul className='bg-green-800 p-5 min-w-72 gap-2 w-[40%] flex flex-col items-center'>

           {
              isLoading  ? 
                <span className='spinner slef-center'></span> : userData?.username ?
                <button onClick={() => {
                    if (userData.preferences.alowedChats === "everyone") {
                      window.location.href = `/chats/${userData._id}#chats`
                      } else if (userData.preferences.alowedChats === "nobody") {
                      alert("Sorry This User Doesn't Allow Chats!")
                    } else if (userData.preferences.alowedChats === "with_request") {
                      // send request
                    }}} className='hover:opacity-70'>👉 {userData.username}</button> :

              <span className="text-yellow-600">No user Yet!</span>}
           </ul>
        </div>
    </div>
  )
}

export default Searches