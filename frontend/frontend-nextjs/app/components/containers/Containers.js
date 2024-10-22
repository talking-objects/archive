import { BASE_URL } from "@/app/utils/constant/etc"
import { useState } from "react"

export const ContentContainer = ({children}) => {
    return (<div className="w-screen px-4 lg:px-4">
      <div className="w-full min-h-[100svh] h-full max-w-screen-2xl mx-auto flex flex-col">
      {children}
      </div>
   </div>)
}

export const MainContainer = ({children}) => {
   return <div className="w-full h-full flex flex-col items-center">
      {children}
   </div>
}

export const VideoPlayerContainer = ({data}) => {
   const [toggleLegend, setToggleLegend] = useState(false)
   return <div className="w-full h-[100svh] relative">
       <div className="absolute top-0 left-0 z-[10] w-full h-[100svh] overflow-hidden flex flex-col">
        <div className="w-full h-full flex flex-col overflow-hidden">
            <video src={`${BASE_URL}/${data.id}/480p1.mp4`} className="w-full h-full bg-black" controls={true} aria-label="video player" preload="auto">
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        </div>
        <div className="w-full h-[62px] bg-blue-400 flex items-center justify-between overflow-hidden">
         <div className="px-4">Show:</div>
         <div className="px-4">View:</div>
         <div onClick={() => setToggleLegend(true)} className={`h-full aspect-square cursor-pointer select-none flex hover:bg-blue-200 ${toggleLegend ? "bg-blue-200" : "bg-none"} justify-center items-center text-black`}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
               </svg>
         </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 z-[20] text-black px-2 py-1 bg-blue-400 text-4xl font-bold italic">{data.title}</div>
       {toggleLegend && <div className="w-screen h-[100svh] bg-white bg-opacity-90 absolute top-0 left-0 z-[30] px-4 py-4">
            <div className="w-full max-w-screen-2xl mx-auto">
               <div className="flex w-full justify-between items-center">
               <div>Legend</div>
               <div onClick={() => setToggleLegend(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
               </div>
               </div>
            </div>
       </div>}
   </div>
}
 