import { BASE_URL } from "@/app/utils/constant/etc"
import { formatTime } from "@/app/utils/hooks/etc"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import VideoController from "./elements/VideoController"
import VideoPlayerContainer from "./elements/VideoPlayerContainer"



const AboutPlayerCon = ({data, clip=false, showContentVideo=false}) => {
    const [toggleLegend, setToggleLegend] = useState(false)
    const videoRef = useRef(null)
    const [playToggle, setPlayToggle] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [maxDuration, setMaxDuration] = useState(0)

 
  
    useEffect(() => {
       if (videoRef.current) {
           const handleLoadedMetadata = () => {
               setMaxDuration(videoRef.current.duration);
           };

           videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
           
           // Cleanup function
           return () => {
               if (videoRef.current) {
                   videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
               }
           };
       }
    }, [videoRef])
   
   
    const onToggleLegend = (value) => {
       if(value){
          window.scrollTo(0, 0)
          document.body.style.overflow = "hidden"
       }else{
          document.body.style.overflow = "auto"
       }
       setToggleLegend(value)
    }
 
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
          }
       }
          
      
       
    }
 

 

 
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
                }
             }
           
             
            
          };
          videoElement.ontimeupdate = handleTimeUpdate
       
          return () => {
             videoElement.ontimeupdate = null
          };
       }
    },[playToggle])
    return <VideoPlayerContainer toggleLegend={toggleLegend} onToggleLegend={onToggleLegend}>
         <div className="w-full h-full flex flex-col overflow-hidden relative group">
             <video ref={videoRef} src={`${BASE_URL}/DC/480p1.mp4`} className={`w-full h-full bg-black transition-all duration-1000`} controls={false} aria-label="video player" preload="auto" onEnded={() => {
               videoRef.current.currentTime = 0
               setPlayToggle(false)
               setCurrentTime(0)
               }}>
               <source type="video/mp4" />
               Your browser does not support the video tag.
             </video>
             {/* video info */}
             {!playToggle && <div
               onClick={togglePlay}
               className="absolute z-[45] w-[180px] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 bg-black bg-opacity-0 rounded-full text-white transition-all duration-300"
               >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-32 translate-x-[2px] opacity-90"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
             </div>}
             <div className={`${playToggle ? "bg-opacity-0" : "bg-opacity-30"} w-full h-full absolute top-0 left-0 bg-black duration-300 pointer-events-none select-none flex justify-center items-center`}>
             </div>
             <div className={`absolute top-0 left-0 z-[40] overflow-hidden w-full h-fit flex flex-col gap-4`}>
                <div onClick={togglePlay} className={`${playToggle ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-full pointer-events-none"} cursor-pointer w-[76px] absolute top-0 left-0 flex justify-center items-center aspect-square text-black bg-[#8BA5F8] transition-all duration-1000`}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                   </svg>
                </div>

               
             </div>
              
            </div>

            {/* video controller */}
            {videoRef && (maxDuration > 0) && <VideoController togglePlay={togglePlay} playToggle={playToggle} currentTime={currentTime} maxDuration={maxDuration} clip={clip} onClickProgressBar={onClickProgressBar} />}
           
         </VideoPlayerContainer>
    
 }

export default AboutPlayerCon