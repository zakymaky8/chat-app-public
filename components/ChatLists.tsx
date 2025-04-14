/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import ActiveStatus from '@/components/ActiveStatus';
import { TUser } from '@/utils/types/type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DeleteChat from './DeleteChat';
import { getChattedUsers } from '@/actions/fetches';
import { socket } from '@/utils/types/utils';
import SavedMessages from '../app/chats/self-messages/_lib/SavedMessages';

const ChatsLists =  ({ curuser }: { curuser: TUser }) => {
    const router = useRouter();
    const [chatList, setChatList] = useState<TUser[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        socket.on("get chat list", async () => {
            const { data: { chattedUsers} } = await getChattedUsers();
            setChatList([...chattedUsers])
        });

        async function getChatlist() {

          const { success, redirectUrl, data } = await getChattedUsers();
          if (!success && redirectUrl !== null) {
            setIsLoading(false)
            router.replace(redirectUrl)
          }
          setIsLoading(false)
          const { chattedUsers } = data;
          setChatList(chattedUsers)
        }
        getChatlist();

        return () => {
          socket.off("get chat list")
        }
    }, [])


  return (
    <div className={`flex relative flex-col ${curuser.preferences.theme === "light" ? "bg-green-950" : "bg-black"} grow overflow-auto border-t-[4px] border-opacity-55 border-black`} style={{scrollbarWidth: "none"}}>
      <div className='self-center gap-4 flex grow flex-col items-center w-full' style={{boxShadow: "inset 2px 2px 5px black"}}>
        <ul className='self-center gap-2 flex grow flex-col items-center p-6 w-full md:w-[550px]'>
          <SavedMessages />
          {isLoading  ? <span className='spinner slef-center'></span> : chatList.length !==0 ?
            chatList.map(user => {
              return (
                <div
                  key={user._id}
                  style={{boxShadow: "0px 1px 2px 0 black"}}
                  className='flex items-center w-full gap-2 bg-opacity-70 bg-yellow-900 rounded-lg p-2'>
                      <Link
                        href={`/users/${user._id}`}
                        className='cursor-pointer mr-3 hover:brightness-125 bg-green-900 rounded-[50%] p-1 text-[24px] pr-[4px]'
                        title={`${user.username}'s profile`}
                        >👩🏻‍💼
                      </Link>

                      <Link
                        style={{boxShadow: "0px 0px 2px 0 black"}}
                        className='rounded-lg text-center py-2 px-3 grow hover:backdrop-brightness-125 w-full flex justify-between items-center'
                        href={`/chats/${user._id}#chats#last_chat`}>
                            <strong className='text-green-600'>{user.username}</strong>
                            <ActiveStatus  user={user}/>
                      </Link>
                      <DeleteChat user={user} curuser={curuser} />
                </div>
              )
          }): <span className='text-yellow-600'>No chat history!</span>}
        </ul>
      </div>
    </div>
  )
}

export default ChatsLists