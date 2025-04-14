"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ModalBackdrop = () => {
    // const params = useSearchParams();
    // const chat_mode = params.get("chat_mode")
    const [isOn, setIsOn] = useState(false);
    const router = useRouter();
    const handleClick = () => {
        router.push(`?chat_mode=off`);
        setIsOn(false)
    }
  return (
    <div
        onClick={handleClick}
        className={`
            fixed right-0 top-0 w-screen z-10
            min-h-screen bg-[#07283e] opacity-50
            ${isOn ? "block" : "hidden"}
        `}>
    </div>
  )
}

export default ModalBackdrop