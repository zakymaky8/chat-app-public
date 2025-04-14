import { getCurrentUser } from '@/actions/fetches'
import ChatsLists from '@/components/ChatLists'
import React from 'react'

const ChatsList = async () => {
  const { data: {current} } = await getCurrentUser()
  return <ChatsLists curuser={current} />
}

export default ChatsList