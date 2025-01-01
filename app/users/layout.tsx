import { ReactNode } from "react"

const UsersPageLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex flex-col gap-10 mt-6">
      <h3 className="w-full bg-green-400 text-black p-2 pt-4 pb-4 text-[24px] font-medium text-opacity-70 opacity-80 pl-5">👩🏻‍💼 User Profile Information</h3>
      {children}
    </div>
  )
}

export default UsersPageLayout
