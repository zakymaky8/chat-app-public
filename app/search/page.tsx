import { getCurrentUser } from '@/actions/fetches'
import Searches from '@/components/Searches'
import { redirect } from 'next/navigation';
import React from 'react'

const SearchPage = async () => {
  const { success, data, redirectUrl } = await getCurrentUser();
  if (success === false && ![null, ""].includes(redirectUrl)) {
    redirect(redirectUrl!)
  }
  return (
    <Searches currentUser={data.current}/>
  )
}

export default SearchPage