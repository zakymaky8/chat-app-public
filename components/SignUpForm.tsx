"use client"

import { createUserAction } from "@/actions/create-user"
import { useRouter } from "next/navigation"
import { useActionState } from "react"


const SignUpForm = () => {
  const [ state, action ] = useActionState(createUserAction, { success: "", message: "" })
  const router = useRouter()

  if (state.success === true) {
    router.replace("/login")
  }

  return (
    <form
      action={action}
      className="flex gap-4 flex-col rounded-lg p-8 px-6 sm:px-12 w-[370px] sm:w-[450px] md:w-[530px] bg-[#08233c]">
      <div>
        <label htmlFor="fname">First Name: </label> <br />
        <input required className=" mt-3 w-full h-10 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="First name" type="text" name="firstname" id="fname" />
      </div>
      <div>
        <label htmlFor="lname">Last Name: </label> <br />
        <input required className=" mt-3 w-full h-10 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="Last name" type="text" name="lastname" id="lname" />
      </div>
      <div>
        <label htmlFor="uname">Username </label> <br />
        <input required className=" mt-3 w-full h-10 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="Username" type="text" name="username" id="uname" />
    </div>
      <div>
        <label htmlFor="email">Email: </label> <br />
        <input required className=" mt-3 w-full h-10 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="Email" type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="pwd">Password: </label> <br />
        <input required className="mt-3 w-full h-10 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="password" type="password" name="password" id="pwd" />
      </div>
      <div>
        <label htmlFor="cpwd">Confirm Password: </label> <br />
        <input required className="mt-3 w-full h-10 rounded-md bg-green-600 bg-opacity-60 pl-2" placeholder="Confirm password" type="password" name="cpwd" id="cpwd" />
      </div>

      <button
          type="submit"
          className="hover:opacity-70 mt-5 bg-[#13518b] p-1 py-2 rounded"
          >Create
        </button>
      {state.success === false && <span className="text-red-500 text-[13px] self-center">Error: {state.message ? state.message : state.error?.message}!</span>}
    </form>
  )
}
  export default SignUpForm