import SignUpForm from '@/components/SignUpForm'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center mt-10 gap-5 mb-10'>
      <h3 className='mb-4 text-2xl'>Sign Up</h3>
      <SignUpForm />
      <div>
        <p>Already Have an account?<Link href="/login"> Login</Link></p>
      </div>
    </div>
  )
}

export default page
