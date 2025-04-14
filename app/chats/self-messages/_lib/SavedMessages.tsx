import Link from "next/link"

const SavedMessages = () => {
  return (
    <div
    style={{boxShadow: "0px 1px 2px 0 black"}}
    className='flex items-center w-full gap-2 bg-blue-950 p-2 py-2'>
        <Link
          href={`/users/`}
          className='cursor-pointer mr-3 hover:brightness-125 bg-green-900 rounded-[50%] p-1 text-[22px] pr-[4px]'
          title="Self Profile Page Including ways to update them unlike for others"
          >👩🏻‍💼
        </Link>

        <Link
          style={{boxShadow: "0px 0px 2px 0 black"}}
          className='rounded-lg text-center py-2 px-3 grow hover:backdrop-brightness-125 w-full flex justify-center gap-6 items-center'
          href={`/chats/self-messages#chats`}>
              <strong className='text-gray-400 text-[14px]'>Messages to self</strong>
              <div>📌</div>
        </Link>

  </div>
  )
}

export default SavedMessages