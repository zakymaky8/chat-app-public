import SignUpForm from '@/components/SignUpForm'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center mt-10 gap-5 mb-10'>
      <Link href="#signup" className='m-2 text-2xl' id="signup">Sign Up</Link>
      <SignUpForm />
      <div>
        <p></p>
        <p>Already Have an account? <Link href="/login#login" className='hover:opacity-80 ml-2 text-[#22b1f3]'>Log in</Link></p>
      </div>
    </div>
  )
}

export default page
