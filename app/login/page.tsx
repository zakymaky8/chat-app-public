import LoginForm from '@/components/LoginForm'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center mt-10 gap-5 mb-10'>
      <h3 className='mb-4 text-2xl'>Log In</h3>
      <LoginForm />
      <div>
        <p>No account yet? <Link href="/signup" className='hover:opacity-80 ml-2 text-[#22b1f3]'>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default page
