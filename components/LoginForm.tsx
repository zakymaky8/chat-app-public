"use client"

import { SignInAction } from "@/actions/login"
import { useRouter } from "next/navigation"
import { useActionState } from "react"


const LoginForm = () => {

    const [state, action] = useActionState(SignInAction,  { message: "", success: null, user: null, redirectUrl: "" })
    const router = useRouter();

    if (state.success === true ) {
      router.replace(state.redirectUrl!+"?chat_mode=on#chats")
    }

    return (
      <form
          action={action}
          className="flex gap-7 flex-col rounded-lg p-8 pl-10 pr-10 bg-[#08233c] w-[350px] sm:w-[410px] md:w-[440]">

        <div>
          <label htmlFor="email_uname">Username or Email </label><br />
          <input
            type="text"
            className=" mt-3 w-full h-12 rounded-md bg-green-600 bg-opacity-60 pl-2"
            placeholder="username or email"
            name="email_uname"
            id="email_uname" />
        </div>

        <div>
          <label htmlFor="pwd">Password </label><br />
          <input
            className="mt-3 w-full h-12 rounded-md bg-green-600 bg-opacity-60 pl-2"
            placeholder="password"
            type="password"
            name="password"
            id="pwd"
          />
        </div>


        <button
          type="submit"
          className="hover:opacity-70 mt-5 bg-[#13518b] p-1 py-2 rounded"
          >Log in
        </button>

        {state.success === false && <span className="text-red-500 text-[13px] self-center">Error: {state.message}!</span> }
      </form>
    )
  }

  export default LoginForm
