// "use client"

// import Image from "next/image";
// import menu from "../public/menu.svg"
// import { useEffect, useState } from "react";

// const MsgMenu = () => {
//     const [isOn, setIsOn] = useState(true);
//     useEffect(() => {
//         const body = document.querySelector("body");
//         body?.addEventListener("click", () => {
//             setIsOn(false)
//         })
//     })
//   return (
//     <div>
//       <Image src={menu} onMouseOver={() => setIsOn(true)} className="bg-[#0e4273] rounded-[50%] h-6 w-5 cursor-pointer hover:bg-[#2590ee]"  alt="menu"/>
//         {
//             isOn && <>
//                         <h4>something is on</h4>
//                     </>
//         }
//     </div>
//   )
// }

// export default MsgMenu
