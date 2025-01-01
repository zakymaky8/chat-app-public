"use client"

import { TUser } from "@/utils/types/type"
import { getTokenFromCookies } from "@/utils/types/utils"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"

const Search = ({setUserData, setIsLoading}: {setUserData: Dispatch<SetStateAction<TUser | null>>, setIsLoading: Dispatch<SetStateAction<boolean>>}) => {
  const [searchKey, setSearchKey] = useState("")
  const [err, setErr] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(true)
    e.preventDefault()
    const token = getTokenFromCookies()
    const res = await fetch(`http://localhost:1234/search?search_key=${searchKey}`, {
      headers: {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json"
      }
    })
    if (!res.ok) {
      setIsLoading(false)
      setErr(res.statusText)
    }
    const {userResult} = await res.json()
    setIsLoading(false)
    setUserData(userResult)
  }

  return (
    <form onSubmit={handleSubmit} className="self-center">
       <input type="seach" name="search_key" onChange={(e) => setSearchKey(e.target.value)} placeholder="search usernames" className="pl-2 bg-green-900 bg-opacity-80 rounded-lg h-8 w-[200px] text-black" required/>
       <button className="border-[1px] hover:border-black w-10 rounded-lg h-8" type="submit">👁️</button><br />
       {err && <span className="text-red-500 text-[12px]">Error: {err}!</span>}
    </form>
  )
}

export default Search
