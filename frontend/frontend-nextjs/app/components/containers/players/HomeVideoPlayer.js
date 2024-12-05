import { BASE_URL } from "@/app/utils/constant/etc"
import { formatTime } from "@/app/utils/hooks/etc"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"



const HomeVideoPlayer = ({data, clip=false, showContentVideo=false, setCurrentTimeForMini, updateVideo}) => {
    const videoRef = useRef(null)
    const [playToggle, setPlayToggle] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [getNAnnotations, setNAnnotations] = useState(null)
    const route = useRouter()
    const [toggleShow, setToggleShow] = useState({
       category: true,
       tag: true,
       reference: true,
       narration: true,
       data: true,
       event: true,
       place: true,
       view: "diagramatic",
      
    })
  
   
    
 
    const togglePlay = () => {
       if(videoRef){
          if(videoRef.current.paused){
             videoRef.current.play()
             setPlayToggle(true)
          }else{
             videoRef.current.pause()
             setPlayToggle(false)
          }
          
       }
    }
    const onClickProgressBar = (e) => {
       if(videoRef){
          if(!clip){
             videoRef.current.currentTime = parseFloat(e.target.value)
             setCurrentTime(e.target.value)
          }else{
             console.log(parseFloat(e.target.value) + data.in)
             videoRef.current.currentTime = parseFloat(e.target.value) + data.in
             setCurrentTime(e.target.value)
          }
       }
    }
  
 
    useEffect(() => {
       setNAnnotations(data.nAnnotations)
    },[])

   //  For MiniVideo Player
    useEffect(() => {
      if(showContentVideo){
         videoRef.current.pause()
         setPlayToggle(false)
         setCurrentTimeForMini(videoRef.current.currentTime)
      }
    },[showContentVideo])
 
    // video keyboard controller
    useEffect(() => {
       const onSpaceScroll = (event) => {
       
          if (event.code === 'Space') {
             event.preventDefault(); 
           }
          if (event.code === 'ArrowDown') {
             event.preventDefault(); 
           }
          if (event.code === 'ArrowLeft') {
             event.preventDefault(); 
           }
         
       }
       const onKeyController = (event) => {
          event.preventDefault(); 
          if (event.code === 'Space') {
             if(videoRef && !showContentVideo){
                if(videoRef.current.paused){
                   
                   videoRef.current.play()
                   setPlayToggle(true)
                }else{
                   videoRef.current.pause()
                   setPlayToggle(false)
                }
             }
           }
       
         
         
       }
 
       // event = keyup & keydown
       document.addEventListener('keyup',onKeyController)
       document.addEventListener('keydown',onSpaceScroll)
 
       return () => {
          document.removeEventListener("keyup", onKeyController)
          document.removeEventListener("keydown", onSpaceScroll)
       }
    },[showContentVideo])
 
    // update video progress bar
    useEffect(() => {
       const videoElement = videoRef.current
       if (playToggle && videoElement) {
          const handleTimeUpdate = () => {
             if(!clip){
                const newCurrentTime = videoElement?.currentTime
                // 
                setCurrentTime(newCurrentTime)
                if(videoElement.ended){
                   // video ended
                   // - update play icon
                   // - update progress bar
                   
                   setPlayToggle(false)
                   setCurrentTime(0)
                   updateVideo()
                }
             }
            
             
            
          };
          videoElement.ontimeupdate = handleTimeUpdate
       
          return () => {
             videoElement.ontimeupdate = null
          };
       }
    },[playToggle])
    return <div className="w-full h-full relative pt-[56px]">
        <div className="w-full h-[calc(100svh-56px)] overflow-hidden flex flex-col">
         <div className="w-full h-full flex flex-col overflow-hidden relative">
             <video ref={videoRef} src={`${BASE_URL}/${data.id}/480p1.mp4`} className={`${(toggleShow.view === "overview" && playToggle) ? "w-[calc(100vw-660px)]" : "w-full"} h-full bg-black transition-all duration-1000`} controls={false} aria-label="video player" preload="auto">
               <source type="video/mp4" />
               Your browser does not support the video tag.
             </video>
             {/* video info */}
             <div className={`absolute top-0 left-0 z-[40] overflow-hidden w-full h-fit flex flex-col gap-4`}>
                <div onClick={togglePlay} className={`${playToggle ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-full pointer-events-none"} cursor-pointer w-[76px] absolute top-0 left-0 flex justify-center items-center aspect-square text-black bg-[#8BA5F8] transition-all duration-1000`}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                   </svg>
                </div>
                {clip && <div className={`${!playToggle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} w-fit text-black px-2 py-1 bg-[#9E21E8] text-4xl font-bold italic transition-all duration-1000`}>Clip</div>}
                <div className={`${!playToggle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} w-full lg:w-2/3 text-black px-2 py-1 bg-[#8BA5F8] text-4xl font-bold italic transition-all duration-1000`}>{data.title}</div>
                <div className={`text-black bg-white w-fit px-2 py-1 ${!playToggle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} transition-all duration-1000`}>
                   <div>Author: {Boolean(data.director) && Boolean(data.director.length > 0) && data.director.map((v) => `${v},`)} {data.user}</div>
                   <div>
                      <div>Created:</div>
                      <div>{data.created}</div>
                   </div>
                   <div>
                      <div>Modified:</div>
                      <div>{data.modified}</div>
                   </div>
                </div>
                {clip && <div onClick={() => route.push(`/video/${data.id}`)} className={`text-black bg-white w-fit px-2 py-2 cursor-pointer ${!playToggle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} transition-all duration-1000`}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25" />
                   </svg>
                </div>}
                
             </div>
          
         </div>
         {/* video controller */}
         {videoRef && <div className="w-full h-[40px] bg-black border-t-[0.5px] border-neutral-500 text-white flex justify-between items-center">
             <div onClick={togglePlay} className="cursor-pointer px-2">
                {!playToggle && <div>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                   </svg>
                </div>}
                {playToggle && <div>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                   </svg>
                </div>}
             </div>
             <div className="w-full px-2">
                <div className="w-full h-1 rounded-full relative">
                   <input  onChange={(e) => onClickProgressBar(e)} step={clip? 0.01 :0.1} min={0} max={data.duration} defaultValue={0} type="range" className="w-full bg-red-400 range-custom" />
                   <progress value={currentTime} max={data.duration} className="absolute bg-red-400 w-full h-full select-none pointer-events-none"></progress>
                </div>
             </div>
             <div className="w-[140px] text-center text-xs">{formatTime(currentTime)} / {formatTime(data.duration)}</div>
      
         </div>}
      
       </div>
       
   
    </div>
 }

export default HomeVideoPlayer