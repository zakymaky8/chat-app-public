/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import ActiveStatus from '@/components/ActiveStatus';
import { TUser } from '@/utils/types/type';
import { getTokenFromCookies } from '@/utils/types/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ChatsLists =  () => {
    const router = useRouter();
    const [chatList, setChatList] = useState<TUser[]>([])

    useEffect(() => {
        async function getChatlist() {
            const token = getTokenFromCookies()
            const res = await fetch(`http://localhost:1234/users`, {
                headers: {
                  "authorization": `Bearer ${token}`,
                  "content-type": "application/json"
                }
              })
              if (!res.ok) {
                router.replace("/login")
              }
            const { chattedUsers }: {chattedUsers: TUser[]} = await res.json();
            setChatList(chattedUsers)
        }
        getChatlist()
    }, [chatList])


  return (
      <div className='self-center gap-4 flex grow flex-col items-center p-6 w-full' style={{boxShadow: "inset 2px 2px 5px black"}}>
        <h4 className='self-start -mt-4 text-[14px]'>Chatted users</h4>
        <ul className='self-center gap-4 flex grow flex-col items-center p-6 w-full'>
          {chatList.length !== 0 ?
            chatList.map(user => {
            return <div key={user._id} className='flex items-center w-full gap-3'>
                    <span className='cursor-pointer mr-3 hover:brightness-150 bg-green-900 rounded-[50%] p-1 pl-[4px] pr-[4px]' title={`${user.username}'s profile`}>👩🏻‍💼</span>
                    <Link
                      style={{boxShadow: "0px 1px 2px 0 black"}}
                      className='rounded-lg h-14 text-center pt-5 px-5 pb-3 grow hover:bg-yellow-900 w-full flex justify-between items-center'
                      href={`/chats/${user._id}#chats`}>
                          <strong className='text-green-700'>{user.username}</strong>
                          <ActiveStatus  user={user}/>
                    </Link>
                    <span className='cursor-pointer bg-red-900 hover:brightness-150 text-[19px] rounded-[50%] p-1 pl-[5px] pr-[5px]' title='delete all chat'>🗑️</span>
                  </div>
          }): <span className='text-yellow-600'>No chat history!</span>}

        </ul>
      </div>
  )
}

export default ChatsLists