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
       <input
        type="seach"
        name="search_key"
        onChange={(e) => setSearchKey(e.target.value)} placeholder="search usernames"
        className="pl-2 text-white bg-green-900 bg-opacity-80 h-11 w-[200px] focus:outline-none focus:border-[gray] border-[1px] border-transparent" required
        />

       <button
        className="border-[4px] border-green-900  hover:bg-yellow-900 w-12 h-11"
        type="submit"
        >👁️
      </button><br />

       {msg  && <span className="text-red-500 text-[12px]"> {msg}!</span>}
    </form>
  )
}

export default Search
