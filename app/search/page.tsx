import { getCurrentUser } from '@/actions/fetches'
import Searches from '@/components/Searches'
import React from 'react'

const SearchPage = async () => {
  const { success, data, message } = await getCurrentUser();
  if (!success) {
    return message
  }
  return (
    <Searches currentUser={data.current}/>
  )
}

export default SearchPage