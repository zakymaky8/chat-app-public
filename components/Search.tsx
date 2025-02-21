"use client"

import { getUserSearchResult } from "@/actions/fetches"
import { TUser } from "@/utils/types/type"
import { useRouter } from "next/navigation"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"

const Search = ({setUserData, setIsLoading}: {setUserData: Dispatch<SetStateAction<TUser | null>>, setIsLoading: Dispatch<SetStateAction<boolean>>}) => {
  const [searchKey, setSearchKey] = useState("")
  const [msg, setMsg] = useState("")
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setMsg("")
    setIsLoading(true)
    e.preventDefault()

    const { success, data, message, redirectUrl } = await getUserSearchResult(searchKey);
    if (!success && redirectUrl !== null) {
      router.replace(redirectUrl)
    }

    if (redirectUrl === null && !success) {
      setIsLoading(false)
      setMsg(message)
    }

    setIsLoading(false)
    setUserData(data.user)

  }



  return (
    <form onSubmit={handleSubmit} className="self-center">
       <input type="seach" name="search_key" onChange={(e) => setSearchKey(e.target.value)} placeholder="search usernames" className="pl-2 bg-green-900 bg-opacity-80 rounded-lg h-8 w-[200px] text-black" required/>
       <button className="border-[1px] hover:border-black w-10 rounded-lg h-8" type="submit">👁️</button><br />
       {msg  && <span className="text-red-500 text-[12px]"> {msg}!</span>}
    </form>
  )
}

export default Search
